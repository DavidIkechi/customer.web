import axios from "axios";

// this file will be used to fetch the current user from backend
const config = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
  },
};
export const fetchCurrentUser = async () => {
  const res = await axios.get("account", config);
  return res.data;
};
