import api from "../axios";

class Service {
  constructor(request) {
    this.request = request;
  }

  async GetTotalUserRecordings() {
    return this.request.get(`/total-recordings-user`);
  }

  async TotalAnalysis() {
    return this.request.get("/total-analysis");
  }

  async RecentRecordings() {
    return this.request.get("/recent-recordings?skip=0&limit=5");
  }
}

const ApiService = new Service(api);

export default ApiService;
