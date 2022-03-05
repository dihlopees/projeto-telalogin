import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  timeout: 60000,
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  console.log(config);
  return config;
});

export default api;
