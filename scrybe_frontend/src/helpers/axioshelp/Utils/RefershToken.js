import axios from "axios";
import { headers } from "..";
import { baseURL } from "../axios";

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
      "https://api.heed.hng.tech/refresh-token",
      formBody,
      headers
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
