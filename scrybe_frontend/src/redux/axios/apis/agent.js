import api from "../axios";

const baseURL = "https://api.heed.cx/agents/";
api.defaults.baseURL = baseURL;

export const LeaderBoardApi = async () => {
  return api.get(`leaderboard`);
};

export const TotalAgentAnalysisApi = async (id) => {
  return api.get(`total-agent-analysis?agent_id=${id}`);
};

export const CreateApi = async (data) => {
  return api.post(`agent`, data);
};

export const AgentDetailsApi = (id) => {
  return api.get(`AgentDetails?agent_id=${id}`);
};
