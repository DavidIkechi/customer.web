import axios from "axios";
import { RefreshToken } from "./Utils/RefershToken";

export const baseURL = "https://api.heed.hng.tech/";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "content-type": "Application/json",
};

const axiosInstance = axios.create({
  baseURL,
  headers,
  timeout: 60000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("heedAccessToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const data = await RefreshToken();
      localStorage.setItem("heedAccessToken", data.access_token);
      localStorage.setItem("heedRefreshToken", data.refresh_token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data.access_token;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
