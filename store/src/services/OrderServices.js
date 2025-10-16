import requests from "./httpServices";

// Helper to attach JWT token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // adjust if your token is stored elsewhere
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const OrderServices = {
  // === POST requests (add order / Razorpay) ===
  addOrder: async (body) => {
    return requests.post("/order/add", body, getAuthHeaders());
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body, getAuthHeaders());
  },

  addRazorpayOrder: async (body) => {
    return requests.post("/order/add/razorpay", body, getAuthHeaders());
  },

  createOrderByRazorPay: async (body) => {
    return requests.post("/order/create/razorpay", body, getAuthHeaders());
  },

  cancelOrderById: async (id) => {
    return requests.post(`/order/cancel/${id}`, {}, getAuthHeaders());
  },

  // === GET requests ===
  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/order`, { page, limit }, getAuthHeaders());
  },

  getOrderById: async (id, body = {}) => {
    return requests.get(`/order/${id}`, body, getAuthHeaders());
  },
};

export default OrderServices;
