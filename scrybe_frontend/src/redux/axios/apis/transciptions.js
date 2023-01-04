import api from "../axios";

export const GetTranscriptionApi = (id) => {
  return api.get(`transciption/${id}`);
};

export const GetTransciptApi = (id) => {
  return api.get(`transciption/get_transcript/${id}`);
};
