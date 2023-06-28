import api from "../axios";

export const createPaymentEndpointApi = (url, order) => {
  return api.post(`orders/${url}`, order);
};
export const verifyStripeOrderApi = (ref_code) => {
  return api.get(`orders/stripe-order-details/${ref_code}`);
};
export const verifyFluterwaveOrderApi = (ref_code) => {
  return api.get(`orders/verify_flutter_order/${ref_code}`);
};
