import api from "../axios";

class Service {
  constructor(request) {
    this.request = request;
  }

  async SignUp(data) {
    return this.request.post(`create_users`, data);
  }

  async SignIn(data) {
    return this.request.post(`login`, data);
  }

  async GetTotalUserRecordings() {
    return this.request.get(`total-recordings-user`);
  }

  async TotalAnalysis() {
    return this.request.get(`total-analysis`);
  }

  async RecentRecordings() {
    return this.request.get(`recent-recordings?skip=0&limit=5`);
  }

  async getAgentReport(id) {
    return this.request.get(`AgentDetails?agent_id=${id}`);
  }

  async getAgentAnalysis(id) {
    return this.request.get(`total-agent-analysis?agent_id=${id}`);
  }

  async Leaderboard() {
    return this.request.get(`leaderboard`);
  }

  async Account() {
    return this.request.get(`account`);
  }
}

const ApiService = new Service(api);

export default ApiService;
