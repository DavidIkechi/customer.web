import api from "../axios";

export const LeaderBoardApi = async () => {
  return api.get(`agents/leaderboard`);
};

export const TotalAgentAnalysisApi = async (id) => {
  return api.get(`agents/total-agent-analysis?agent_id=${id}`);
};

export const CreateApi = async (data) => {
  return api.post(`agents/agent`, data);
};

export const AgentDetailsApi = (id) => {
  return api.get(`agents/AgentDetails?agent_id=${id}`);
};
