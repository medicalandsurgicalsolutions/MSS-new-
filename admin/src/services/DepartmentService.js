import requests from "./httpService";

const DepartmentService = {
  getAllDepartments: async () => {
    return requests.get("/department");
  },

  getDepartmentById: async (id) => {
    return requests.get(`/department/${id}`);
  },

  addDepartment: async (body) => {
    return requests.post("/department/add", body);
  },

  updateDepartment: async (id, body) => {
    return requests.put(`/department/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/department/status/${id}`, body);
  },

  deleteDepartment: async (id, body) => {
    return requests.delete(`/department/${id}`, body);
  },

  deleteManyDepartment: async (body) => {
    return requests.patch("/department/delete/many", body);
  },
};

export default DepartmentService;
