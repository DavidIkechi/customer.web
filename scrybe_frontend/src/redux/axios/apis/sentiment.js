import api from "../axios";

const baseURL = "https://api.heed.cx/sentiments/";
api.defaults.baseURL = baseURL;

export const DownloadApi = (id) => {
  return api.get(`download/${id}`);
};

export const TotalAnalysisApi = () => {
  return api.get(`total_analysis`);
};

export const GetAnaylsisApi = (id) => {
  return api.get(`new_analysis/${id}`);
};
