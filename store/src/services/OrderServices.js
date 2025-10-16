import requests from "./httpServices";

// helper to attach token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // or wherever you store JWT
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const OrderServices = {
  addOrder: async (body) => {
    const headers = getAuthHeaders();
    return requests.post("/order/add", body, { headers });
  },

  createPaymentIntent: async (body) => {
    const headers = getAuthHeaders();
    return requests.post("/order/create-payment-intent", body, { headers });
  },

  addRazorpayOrder: async (body) => {
    const headers = getAuthHeaders();
    return requests.post("/order/add/razorpay", body, { headers });
  },

  createOrderByRazorPay: async (body) => {
    const headers = getAuthHeaders();
    return requests.post("/order/create/razorpay", body, { headers });
  },

  cancelOrderById: async (id) => {
    const headers = getAuthHeaders();
    return requests.post(`/order/cancel/${id}`, {}, { headers });
  },

  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    const headers = getAuthHeaders();
    return requests.get(`/order?limit=${limit}&page=${page}`, {}, { headers });
  },

  getOrderById: async (id, body) => {
    const headers = getAuthHeaders();
    return requests.get(`/order/${id}`, body, { headers });
  },
};

export default OrderServices;
