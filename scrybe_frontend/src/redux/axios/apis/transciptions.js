import api from "../axios";

export const GetTranscriptionApi = (id) => {
  return api.get(`transcription/${id}`);
};

export const GetTransciptApi = (id) => {
  return api.get(`transcription/get_transcript/${id}`);
};
