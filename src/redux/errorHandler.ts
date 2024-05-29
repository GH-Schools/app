import { notify } from "../utils/toastNotification";

export const errorHandler = (
  error: any,
  customMessage = "An error occured",
  useCustomMessage = false
) => {
  console.log(error);
  if (error?.response?.data?.errors) {
    let {
      response: {
        data: { errors },
      },
    } = error;

    const arrayOfErrors: (string[] | { errors: []; row: number })[] =
      Object.values(errors);

    let stringErrors: string[] = [];
    console.log(arrayOfErrors);

    if (arrayOfErrors[0]) {
      const [firstItemInErrorArray] = arrayOfErrors;

      if (Array.isArray(firstItemInErrorArray)) {
        stringErrors = (arrayOfErrors as string[][]).flat();
      } else if (typeof firstItemInErrorArray === "object") {
        stringErrors = firstItemInErrorArray?.errors
          ?.flat()
          .map(
            (errMsg: string) => `Row ${firstItemInErrorArray?.row}: ${errMsg}`
          );
      }
    }

    stringErrors.forEach((errorMsg) => {
      notify(errorMsg, { type: "error" });
    });
  } else {
    const message = useCustomMessage
      ? customMessage
      : error.response?.data?.message?.msg ??
        error.response?.data?.message ??
        error.message ??
        customMessage;
    notify(message, { type: "error" });
  }
};
