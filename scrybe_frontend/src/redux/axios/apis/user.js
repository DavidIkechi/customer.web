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
export const RefreshApiKey = async () => {
  return api.get(`/users/refresh-api-key`);
};

export const UpdateUserApi = async (data) => {
  return api.patch(`users/update_profile`, data);
};

export const ChangePasswordApi = async (data) => {
  return api.patch(`users/change-password`, data);
};

export const ResetPasswordApi = async (data, query) => {
  return api.patch(`users/reset-password?token=${query}`, data);
};
