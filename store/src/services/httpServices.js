import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Optional helper to set token globally
export const setToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

const responseBody = (response) => response.data;

const requests = {
  get: (url, body = {}, config = {}) =>
    instance.get(url, { params: body, ...config }).then(responseBody),

  post: (url, body = {}, config = {}) =>
    instance.post(url, body, config).then(responseBody),

  put: (url, body = {}, config = {}) =>
    instance.put(url, body, config).then(responseBody),

  delete: (url, config = {}) =>
    instance.delete(url, config).then(responseBody),
};

export default requests;
