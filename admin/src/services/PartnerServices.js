import requests from "./httpService";

const PartnerServices = {
  getAllPartners: async () => {
    return requests.get("/partner");
  },

  getPartnerById: async (id) => {
    return requests.get(`/partner/${id}`);
  },

  addPartner: async (body) => {
    return requests.post("/partner/add", body);
  },

  updatePartner: async (id, body) => {
    return requests.put(`/partner/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/partner/status/${id}`, body);
  },

  deletePartner: async (id, body) => {
    return requests.delete(`/partner/${id}`, body);
  },

  deleteManyPartner: async (body) => {
    return requests.patch("/partner/delete/many", body);
  },
};

export default PartnerServices;
