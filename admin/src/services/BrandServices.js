import requests from "./httpService";

const BrandServices = {
  getAllBrands: async () => {
    return requests.get("/brands");
  },

  getBrandById: async (id) => {
    return requests.get(`/brand/${id}`);
  },

  addBrand: async (body) => {
    return requests.post("/brand/add", body);
  },

  updateBrand: async (id, body) => {
    return requests.put(`/brand/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/brand/status/${id}`, body);
  },

  deleteBrand: async (id, body) => {
    return requests.delete(`/brand/${id}`, body);
  },

  deleteManyBrand: async (body) => {
    return requests.patch("/brand/delete/many", body);
  },
};

export default BrandServices;
