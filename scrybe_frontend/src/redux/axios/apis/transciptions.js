import api from "../axios";

class Transcriptions {
  constructor(request) {
    this.request = request;
  }

  async GetTranscription(id) {
    return this.request.get(`${id}`);
  }

  async GetTranscipt(id) {
    return this.request.get(`get_transcript/${id}`);
  }
}

const baseURL = "https://api.heed.cx/transciption/";
api.defaults.baseURL = baseURL;

const TranscriptionService = new Transcriptions(api);

export default TranscriptionService;
