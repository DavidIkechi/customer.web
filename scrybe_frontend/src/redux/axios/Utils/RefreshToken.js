import axios from "axios";
import { setToken } from "../../features/users/userSlice";

export const RefreshToken = async () => {
  let refreshToken = localStorage.getItem("heedRefreshToken");
  const formBody = {
    refresh_token: refreshToken,
  };
  try {
    const headers = {
      "content-type": "application/json",
    };
    const res = await axios.post(
      "https://api.heed.cx/users/refresh-token",
      formBody,
      headers
    );
    return res.data;
  } catch (err) {
    console.log("this is error on refresh token file: ", err);
    setToken(null);
    localStorage.clear();
    sessionStorage.clear();
  }
};
