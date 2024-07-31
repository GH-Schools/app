import { useMemo } from "react";
import { useLocation } from "react-router-dom";
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
  queryString = queryString.replace("?", "");

  queryString.split("&").forEach((keyValuePair) => {
    const [key, value] = keyValuePair.split("=");
    queryParams[key] = window.decodeURIComponent(value);
  });

  return queryParams;
}

export function usePageQuery() {
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  console.log(search);
  return searchParams;
}
