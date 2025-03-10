import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function fetchLeetcodeData(handle: string) {
    try {
        // Fetching data from LeetCode API
        const [solvedData, contestData, submissionsData] = await Promise.all([
            axios.get(`https://leetcode-api-pied.vercel.app/user/${handle}`),
            axios.get(`https://leetcode-api-pied.vercel.app/user/${handle}/contests`),
            axios.get(`https://leetcode-api-pied.vercel.app/user/${handle}/submissions`)
        ]);

        // Extract solved problems data
        const solvedStats = solvedData.data?.submitStats?.acSubmissionNum || [];
        const totalSolved = solvedStats.find((stat: { difficulty: string; }) => stat.difficulty === "All")?.count || 0;
        const easySolved = solvedStats.find((stat: { difficulty: string; }) => stat.difficulty === "Easy")?.count || 0;
        const mediumSolved = solvedStats.find((stat: { difficulty: string; }) => stat.difficulty === "Medium")?.count || 0;
        const hardSolved = solvedStats.find((stat: { difficulty: string; }) => stat.difficulty === "Hard")?.count || 0;

        // Concatenated solved problems
        const solvedString = `${totalSolved} | ${easySolved} (easy) | ${mediumSolved} (medium) | ${hardSolved} (hard)`;

        // Extract contest stats
        const maxRating = contestData.data?.userContestRanking?.rating || 0;
        const topPercentage = contestData.data?.userContestRanking?.topPercentage || 0;

        // Extract last submission
        const lastSubmission = submissionsData.data?.length > 0 ? submissionsData.data[0]?.title || "No submissions found" : "No submissions found";

        return { solvedString, maxRating, topPercentage, lastSubmission };
    } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
        return null;
    }
}

// API Route
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const handle = searchParams.get("handle");

        if (!handle) {
            return NextResponse.json({ error: "Handle is required" }, { status: 400 });
        }

        const data = await fetchLeetcodeData(handle);

        if (data) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
