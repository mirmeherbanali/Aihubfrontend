import { showToastifyError, showToastifySuccess } from "@/utils/toast";

type ToastMessage<T> = string | ((res: T) => string);

export const withToast = <T = any>(
  endpoint: any,
  successMessage?: ToastMessage<T>
) => {
  return {
    async onQueryStarted(arg: any, { queryFulfilled }: any) {
      try {
        const { data } = await queryFulfilled;

        // ✅ Check if API response has `success` field
        if (data?.success === false) {
          const msg = data?.result?.message || "Something went wrong!";
          showToastifyError(msg);
        } else if (data?.success === true) {
          // Use dynamic message if provided
          if (successMessage) {
            const msg =
              typeof successMessage === "function"
                ? successMessage(data)
                : successMessage;
            showToastifySuccess(msg);
          } else {
            showToastifySuccess("Operation successful!");
          }
        }

        return data;
      } catch (err: any) {
        const msg =
          err?.error?.data?.message ||
          err?.data?.message ||
          "Something went wrong!";
        showToastifyError(msg);
        throw err;
      }
    },
  };
};
