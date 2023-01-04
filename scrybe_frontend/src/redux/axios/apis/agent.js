import api from "../axios";

class Agent {
  constructor(request) {
    this.request = request;
  }

  async LeaderBoard() {
    return this.request.get(`leaderboard`);
  }

  async TotalAgentAnalysis(id) {
    return this.request.get(`total-agent-analysis?agent_id=${id}`);
  }

  async Create(data) {
    return this.request.post(`agent`, data);
  }

  async AgentDetails(id) {
    return this.request.get(`AgentDetails?agent_id=${id}`);
  }
}

const baseURL = "https://api.heed.cx/agents/";
api.defaults.baseURL = baseURL;

const AgentService = new Agent(api);

export default AgentService;
