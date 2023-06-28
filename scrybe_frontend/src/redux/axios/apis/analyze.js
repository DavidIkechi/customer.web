import api from "../axios";

export const UploadAudiosApi = (data) => {
  return api.post(`analyse/upload_audios`, data);
};

export const TryforFreeApi = (data) => {
  return api.post(`analyse/tryForFree`, data);
};
