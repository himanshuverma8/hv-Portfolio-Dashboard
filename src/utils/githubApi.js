import axios from "axios";

export default async function fetchGithubStats(username) {
    try {
        // Fetch user details (followers, following, public repos)
        const { data: userData } = await axios.get(`https://api.github.com/users/${username}`);

        // Fetch user repositories to find the most recently modified one
        const { data: reposData } = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);

        if (!reposData.length) {
            return {
                followers: userData.followers,
                following: userData.following,
                publicRepos: userData.public_repos,
                recentRepo: "No repositories found"
            };
        }

        // Find the repository with the most recent `pushed_at` timestamp
        const recentRepo = reposData.reduce((latest, repo) => 
            new Date(repo.pushed_at) > new Date(latest.pushed_at) ? repo : latest
        );

        return {
            followers: userData.followers,
            following: userData.following,
            publicRepos: userData.public_repos,
            recentRepo: recentRepo.name
        };
        
    } catch (error) {
        console.error("Error fetching GitHub stats:", error.message);
        return null;
    }
}