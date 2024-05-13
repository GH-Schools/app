import { GenericObject } from "../interfaces";

export const saveToStorage = (payload: GenericObject, storageType = "session") => {
  Object.entries(payload).forEach(([key, value]) => {
    switch (storageType) {
      case "local":
        localStorage.setItem(key, value);
        break;

      case "session":
      default:
        sessionStorage.setItem(key, value);
        break;
    }
  });
};

export const fetchFromStorage = (key: string, storageType = "session") => {
  switch (storageType) {
    case "local":
      return localStorage.getItem(key);

    case "session":
    default:
      return sessionStorage.getItem(key);
  }
};

export const clearStorage = (key: string) => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
  if (key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  } else {
    localStorage.clear();
    sessionStorage.clear();
  }
};

export const getAuthUser = () => {
  const a = JSON.parse(localStorage.getItem("user_profile") as string);
  console.log(a)
  return a;
};

export const setAuthUser = (profile: GenericObject) =>
  saveToStorage({ user_profile: JSON.stringify(profile) }, "local");

export const getToken = () => localStorage.getItem("access_token");

export const setToken = (token: string) =>
  saveToStorage({ access_token: token }, "local");
