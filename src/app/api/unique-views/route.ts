import { NextRequest, NextResponse } from "next/server";
import UniqueViews from "@/model/UniqueViews";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req: NextRequest) {
  try {
    await connect();

    const url = new URL(req.url);
    const fetchIPDetails = url.searchParams.get("fetchIPDetails") === "true";
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "50");

    const totalVisits = await UniqueViews.countDocuments();

    if (!fetchIPDetails) {
      return NextResponse.json({ totalVisits }, { status: 200 });
    }

    const skip = (page - 1) * limit;
    const ipDetails = await UniqueViews.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);
    // Check if there are more IPs to load
    const hasMore = skip + ipDetails.length < totalVisits;

    return NextResponse.json(
      {
        totalVisits,
        ipDetails,
        hasMore,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /unique-views:", error);
    return NextResponse.json(
      {
        totalVisits: 0,
        ipDetails: [],
        hasMore: false,
      },
      { status: 500 }
    );
  }
}