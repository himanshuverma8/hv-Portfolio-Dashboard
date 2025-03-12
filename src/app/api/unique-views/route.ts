import { NextResponse } from "next/server";
import UniqueViews from "@/model/UniqueViews";
import { connect } from "@/dbConfig/dbConfig";

// Ensure database connection
connect();

export async function GET() {
    try {
        const count = await UniqueViews.countDocuments();
        return NextResponse.json({ count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
