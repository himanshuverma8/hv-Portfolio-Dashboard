import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function fetchLeetcodeData(handle) {
    try {
        // Fetching data from LeetCode API
        const [solvedData, contestData, submissionsData] = await Promise.all([
            axios.get(`https://leetcode-api-pied.vercel.app/user/${handle}`),
            axios.get(`https://leetcode-api-pied.vercel.app/user/${handle}/contests`),
            axios.get(`https://leetcode-api-pied.vercel.app/user/${handle}/submissions`)
        ]);

        // Extract solved problems data
        const solvedStats = solvedData.data.submitStats.acSubmissionNum;
        const totalSolved = solvedStats.find(stat => stat.difficulty === "All")?.count || 0;
        const easySolved = solvedStats.find(stat => stat.difficulty === "Easy")?.count || 0;
        const mediumSolved = solvedStats.find(stat => stat.difficulty === "Medium")?.count || 0;
        const hardSolved = solvedStats.find(stat => stat.difficulty === "Hard")?.count || 0;
        const solvedString = `${totalSolved} | ${easySolved} (easy) | ${mediumSolved} (medium) | ${hardSolved} (hard)`;

        // Extract max rating from contest history
        const history = contestData.data?.userContestRankingHistory || [];
        const maxRating = history.length > 0 ? Math.max(...history.map(h => h.rating)) : 0;
        const topPercentage = contestData.data?.userContestRanking?.topPercentage || 0;

        // Extract last submission and timestamp
        const lastSubmission = submissionsData.data.length > 0 ? submissionsData.data[0].title : "No submissions found";
        const lastSubmissionTime = submissionsData.data.length > 0 ? submissionsData.data[0].timestamp : null;

        return { solvedString, maxRating, topPercentage, lastSubmission, lastSubmissionTime };
    } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
        return null;
    }
}

// API Route
export async function GET(req, { params }) {
    const handle = params.handle;
    const data = await fetchLeetcodeData(handle);

    if (data) {
        return NextResponse.json(data);
    } else {
        return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
    }
}
