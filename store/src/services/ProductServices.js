import requests from "./httpServices";

const ProductServices = {
  getShowingProducts: async () => {
    return requests.get("/products/show");
  },
  getShowingStoreProducts: async ({
    category = "",
    title = "",
    slug = "",
    query = "",
    brand = "",
    page = 1,
  }) => {
    return requests.get(
      `/products/store?query=${query}&category=${category}&title=${title}&slug=${slug}&page=${page}&brand=${brand}`
    );
  },
  getProductSitemap: async () => {
    return requests.get("/products/sitemap");
  },
  getDiscountedProducts: async () => {
    return requests.get("/products/discount");
  },
  getShowingStoreAllProducts: async () => {
    return requests.get("/products/allProduct");
  },
  getProductBySlug: async (slug) => {
    return requests.get(`/products/${slug}`);
  },
  getShowingsBrands: async (slug) => {
    return requests.get("/brand/show");
  },
  productSuggest: async (data) => {
    return requests.post("/products/suggest/product", data);
  },
};

export default ProductServices;
