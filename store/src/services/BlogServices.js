import requests from "./httpServices";

const BlogServices = {
  getAllBlogs: async () => {
    return requests.get("/blog");
  },
  getBlogById: async (id) => {
    return requests.get(`/blog/${id}`);
  },
};

export default BlogServices;
