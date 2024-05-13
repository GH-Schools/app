import { GenericObject } from "../interfaces";

export function createQuery(queryParams: GenericObject = {}) {
  let queryString = "";
  if (Object.keys(queryParams).length > 0) {
    queryString = "?";
    Object.keys(queryParams).forEach((key, index) => {
      if (index === 0) {
        queryString += `${key}=${queryParams[key]}`;
      } else {
        queryString += `&${key}=${queryParams[key]}`;
      }
    });
  }
  return queryString;
}

export function getQuery(queryString = "") {
  let queryParams: GenericObject = {};
  queryString = queryString.replace('?', '');

  queryString.split('&').forEach((keyValuePair) => {
    const [key, value] = keyValuePair.split('=');
    queryParams[key] = window.decodeURIComponent(value);
  });

  return queryParams;
}