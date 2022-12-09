import axios from "axios";

const baseURL = "https://api.heed.hng.tech/";

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

export default axiosInstance;
