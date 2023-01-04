import api from "../axios";

const baseURL = "https://api.heed.cx/transciption/";
api.defaults.baseURL = baseURL;

export const GetTranscriptionApi = (id) => {
  return api.get(`${id}`);
};

export const GetTransciptApi = (id) => {
  return api.get(`get_transcript/${id}`);
};
