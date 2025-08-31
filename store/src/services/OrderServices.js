import requests from "./httpServices";

const OrderServices = {
  addOrder: async (body, headers) => {
    return requests.post("/order/add", body, headers);
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body);
  },

  addRazorpayOrder: async (body) => {
    return requests.post("/order/add/razorpay", body);
  },

  createOrderByRazorPay: async (body) => {
    return requests.post("/order/create/razorpay", body);
  },

  cancelOrderById: async (id) => {
    return requests.post(`/order/cancel/${id}`);
  },

  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/order?limit=${limit}&page=${page}`);
  },
  getOrderById: async (id, body) => {
    return requests.get(`/order/${id}`, body);
  },
};

export default OrderServices;
