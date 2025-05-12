// pages/api/recent-ips.ts
import { NextRequest, NextResponse } from "next/server";
import UniqueViews from "@/model/UniqueViews";
import { connect } from "@/dbConfig/dbConfig";
import { redis } from "@/lib/redis"; // Upstash Redis client

await connect();

export async function GET(req: NextRequest) {
  try {
    const cachedIPs = await redis.get("recent_ips");

    if (cachedIPs) {
      console.log("Serving from Redis cache");
      return NextResponse.json(cachedIPs); // No need to parse; Upstash returns JSON
    }

    const recentIPs = await UniqueViews.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .select("ip city region country location org postalCode timezone")
      .lean(); // ✅ Ensures serializable data

    // Save to cache for 5 minutes (300 seconds)
    await redis.set("recent_ips", recentIPs);

    console.log("Fetched from MongoDB and updated Redis cache");
    return NextResponse.json(recentIPs);
  } catch (error) {
    console.error("Error fetching IPs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
