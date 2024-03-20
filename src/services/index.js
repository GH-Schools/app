import { clearStorage, getToken } from "../utils/storage";

// import { BASE_URL } from "../configs/api";

// export type MiddleWares = {
//   [key: string]: {
//     request: (BASE_URL: string) => (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>,
//     response: (response: AxiosResponse) => Promise<AxiosResponse>
//   }
// }

// function getToken() {
//   return localStorage.getItem("access_token");
// }

// function clearStorage() {
//   localStorage.clear();
// }

export const middleWares = {
  json: {
    request: (BASE_URL) => async (config) => {
      const accessToken = getToken();
      config.headers = !config.headers ? {} : config.headers;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      if (
        !config?.url?.startsWith("http") ||
        !config?.url?.includes(BASE_URL)
      ) {
        config.url = BASE_URL + config.url;
      }
      return config;
    },
    response: (next) => {
      return Promise.resolve(next.data);
    },
  },
  formData: {
    request: (BASE_URL) => async (config) => {
      const accessToken = localStorage.getItem("access_token");
      config.headers = !config.headers ? {} : config.headers;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      config.headers["Content-Type"] = "multipart/form-data";

      if (
        !config?.url?.startsWith("http") &&
        !config?.url?.includes(BASE_URL)
      ) {
        config.url = BASE_URL + config.url;
      }

      return config;
    },
    response: (next) => {
      return Promise.resolve(next);
    },
  },
};

export const setMiddleWares = (service, type, BASE_URL) => {
  // Request call
  service.interceptors.request.use(
    middleWares[type].request(BASE_URL),
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response call
  service.interceptors.response.use(middleWares[type].response, (error) => {
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
