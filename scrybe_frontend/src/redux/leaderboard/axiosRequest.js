import axios from "axios";

const getLeaderboard = async () => {
  const response = await axios.get("agents/leaderboard");
  return response?.detail;
};

const leaderboardService = { getLeaderboard };

export default leaderboardService;
