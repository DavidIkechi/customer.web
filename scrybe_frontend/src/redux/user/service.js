import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://api.heed.hng.tech";
const token = localStorage.getItem("heedAccessToken");
const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${token}`,
};

// register user
const register = async (registerDetails) => {
  const response = await axios.post(`create_users`, registerDetails);
  return response.data;
};

// login user
const login = async (loginDetails) => {
  const response = await axios.post(`login`, loginDetails);
  if (response.data.access_token) {
    localStorage.setItem("heedAccessToken", response.data.access_token);
    localStorage.setItem("heedRefreshToken", response.data.refresh_token);
    Cookies.set("heedAccessToken", response.data.access_token);
    localStorage.setItem("heedAccessTokenType", response.data.token_type);
  }
  return response.data;
};

// logout user
const logout = () => {
  localStorage.clear();
  Cookies.remove("heedAccessToken");
};

const getuser = async () => {
  const response = await axios.get(`account`, {
    headers,
  });
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const authServices = {
  register,
  login,
  logout,
  getuser,
};

export default authServices;
