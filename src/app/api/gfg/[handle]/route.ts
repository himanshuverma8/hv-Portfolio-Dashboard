import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function fetchGFGData(handle: string) {
    try {
       const response = await axios.get(`https://geeks-for-geeks-api.vercel.app/${handle}`);
               const data = response.data; 
               const {totalProblemsSolved, currentStreak, codingScore} = data.info;
               return {
                totalProblemsSolved,
                currentStreak,
                codingScore
             };
    } catch (error) {
        console.error("Error fetching GFG stats:", error);
        return null;
    }
}

// API Route
export async function GET(req: NextRequest, { params }: { params: { handle: string } }) {
    const handle = params?.handle;
    const data = await fetchGFGData(handle);
    if (data) {
        return NextResponse.json(data);
    } else {
        return NextResponse.json({ error: "Failed to fetch GFG stats" }, { status: 500 });
    }
}
