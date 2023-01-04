import api from "../axios";

class Sentiments {
  constructor(request) {
    this.request = request;
  }

  async Download(id) {
    return this.request.get(`download/${id}`);
  }

  async TotalAnalysis() {
    return this.request.get(`total_analysis`);
  }

  async GetAnaylsis(id) {
    return this.request.get(`new_analysis/${id}`);
  }
}

const baseURL = "https://api.heed.cx/sentiments/";
api.defaults.baseURL = baseURL;

const SentimentService = new Sentiments(api);

export default SentimentService;
