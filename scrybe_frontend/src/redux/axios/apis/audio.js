import api from "../axios";

export const UserAudiosApi = () => {
  return api.get(`audios/list-audios-by-user`);
};

export const GetUploadedAudiosApi = () => {
  return api.get(`audios/get_uploaded_jobs`);
};

export const GetAudioSentimentApi = (audio_id) => {
  return api.get(`audios/${audio_id}/sentiment`);
};

export const RecentRecordingsApi = () => {
  return api.get(`audios/recent-recordings`);
};

export const TotalRecordingsApi = () => {
  return api.get(`audios/total-recordings-user`);
};

export const DeleteAudioApi = (id) => {
  return api.get(`audios/delete?audios=${id}`);
};
