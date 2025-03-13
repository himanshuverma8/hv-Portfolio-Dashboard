import { NextResponse } from "next/server";
import UniqueViews from "@/model/UniqueViews";
import { connect } from "@/dbConfig/dbConfig";

// Ensure database connection
await connect();

export async function GET() {
    try {
        // Fetch unique IPs with their earliest recorded timestamps
        const uniqueIpsData = await UniqueViews.aggregate([
            {
                $group: {
                    _id: "$ip",
                    createdAt: { $min: "$createdAt" }, // Get the earliest recorded timestamp for each IP
                },
            },
        ]);

        const totalVisits = await UniqueViews.countDocuments();

        // Function to fetch IP details
        const fetchIPDetails = async ({ _id: ip, createdAt }) => {
            try {
                const response = await fetch(`https://ipinfo.io/${ip}/json`);
                if (!response.ok) throw new Error("Failed to fetch IP details");
                const data = await response.json();
                return { ip, createdAt, ...data };
            } catch (error) {
                throw new Error("Could not fetch IP details");
            }
        };

        // Fetch details for all IPs concurrently
        let ipDetails = [];
        try {
            ipDetails = await Promise.all(uniqueIpsData.map(fetchIPDetails));
        } catch (error) {
            return NextResponse.json({ totalVisits, ipDetails: [] }, { status: 200 });
        }

        return NextResponse.json({ totalVisits, ipDetails }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ totalVisits: await UniqueViews.countDocuments(), ipDetails: [] }, { status: 200 });
    }
}
