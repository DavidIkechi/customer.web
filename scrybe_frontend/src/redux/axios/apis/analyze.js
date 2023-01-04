import api from "../axios";

class Analyze {
  constructor(request) {
    this.request = request;
  }

  async UploadAudios(data) {
    return this.request.post(`upload_audios`, data);
  }

  async TryforFree(data) {
    return this.request.post(`tryForFree`, data);
  }
}

const baseURL = "https://api.heed.cx/analyse/";
api.defaults.baseURL = baseURL;

const AnalyzeService = new Analyze(api);

export default AnalyzeService;
