import * as Yup from "yup";

export const validations = {
  name: (paramName: string) =>
    Yup.string().max(
      50,
      paramName
        ? `${paramName} should not be more than 50 characters`
        : "Should not be more than 50 characters"
    ),
  number: (paramName: string, min = -1e20, max = 1e20) =>
    Yup.number()
      .min(
        min,
        paramName
          ? `${paramName} must be greater than ${min}`
          : `Must be greater than ${min}`
      )
      .max(
        max,
        paramName
          ? `${paramName} must be less than ${max}`
          : `Must be less than ${max}`
      ),
  email: (paramName: string) => Yup.string().email(),
  password: (paramName: string, min = 6, max = 24) =>
    Yup.string()
      .min(
        min,
        paramName
          ? `${paramName} must be ${min} or more characters`
          : "Must be 8 or more characters"
      )
      .max(max, paramName ? `${paramName} is too long` : "Too long"),
  date: (paramName: string) =>
    Yup.string().matches(
      /(\d{4}(-|\/|\\)\d{1,2}(-|\/|\\)\d{1,2})|(\d{1,2}(-|\/|\\)\d{1,2}(-|\/|\\)\d{4})/gi
    ),
  mobile: (paramName: string) => Yup.string().matches(/^[0-9)(+]+$/gi, "Invalid mobile number"),
  bvn: (paramName: string) =>
    Yup.string()
      .matches(/\d{11}/g, "Invalid BVN")
      .length(11, "BVN must be 11 digits long"),
  blank: () => Yup.string(),
};
