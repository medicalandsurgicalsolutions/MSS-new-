import requests from "./httpServices";

const OrderServices = {
  addOrder: async (body) => requests.post("/order/add", body),
  addRazorpayOrder: async (body) => requests.post("/order/add/razorpay", body),
  createOrderByRazorPay: async (body) => requests.post("/order/create/razorpay", body),
  createPaymentIntent: async (body) => requests.post("/order/create-payment-intent", body),
  cancelOrderById: async (id) => requests.post(`/order/cancel/${id}`, {}),
  getOrderCustomer: async ({ page = 1, limit = 8 }) =>
    requests.get("/order", { page, limit }),
  getOrderById: async (id, body = {}) =>
    requests.get(`/order/${id}`, body),
};

export default OrderServices;
