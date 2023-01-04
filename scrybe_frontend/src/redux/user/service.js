import axios from "axios";
import { getToken } from "../../helpers/GetToken";

const token = getToken();
const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${token}`,
};

// register user
const register = async (registerDetails) => {
  const response = await axios.post(`users/create_users`, registerDetails);
  return response.data.detail;
};

// login user
const login = async (loginDetails) => {
  const response = await axios.post(`users/login`, loginDetails);
  if (response.data.access_token) {
    sessionStorage.setItem("heedAccessToken", response.data.access_token);
    sessionStorage.setItem("heedRefreshToken", response.data.refresh_token);
  }
  return response.data;
};

// logout user
const logout = () => {
  sessionStorage.removeItem("heedAccessToken");
  sessionStorage.removeItem("heedRefreshToken");
  localStorage.removeItem("user");
};

const getuser = async () => {
  const res = await axios.get(`users/account`, {
    headers,
  });
  if (res.data.detail) {
    localStorage.setItem("user", JSON.stringify(res.data.detail));
  } else {
    localStorage.removeItem("user");
    sessionStorage.removeItem("heedAccessToken");
    sessionStorage.removeItem("heedRefreshToken");
  }
  return res.data?.detail;
};

const authServices = {
  register,
  login,
  logout,
  getuser,
};

export default authServices;
