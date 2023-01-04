import api from "../axios";

export const SignUpApi = async (data) => {
  return api.post(`users/create_users`, data);
};

export const GoogleSignInApi = async (email) => {
  return api.get(`users/auth/google?email=${email}`);
};

export const AccountApi = async () => {
  return api.get(`users/account`);
};
