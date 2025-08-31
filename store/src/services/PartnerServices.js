import requests from "./httpServices";

const PartnerServices = {
  getAllPartners: async () => {
    return requests.get("/partner");
  },
};

export default PartnerServices;
