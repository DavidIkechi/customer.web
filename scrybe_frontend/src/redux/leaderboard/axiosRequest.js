import axios from "axios";

const token = sessionStorage.getItem("heedAccessToken");
const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${token}`,
};

const getLeaderboard = async () => {
  const response = await axios.get("agents/leaderboard", { headers });
  return response?.data?.detail;
};

const leaderboardService = { getLeaderboard };

export default leaderboardService;
