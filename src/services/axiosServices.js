import axios from "axios";
import { API_BASE_URL as BASE_URL } from "../constants/urls";

// Add a request interceptor
const axiosServices = axios.create({ BASE_URL });

const middleWares = {
  json: {
    request: async (config) => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      if (!config.url.startsWith("http") && !config.url.includes(BASE_URL)) {
        config.url = BASE_URL + config.url;
      }
      return config;
    },
    response: (next) => {
      return Promise.resolve(next.data);
    },
  },
  formData: {
    request: async (config) => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      config.headers["Content-Type"] = "multipart/form-data";

      if (!config.url.startsWith("http") && !config.url.includes(BASE_URL)) {
        config.url = BASE_URL + config.url;
      }

      return config;
    },
    response: (next) => {
      return Promise.resolve(next);
    },
  },
};

const setMiddleWares = (service, type) => {
  // Request call
  service.interceptors.request.use(middleWares[type].request, (error) => {
    return Promise.reject(error);
  });

  // Response call
  service.interceptors.response.use(middleWares[type].response, (error) => {
    if (error?.response?.status === 401) {
      // Add a modal pop, inform user session is expired
      localStorage.clear();
      window.location.href = "/";
      // window.location.href = `/?redirect_to=${window.encodeURIComponent(window.location.href)}`;
    }
    // You can handle error here and trigger warning message without get in the code inside
    return Promise.reject(error);
  });
};

const _getAxiosService = (contentType = "json") => {
  // console.log(contentType);
  setMiddleWares(axiosServices, contentType);
  return axiosServices;
};

_getAxiosService();

export default axiosServices;

export const useAxiosService = _getAxiosService;
