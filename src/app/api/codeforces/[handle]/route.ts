import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function fetchCodeforcesData(handle: string) {
    try {
        const userResponse = await axios.get(
            `https://codeforces.com/api/user.info?handles=${handle}`
        );
        const userData = userResponse.data.result[0];
        const maxRating = userData.maxRating || 0;
        const friendsCount = userData.friendOfCount || 0;

        const submissionsResponse = await axios.get(
            `https://codeforces.com/api/user.status?handle=${handle}`
        );
        const submissions = submissionsResponse.data.result;
        const solvedProblems = new Set<string>();
        let lastSubmission: { title: string; timestamp: string | null } = { title: "No submissions found", timestamp: null };

        submissions.forEach((sub: any) => {
            if (sub.verdict === "OK") {
                solvedProblems.add(sub.problem.contestId + "-" + sub.problem.index);
            }
        });

        if (submissions.length > 0) {
            const lastSub = submissions[0];
            lastSubmission = {
                title: lastSub.problem.name,
                timestamp: new Date(lastSub.creationTimeSeconds * 1000).toISOString(),
            };
        }

        const totalSolved = solvedProblems.size;

        const contestsResponse = await axios.get(
            `https://codeforces.com/api/user.rating?handle=${handle}`
        );
        const contests = contestsResponse.data.result;
        let bestRank = Number.MAX_SAFE_INTEGER;
        let bestContest = "";

        contests.forEach((contest: any) => {
            if (contest.rank < bestRank) {
                bestRank = contest.rank;
                bestContest = contest.contestName;
            }
        });

        const bestRankStr = userData.rank;

        return {
            maxRatingWithRank: `${maxRating} (${bestRankStr})`,
            totalSolved,
            friendsCount,
            bestContest: bestContest || "N/A",
            bestRank,
            lastSubmission,
        };
    } catch (error) {
        console.error("Error fetching Codeforces data:", (error as any)?.message || error);
        return null;
    }
}

export async function GET(req: NextRequest, { params }: { params: { handle: string } }) {
    const handle = params.handle;
    const data = await fetchCodeforcesData(handle);
    if (data) {
        return NextResponse.json(data);
    }
    return NextResponse.json({ error: "Failed to fetch Codeforces stats" }, { status: 500 });
}


