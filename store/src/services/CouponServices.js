import requests from "./httpServices";

const CouponServices = {
  getAllCoupons: async () => {
    return requests.get("/coupon");
  },
  getShowingCoupons: async () => {
    return requests.get("/coupon/show");
  },
  getUserCoupons: async (id) => {
    return requests.get(`/coupon/user/${id}`);
  },
};

export default CouponServices;
