import requests from "./httpServices";

const CustomerServices = {
  
  loginCustomer: async (body) => {
    return requests.post("/customer/login", body);
  },

  
  signUpCustomer: async (body) => {
    return requests.post("/customer/direct/signup", body);
  },

  
  verifyEmailAddress: async (body) => {
    return requests.post("/customer/verify-email", body);
  },


  registerCustomer: async (token, body) => {
    return requests.post(`/customer/register/${token}`, body);
  },

  
  signUpWithOauthProvider: async (body) => {
    return requests.post("/customer/signup/oauth", body);
  },

  signUpWithProvider(token, body) {
    return requests.post(`/customer/signup/${token}`, body);
  },

  
  forgetPassword: async (body) => {
    return requests.put("/customer/forget-password", body);
  },

  resetPassword: async (body) => {
    return requests.put("/customer/reset-password", body);
  },

  changePassword: async (body) => {
    return requests.post("/customer/change-password", body);
  },

  
  updateCustomer: async (id, body) => {
    return requests.put(`/customer/${id}`, body);
  },

  
  getShippingAddress: async (userId = "") => {
    // optional userId: backend may extract from token if not given
    return requests.get(`/customer/shipping/address/${userId}`);
  },

  
  contactSupport: async (body) => {
    return requests.post("/customer/support/contact", body);
  },

  
  addShippingAddress: async (shippingAddressData) => {
    return requests.post("/customer/shipping/address", shippingAddressData);
  },
};

export default CustomerServices;
