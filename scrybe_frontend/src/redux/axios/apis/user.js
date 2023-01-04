import api from "../axios";

const baseURL = "https://api.heed.cx/users/";
api.defaults.baseURL = baseURL;

export const SignUpApi = async (data) => {
  return api.post(`create_users`, data);
};

export const GoogleSignInApi = async (email) => {
  return api.get(`auth/google?email=${email}`);
};

export const AccountApi = async () => {
  return api.get(`account`);
};
