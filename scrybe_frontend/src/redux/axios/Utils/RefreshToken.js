import axios from "axios";

export const RefreshToken = async () => {
  let refreshToken = sessionStorage.getItem("heedRefreshToken");
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
    console.log(err);
  }
};
