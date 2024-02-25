import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.BASE_URL;

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

export default axiosInstance;
