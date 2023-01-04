import axios from "axios";

const token = sessionStorage.getItem("heedAccessToken");
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
    // Cookies.set("heedAccessToken", response.data.access_token);
  }
  return response.data;
};

// logout user
const logout = () => {
  sessionStorage.removeItem("heedAccessToken");
  sessionStorage.removeItem("heedRefreshToken");
  localStorage.removeItem("user");
  // Cookies.remove("heedAccessToken");
};

const getuser = async () => {
  const response = await axios.get(`users/account`, {
    headers,
  });
  if (response?.data?.detail?.first_name) {
    localStorage.setItem("user", JSON.stringify(response.data.detail));
  } else {
    localStorage.removeItem("user");
  }

  return response.data?.detail;
};

const authServices = {
  register,
  login,
  logout,
  getuser,
};

export default authServices;
