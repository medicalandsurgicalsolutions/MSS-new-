import requests from "./httpServices";

const AwardServices = {
  getAllAwards: async () => {
    return requests.get("/award");
  },
};

export default AwardServices;
