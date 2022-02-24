import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  console.log(config);
  return config;
});

export default api;
