import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function createQuery(
  queryParams: { [key: string]: string | number | null } = {}
) {
  let queryString = "";

  if (Object.keys(queryParams).length > 0) {
    queryString = "?";

    Object.keys(queryParams).forEach((key, index) => {
      queryString +=
        index === 0
          ? `${key}=${queryParams[key]}`
          : `&${key}=${queryParams[key]}`;
    });
  }
  return queryString;
}

export function usePageQuery() {
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search])
  // console.log(search)
  return searchParams;
}

export const formatAsMoney = (amount: number | string) => {
  return Number(amount).toLocaleString("en-us", {
    compactDisplay: "long",
    currency: "usd",
  });
};

export const mergeClassNames = (...classNames: (string | string[])[]) => {
  const finalResult = classNames.reduce<string[]>(
    (combined: string[], nextClass: string | string[]) => {
      const uniqueClasses: string[] = [];
      let a: string[];

      if (typeof nextClass === "string") {
        nextClass = nextClass.split(/\s+/gi);
      }

      a = combined;

      nextClass.forEach((stringClass: string) => {
        if (!a.includes(stringClass)) {
          uniqueClasses.push(stringClass);
        }
      });

      return a.concat(uniqueClasses);
    },
    [] as string[]
  );
  return finalResult.join(" ");
};

export const getInitials = (phrase: string) => {
  return phrase.split(/\s+/gi).map((word) =>
    word
      .toUpperCase()
      .replace(/[^A-Z]/gi, "")
      .charAt(0)
  );
};

export const generateIdFromName = (name: string) => {
  return name
    ?.trim()
    ?.toLowerCase()
    ?.replace(/[^0-9a-z]/gi, "-");
};

export const generateRandomColor = () => {
  const MAX = 205;
  const MIN = 10;
  const redValue = Math.floor(Math.random() * MAX) + MIN; // 10 - 205
  const greenValue = Math.floor(Math.random() * MAX) + MIN; // 10 - 205
  const blueValue = Math.floor(Math.random() * MAX) + MIN; // 10 - 205

  return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
};

export const sanitizePayload = (payload: { [x: string]: any }) => {
  const sanitizedPayload: { [x: string]: any } = {};

  Object.entries(payload).forEach(([key, value]) => {
    if (!!value || typeof value === "boolean") {
      sanitizedPayload[key] = value;
    }
  });
  return sanitizedPayload;
};

// Function to get the value at a given path
export function getValueAtPath(obj: Object, path: string) {
  const pathArray = path.split(/[.[\]]/).filter(Boolean);
  return pathArray.reduce((acc: any, key) => {
    if (acc && acc[key] !== undefined) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

