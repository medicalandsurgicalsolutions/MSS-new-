import requests from "./httpService";

const RatingServices = {
    
  getAllRatings: async () => {
    return requests.get("/rating");
  },

  getRatingById: async (id) => {
    return requests.get(`/rating/${id}`);
  },

  addRating: async (body) => {
    return requests.post("/rating/add", body);
  },

  updateRating: async (id, body) => {
    return requests.put(`/rating/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/rating/status/${id}`, body);
  },

  deleteRating: async (id, body) => {
    return requests.delete(`/rating/${id}`, body);
  },

  deleteManyRating: async (body) => {
    return requests.patch("/rating/delete/many", body);
  },
};

export default RatingServices;
