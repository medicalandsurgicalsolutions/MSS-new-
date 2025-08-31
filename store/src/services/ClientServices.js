import requests from "./httpServices";

const ClientServices = {
  getAllClients: async () => {
    return requests.get("/client");
  },
};

export default ClientServices;
