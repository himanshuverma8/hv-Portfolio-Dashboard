import axios from "axios";

const fetchCodeforcesStats = async (handle) => {
  try {
    // Fetch user rating and friend count
    const userResponse = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );

    const userData = userResponse.data.result[0];
    const maxRating = userData.maxRating || 0;
    const friendsCount = userData.friendOfCount || 0;

    // Fetch user submissions to count solved questions & get last submission
    const submissionsResponse = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );

    const submissions = submissionsResponse.data.result;
    const solvedProblems = new Set();
    let lastSubmission = { title: "No submissions found", timestamp: null };

    submissions.forEach((sub) => {
      if (sub.verdict === "OK") {
        solvedProblems.add(sub.problem.contestId + "-" + sub.problem.index);
      }
    });

    if (submissions.length > 0) {
      const lastSub = submissions[0]; // Latest submission
      lastSubmission = {
        title: lastSub.problem.name,
        timestamp: new Date(lastSub.creationTimeSeconds * 1000).toISOString(), // Convert to readable format
      };
    }

    const totalSolved = solvedProblems.size;

    // Fetch user contest history to find the best rank
    const contestsResponse = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );

    const contests = contestsResponse.data.result;
    let bestRank = Number.MAX_SAFE_INTEGER;
    let bestContest = "";

    contests.forEach((contest) => {
      if (contest.rank < bestRank) {
        bestRank = contest.rank;
        bestContest = contest.contestName;
      }
    });

    const bestRankStr = userData.rank;

    return {
      maxRatingWithRank: `${maxRating} (${bestRankStr})`, // Concatenated value
      totalSolved,
      friendsCount,
      bestContest: bestContest || "N/A",
      bestRank,
      lastSubmission, // Includes last submitted question & timestamp
    };
  } catch (error) {
    console.error("Error fetching Codeforces data:", error);
    return null;
  }
};

export default fetchCodeforcesStats;
