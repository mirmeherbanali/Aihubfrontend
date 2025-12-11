import { baseApi } from "../api/baseApi";
import { withToast } from "@/store/middleware/toastMiddleware";
import { ReviewInput } from "@/lib/validators/reviewValidator";
import { AuthResponse } from "@/types/form.types";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Add Review
    addReview: builder.mutation<
      AuthResponse,
      { toolId: string; userId: string } & ReviewInput
    >({
      query: (body) => ({
        url: "api/review/addReview",
        method: "POST",
        body,
      }),
      ...withToast<AuthResponse>("addReview", (res) => res.result?.message),
    }),

    // ✅ Update Review
    updateReview: builder.mutation<
      AuthResponse,
      { reviewId: string; userId: string } & ReviewInput
    >({
      query: (body) => ({
        url: "api/review/updateReview",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>("updateReview", (res) => res.result?.message),
    }),

    getToolReviews: builder.query<AuthResponse, { toolId: string }>({
      query: ({ toolId }) => ({
        url: "api/review/tool",
        method: "POST",
        body: { toolId },
      }),
      keepUnusedDataFor: 300,
    }),

    getAllReviews: builder.query<AuthResponse, void>({
      query: () => ({
        url: `api/review/getAllReviews`,
        method: "POST",
      }),
      keepUnusedDataFor: 300,
    }),
    // ✅ Get User Reviews
    getUserReviews: builder.query<AuthResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `api/review/user/${userId}`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useGetToolReviewsQuery,
  useGetUserReviewsQuery,
  useGetAllReviewsQuery,
} = reviewApi;
