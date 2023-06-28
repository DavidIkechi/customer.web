import api from "../axios";

// const baseURL = "https://api.heed.cx/sentiments/";
// api.defaults.baseURL = baseURL;

export const DownloadApi = (id) => {
  return api.get(`sentiments/download/${id}`);
};

export const TotalAnalysisApi = () => {
  return api.get(`/sentiments/total-analysis`);
};

export const GetAnaylsisApi = (id) => {
  return api.get(`sentiments/new_analysis/${id}`);
};
