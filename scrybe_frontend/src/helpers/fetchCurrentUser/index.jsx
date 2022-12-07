import axios from "axios";
const config = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
  },
};
export const fetchCurrentUser = async () => {
  try {
    const res = await axios.get("account", config);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
