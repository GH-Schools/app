import { notify } from "./toastNotification";

export const errorHandler = (
  error,
  customMessage = "An error occured",
  useCustomMessage = false
) => {
  if (error?.response?.data?.errors) {
    let {
      response: {
        data: { errors },
      },
    } = error;

    let arrayOfErrors = Object.values(errors);
    console.log(arrayOfErrors);

    if (arrayOfErrors[0] && Array.isArray(arrayOfErrors[0])) {
      arrayOfErrors = arrayOfErrors.flat();
    } else if (arrayOfErrors[0] && typeof arrayOfErrors[0] === "object") {
      arrayOfErrors = arrayOfErrors[0]?.errors
        ?.flat()
        .map((errMsg) => `Row ${arrayOfErrors[0].row}: ${errMsg}`);
    }

    arrayOfErrors.forEach((errorMsg) => {
      notify(errorMsg, { type: "error" });
    });
  } else {
    const message = useCustomMessage
      ? customMessage
      : error.response?.data?.message || error.message || customMessage;
    notify(message, { type: "error" });
  }
};
