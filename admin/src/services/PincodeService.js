import requests from "./httpService";

const PincodeService = {
  getAll: async (prop) => {
    // const { page, limit } = prop;
    let query = "?";
    // if (page) {
    //   query += `page=${page}`;
    // }
    // if (limit) {
    //   query += `&limit=${limit}`;
    // }
    return requests.get(`/pincode${query}`);
  },

  add: async (body) => {
    return requests.post("/pincode/add", body);
  },
  addBulk: async (body) => {
    return requests.post("/pincode/add/bulk", body);
  },
  update: async (id, body) => {
    return requests.put(`/pincode/${id}`, body);
  },

  updateStatus: async (body) => {
    return requests.patch(`/pincode/status`, body);
  },

  delete: async (id, body) => {
    return requests.delete(`/pincode/${id}`, body);
  },

  deleteMany: async (body) => {
    console.log(body);
    return requests.delete(`/pincode`, { data: body });
  },

  // deleteMany: async (body) => {
  //   return requests.patch("/pincode/delete/many", body);
  // },
};

export default PincodeService;
