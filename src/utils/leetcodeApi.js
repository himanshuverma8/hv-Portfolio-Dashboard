import axios from "axios";

export default async function fetchLeetcodeStats(handle) {
    try {
        const { data } = await axios.get(`http://localhost:5040/leetcode/${handle}`);
        return data;
    } catch (error) {
        console.error("Error fetching LeetCode stats:", error.message);
        return null;
    }
}
