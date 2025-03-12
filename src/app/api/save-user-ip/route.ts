import { NextRequest, NextResponse } from "next/server";
import UniqueViews from "@/model/UniqueViews";
import { connect } from "@/dbConfig/dbConfig";

// Ensure database connection
await connect();

export async function POST(req: NextRequest) {
    try {
        const { ip } = await req.json();

        // Check if the IP is already stored
        const existingUser = await UniqueViews.findOne({ ip });

        if (!existingUser) {
            const newUser = new UniqueViews({ ip });
            await newUser.save();
        }

        return NextResponse.json({ message: "IP saved successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
