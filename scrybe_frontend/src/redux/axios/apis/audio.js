import api from "../axios";

class Audio {
  constructor(request) {
    this.request = request;
  }

  async UserAudios() {
    return this.request.get(`list-audios-by-user`);
  }

  async GetUploadedAudios() {
    return this.request.get(`get_uploaded_jobs`);
  }

  async GetAudioSentiment(audio_id) {
    return this.request.get(`${audio_id}/sentiment`);
  }

  async RecentRecordings() {
    return this.request.get(`recent-recordings`);
  }

  async TotalRecordings() {
    return this.request.get(`total-recordings-user`);
  }

  async Delete(id) {
    return this.request.get(`delete?audios=${1}`);
  }
}

const baseURL = "https://api.heed.cx/audios/";
api.defaults.baseURL = baseURL;

const AudioService = new Audio(api);

export default AudioService;
