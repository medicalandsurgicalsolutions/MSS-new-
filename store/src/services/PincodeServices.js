import requests from "./httpServices";

const PinncodeService = {
  getOnePin: async (id) => {
    return requests.get(`/pincode/${id}`);
  },
};

export default PinncodeService;
