import { NextResponse } from "next/server";
import UniqueViews from "@/model/UniqueViews";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req) {
    try {
        await connect();

        const url = new URL(req.url);
        const fetchIPDetails = url.searchParams.get("fetchIPDetails") === "true";

        const totalVisits = await UniqueViews.countDocuments();

        if (!fetchIPDetails) {
            return NextResponse.json({ totalVisits }, { status: 200 });
        }
        const ipDetails = await UniqueViews.find().select("-__v");

        return NextResponse.json({ totalVisits, ipDetails }, { status: 200 });

    } catch (error) {
        console.error("Error in GET /unique-views:", error);
        return NextResponse.json({
            totalVisits: 0,
            ipDetails: [],
        }, { status: 500 });
    }
}
