import { AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { clearStorage, getToken } from "../utils/storage";


export type MiddleWares = {
  [key: string]: {
    request: (BASE_URL: string) => (config: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>,
    response: (response: AxiosResponse) => Promise<AxiosResponse>
  }
}

export const middleWares: MiddleWares = {
  json: {
    request: (BASE_URL) => async (config): Promise<InternalAxiosRequestConfig<any>> => {
      const accessToken = getToken();
      // config.headers = !config.headers ? {} : config.headers;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      if (!config?.url?.startsWith("http") || !config?.url?.includes(BASE_URL)) {
        config.url = BASE_URL + config.url;
      }
      return config;
    },
    response: (next: AxiosResponse) => {
      return Promise.resolve(next.data);
    },
  },
  formData: {
    request: (BASE_URL) => async (config) => {
      const accessToken = localStorage.getItem("access_token");
      // config.headers = !config.headers ? {} : config.headers;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      config.headers["Content-Type"] = "multipart/form-data";

      if (!config?.url?.startsWith("http") && !config?.url?.includes(BASE_URL)) {
        config.url = BASE_URL + config.url;
      }

      return config;
    },
    response: (next: AxiosResponse) => {
      return Promise.resolve(next);
    },
  },
};

export const setMiddleWares = (service: AxiosInstance, type: string, BASE_URL: string) => {
  // Request call
  const requestInterceptorMiddleware = middleWares[type].request(BASE_URL);
  service.interceptors.request.use(requestInterceptorMiddleware, (error) => {
    return Promise.reject(error);
  });

  // Response call
  const responseInterceptorMiddleware = middleWares[type].response;
  service.interceptors.response.use(responseInterceptorMiddleware, (error) => {
    if (error?.response?.status === 401) {
      // Add a modal pop, inform user session is expired
      clearStorage();
      window.location.replace("/");
      // window.location.href = `/?redirect_to=${window.encodeURIComponent(window.location.href)}`;
    }
    // You can handle error here and trigger warning message without get in the code inside
    return Promise.reject(error);
  });
};