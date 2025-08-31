import requests from "./httpService";

const RoleAndPermissionServices = {
  getAllRoles: async () => {
    return requests.get("/role");
  },

  getAllPermissions: async () => {
    return requests.get("/role/permissions");
  },

  getRoleById: async (id) => {
    return requests.get(`/role/${id}`);
  },

  addRole: async (body) => {
    return requests.post("/role/add", body);
  },

  updateRole: async (id, body) => {
    return requests.put(`/role/${id}`, body);
  },

  updateRolePermissions: async (id, body) => {
    return requests.put(`/role/permissions/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/role/status/${id}`, body);
  },

  deleteRole: async (id, body) => {
    return requests.delete(`/role/${id}`, body);
  },

  deleteManyRole: async (body) => {
    return requests.patch("/role/delete/many", body);
  },
};

export default RoleAndPermissionServices;
