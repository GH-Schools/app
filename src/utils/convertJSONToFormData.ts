import { GenericObject } from "../interfaces";

export function convertToFormData(body: GenericObject = {}) {
  const bodyFormData = new FormData();
  if (Object.keys(body).length > 0) {
    // console.log({ body });
    Object.keys(body).forEach((key: string) => {
      bodyFormData.append(key, body[key]);
    });
  }
  return bodyFormData;
}
