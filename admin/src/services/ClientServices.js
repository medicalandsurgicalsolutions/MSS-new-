import requests from "./httpService";

const ClientServices = {
  getAllClients: async () => {
    return requests.get("/client");
  },

  getClientById: async (id) => {
    return requests.get(`/client/${id}`);
  },

  addClient: async (body) => {
    return requests.post("/client/add", body);
  },

  updateClient: async (id, body) => {
    return requests.put(`/client/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/client/status/${id}`, body);
  },

  deleteClient: async (id, body) => {
    return requests.delete(`/client/${id}`, body);
  },

  deleteManyClient: async (body) => {
    return requests.patch("/client/delete/many", body);
  },
};

export default ClientServices;
