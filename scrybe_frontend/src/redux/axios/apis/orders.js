import api from "../axios";

export const CreateOrderApi = (order) => {
  return api.post(`orders/create_order`, {
    billing_plan: order,
  });
};

export const VerifyOrderApi = (order, ref_code) => {
  return api.post(`orders/verify_order/${ref_code}`, order);
};
