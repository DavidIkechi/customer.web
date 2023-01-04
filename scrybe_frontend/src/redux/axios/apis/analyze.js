import api from "../axios";

const baseURL = "https://api.heed.cx/analyse/";
api.defaults.baseURL = baseURL;

export const UploadAudiosApi = (data) => {
  return api.post(`upload_audios`, data);
};

export const TryforFreeApi = (data) => {
  return api.post(`tryForFree`, data);
};
