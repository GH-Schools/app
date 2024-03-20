export const saveToStorage = (payload, storageType = "session") => {
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

export const fetchFromStorage = (key, storageType = "session") => {
  switch (storageType) {
    case "local":
      return localStorage.getItem(key);

    case "session":
    default:
      return sessionStorage.getItem(key);
  }
};

export const clearStorage = (key) => {
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
  const a = JSON.parse(localStorage.getItem("user_profile") || null);
  console.log(a)
  return a;
};

export const setAuthUser = (profile) =>
  saveToStorage({ user_profile: JSON.stringify(profile) }, "local");

export const getToken = () => localStorage.getItem("access_token");

export const setToken = (token) =>
  saveToStorage({ access_token: token }, "local");
