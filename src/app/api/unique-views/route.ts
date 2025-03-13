import { NextResponse } from "next/server";
import UniqueViews from "@/model/UniqueViews";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req) {
    try {
        // Ensure database connection
        await connect();

        // Extract query parameters from the request URL
        const url = new URL(req.url);
        const fetchIPDetails = url.searchParams.get("fetchIPDetails") === "true";

        // Get the total unique visit count
        const totalVisits = await UniqueViews.countDocuments();

        // If frontend only requests unique count, return early
        if (!fetchIPDetails) {
            return NextResponse.json({ totalVisits }, { status: 200 });
        }

        // Fetch unique IPs with their earliest recorded timestamps
        const uniqueIpsData = await UniqueViews.aggregate([
            {
                $group: {
                    _id: "$ip",
                    createdAt: { $min: "$createdAt" },
                },
            },
        ]);

        // Function to fetch IP details
        const fetchIPDetailsFunc = async ({ _id: ip, createdAt }) => {
            try {
                const response = await fetch(`https://ipinfo.io/${ip}?token=${process.env.iptoken}`);
                if (!response.ok) throw new Error("Failed to fetch IP details");
                const data = await response.json();
                return { ip, createdAt, ...data };
            } catch (error) {
                return { ip, createdAt, error: "Could not fetch IP details" };
            }
        };

        // Fetch details for all IPs concurrently
        const ipDetails = await Promise.all(uniqueIpsData.map(fetchIPDetailsFunc));

        return NextResponse.json({ totalVisits, ipDetails }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ totalVisits: await UniqueViews.countDocuments(), ipDetails: [] }, { status: 200 });
    }
}