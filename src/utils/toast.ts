// utils/toast.ts
import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const showToastifySuccess = (message: string) => {
  toast.success(message, defaultOptions);
};

export const showToastifyError = (message: string) => {
  toast.error(message, defaultOptions);
};

export const showToastifyInfo = (message: string) => {
  toast.info(message, defaultOptions);
};

export const showToastifyWarning = (message: string) => {
  toast.warning(message, defaultOptions);
};
