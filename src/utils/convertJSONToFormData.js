export function convertToFormData(body = {}) {
  const bodyFormData = new FormData();
  if (Object.keys(body).length > 0) {
    // console.log({ body });
    Object.keys(body).forEach((key) => {
      bodyFormData.append(key, body[key]);
    });
  }
  return bodyFormData;
}