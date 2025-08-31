import requests from "./httpServices";

const DepartmentServices = {
  getCategoriesFromDepartments: async () => {
    return requests.get("/category/department/show");
  },
  getShowingDepartments: async () => {
    return requests.get("/department/show");
  },
};

export default DepartmentServices;
