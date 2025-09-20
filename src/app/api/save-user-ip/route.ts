import { NextRequest, NextResponse } from "next/server";
import UniqueViews from "@/model/UniqueViews";
import { connect } from "@/dbConfig/dbConfig";
import axios from "axios";
import { redis } from "@/lib/redis";

await connect();

const IP_API_URL = "https://ipinfo.io";
const API_KEY = process.env.iptoken;

export async function POST(req: NextRequest) {
  try {
    const { ip, userId } = await req.json();
    
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }
    
    
    // Check if user already exists by userId (not by IP)
    const existingUser = await UniqueViews.findOne({ userId });
    if(existingUser){
        return NextResponse.json({ message: "user already exists" }, { status: 400 });
    }
    
    const ipResponse = await axios.get(`${IP_API_URL}/${ip}/json?token=${API_KEY}`);
    const ipData = ipResponse.data;
    
    if (ipData.error) {
      return NextResponse.json({ error: "Failed to fetch IP details" }, { status: 400 });
    }

    const ipDetails = {
      ip,
      userId, // Add userId to the data
      city: ipData.city || null,
      region: ipData.region || null,
      country: ipData.country || null,
      location: ipData.loc || null,
      org: ipData.org || null,
      postalCode: ipData.postal || null,
      timezone: ipData.timezone || null,
    };

    const newUser = new UniqueViews(ipDetails);
    await newUser.save();

    // Update Redis cache with the 100 most recent IPs
    await updateRedisCache();
    
    return NextResponse.json({ message: "IP details saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving IP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Function to update Redis cache with the 100 most recent IPs
async function updateRedisCache() {
  try {
    // Fetch 100 most recent IPs from MongoDB
    const recentIPs = await UniqueViews.find()
  .sort({ createdAt: -1 }) // Sort by newest first
  .limit(100)
  .lean();
  // use lean to retain the orignal schema with all values of params retained 
  // so that existing params don't get overided with the redis params like the createdAt


    // Serialize to JSON
    const serializedIPs = JSON.stringify(recentIPs);

    // Store in Redis permanently only update it when new ip is saved
    await redis.set("recent_ips", serializedIPs);

    console.log("Redis cache updated");
  } catch (error) {
    console.error("Error updating Redis cache:", error);
    // Don't throw; let the API continue
  }
}