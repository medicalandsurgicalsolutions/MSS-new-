import requests from "./httpService";

const AwardServices = {
  getAllAwards: async () => {
    return requests.get("/award");
  },

  getAwardById: async (id) => {
    return requests.get(`/award/${id}`);
  },

  addAward: async (body) => {
    return requests.post("/award/add", body);
  },

  updateAward: async (id, body) => {
    return requests.put(`/award/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/award/status/${id}`, body);
  },

  deleteAward: async (id, body) => {
    return requests.delete(`/award/${id}`, body);
  },

  deleteManyAward: async (body) => {
    return requests.patch("/award/delete/many", body);
  },
};

export default AwardServices;
