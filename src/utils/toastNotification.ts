import { toast } from "react-toastify";
const defaultOptions = {
  type: "info",
};

export const notify = (message: any, options = defaultOptions) => {
  const { type, ...rest } = options;

  switch (type) {
    case "success":
      return toast.success(message, rest);

    case "info":
      return toast.info(message, rest);

    case "error":
      return toast.error(message, rest);

    case "warn":
      return toast.warn(message, rest);

    default:
      return toast(message, rest);
  }
};
