import requests from "./httpService";

const BlogServices = {
  getAllBlogs: async () => {
    return requests.get("/blog");
  },

  getBlogByIds: async (id) => {
    return requests.get(`/blog/new/${id}`);
  },

  addBlog: async (body) => {
    return requests.post("/blog/add", body);
  },

  updateBlog: async (id, body) => {
    return requests.put(`/blog/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/blog/status/${id}`, body);
  },

  deleteBlog: async (id, body) => {
    return requests.delete(`/blog/${id}`, body);
  },

  deleteManyBlog: async (body) => {
    return requests.patch("/blog/delete/many", body);
  },
};

export default BlogServices;
