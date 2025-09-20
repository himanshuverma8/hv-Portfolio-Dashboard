import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function fetchGithubStats(username) {
    try {
        const headers = {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${process.env.GITHUB_PAT}`
        };

        const { data: userData } = await axios.get(`https://api.github.com/users/${username}`, { headers });
        const { data: reposData } = await axios.get(`https://api.github.com/user/repos?per_page=100`, { headers });

        const ownedRepos = reposData.filter(repo => repo.owner.login === username);

        if (!ownedRepos.length) {
            return {
                followers: userData.followers,
                following: userData.following,
                publicRepos: 0,
                privateRepos: 0,
                totalRepos: 0,
                recentRepo: "No repositories found",
                totalCommits: 0,
                recentCommit: "No commits found",
                recentCommitTime: "N/A"
            };
        }

        const publicRepoCount = ownedRepos.filter(repo => !repo.private).length;
        const privateRepoCount = ownedRepos.length - publicRepoCount;

        const recentRepo = ownedRepos.reduce((latest, repo) => 
            new Date(repo.pushed_at) > new Date(latest.pushed_at) ? repo : latest
        );

        let totalCommits = 0;
        let recentCommit = "No commits found";
        let recentCommitTime = "N/A";

        await Promise.all(ownedRepos.map(async (repo) => {
            try {
                const { data: commits } = await axios.get(
                    `https://api.github.com/repos/${username}/${repo.name}/commits`,
                    { headers }
                );
                totalCommits += commits.length;
            } catch (commitError) {
                console.warn(`Could not fetch commits for ${repo.name}:`, commitError.message);
            }
        }));

        try {
            const { data: commits } = await axios.get(
                `https://api.github.com/repos/${username}/${recentRepo.name}/commits`,
                { headers }
            );
            if (commits.length > 0) {
                recentCommit = commits[0].commit.message;
                recentCommitTime = commits[0].commit.committer.date;
            }
        } catch (commitError) {
            console.warn(`Could not fetch commits for ${recentRepo.name}:`, commitError.message);
        }

        return {
            followers: userData.followers,
            following: userData.following,
            publicRepos: publicRepoCount,
            privateRepos: privateRepoCount,
            totalRepos: publicRepoCount + privateRepoCount,
            recentRepo: recentRepo.name,
            totalCommits,
            recentCommit,
            recentCommitTime
        };

    } catch (error) {
        console.error("Error fetching GitHub stats:", error.message);
        return null;
    }
}

export async function GET(req, { params }) {
    const handle = params?.handle;
    const data = await fetchGithubStats(handle);

    if (data) {
        return NextResponse.json(data);
    } else {
        return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
    }
}
