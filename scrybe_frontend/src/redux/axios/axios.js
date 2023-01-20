import axios from "axios";
import { setToken } from "../features/users/userSlice";
import { dispatch } from "../store";
import { RefreshToken } from "./Utils/RefreshToken";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "content-type": "Application/json",
};

axios.defaults.baseURL = "https://api.heed.cx/";

const axiosInstance = axios.create({
  headers,
  timeout: 60000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("heedAccessToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    } else {
      const rememberMe = localStorage.getItem("rememberMe");
      if (rememberMe) {
        console.log(rememberMe);
        const Token = localStorage.getItem("heedAccessToken");
        dispatch(setToken(Token));
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${Token}`,
        };
      }
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

      sessionStorage.setItem("heedAccessToken", data.access_token);
      localStorage.setItem("heedAccessToken", data.access_token);
      localStorage.setItem("heedRefreshToken", data.refresh_token);
      dispatch(setToken(data.access_token));
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data.access_token;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
