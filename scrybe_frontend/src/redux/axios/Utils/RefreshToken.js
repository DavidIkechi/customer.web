import axios from "axios";
import { setToken } from "../../features/users/userSlice";
import { dispatch } from "../../store";

export const RefreshToken = async () => {
  let refreshToken = localStorage.getItem("heedRefreshToken");
  const formBody = {
    refresh_token: refreshToken,
  };
  try {
    const headers = {
      "content-type": "application/json",
    };
    if (refreshToken === null) {
      return;
    } else {
      const res = await axios.post(
        "https://api.heed.cx/users/refresh-token",
        formBody,
        headers
      );
      return res.data;
    }
  } catch (err) {
    console.log("this is error on refresh token file: ", err);
    dispatch(setToken(null));
    localStorage.clear();
    sessionStorage.clear();
  }
};
