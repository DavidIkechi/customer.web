import api from "../axios";

class Order {
  constructor(request) {
    this.request = request;
  }

  async Create(data) {
    return this.request.post(`create_order`, data);
  }

  async VerifyOrder(data, ref_code) {
    return this.request.post(`verify_order/${ref_code}`, data);
  }
}

const baseURL = "https://api.heed.cx/orders/";
api.defaults.baseURL = baseURL;

const OrderService = new Order(api);

export default OrderService;
