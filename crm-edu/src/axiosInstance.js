import axios from "axios";
import { BASE_URL } from "./Utils/constant";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("crmtoken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("crmtoken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
