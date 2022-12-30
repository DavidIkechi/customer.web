import axios from "axios";
import Cookies from "js-cookie";

const token = localStorage.getItem("heedAccessToken");
const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${token}`,
};

// register user
const register = async (registerDetails) => {
  const response = await axios.post(`users/create_users`, registerDetails);
  return response.data;
};

// login user
const login = async (loginDetails) => {
  const response = await axios.post(`users/login`, loginDetails);
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
  localStorage.removeItem("heedAccessToken");
  localStorage.removeItem("heedRefreshToken");
  localStorage.removeItem("heedAccessTokenType");
  localStorage.removeItem("user");
  Cookies.remove("heedAccessToken");
};

const getuser = async () => {
  const response = await axios.get(`users/account`, {
    headers,
  });
  if (response?.data?.first_name) {
    localStorage.setItem("user", JSON.stringify(response.data));
  } else {
    localStorage.removeItem("user");
  }

  return response.data;
};

const authServices = {
  register,
  login,
  logout,
  getuser,
};

export default authServices;
