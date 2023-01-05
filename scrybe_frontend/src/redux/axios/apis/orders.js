import api from "../axios";

// const baseURL = "https://api.heed.cx/orders/";
// api.defaults.baseURL = baseURL;

export const CreateOrderApi = (data) => {
  return api.post(`orders/create_order`, data);
};

export const VerifyOrderApi = (data, ref_code) => {
  return api.post(`orders/verify_order/${ref_code}`, data);
};
