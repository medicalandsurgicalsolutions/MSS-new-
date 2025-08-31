import requests from "./httpServices";

const BrandServices = {
  getAll: async () => {
    return requests.get(`/brand/show`);
  },
};

export default BrandServices;
