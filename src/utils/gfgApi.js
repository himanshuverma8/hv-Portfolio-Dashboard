import axios from "axios";

export default async function fetchGFGStats(handle) {
    try {
        const response = await axios.get(`https://geeks-for-geeks-api.vercel.app/${handle}`);
        const data = response.data; // Extracting actual data
        const {totalProblemsSolved, currentStreak, codingScore} = data.info;
        return {
           totalProblemsSolved,
           currentStreak,
           codingScore
        };

    } catch (error) {
        console.error("Error fetching CodeChef data:", error.message);
        return null;
    }
}
