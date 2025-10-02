import { showToastifyError, showToastifySuccess } from "@/utils/toast";

export const withToast = (endpoint: any, successMessage?: string) => {
  return {
    async onQueryStarted(arg: any, { queryFulfilled }: any) {
      try {
        const { data } = await queryFulfilled;
        if (successMessage) {
          showToastifySuccess(successMessage);
        }
        return data;
      } catch (err: any) {
        const msg = err?.error?.data?.message || err?.data?.message || "Something went wrong!";
        showToastifyError(msg);
        throw err;
      }
    },
  };
};