import api from "../axios";

const baseURL = "https://api.heed.cx/audios/";
api.defaults.baseURL = baseURL;

export const UserAudiosApi = () => {
  return api.get(`list-audios-by-user`);
};

export const GetUploadedAudiosApi = () => {
  return api.get(`get_uploaded_jobs`);
};

export const GetAudioSentimentApi = (audio_id) => {
  return api.get(`${audio_id}/sentiment`);
};

export const RecentRecordingsApi = () => {
  return api.get(`recent-recordings`);
};

export const TotalRecordingsApi = () => {
  return api.get(`total-recordings-user`);
};

export const DeleteAudioApi = (id) => {
  return api.get(`delete?audios=${1}`);
};
