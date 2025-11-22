import { baseApi } from "../../api/baseApi";
import { AddCategoryInput } from "@/lib/validators/addCatygoryValidator";
import { AuthResponse } from "./../../../types/form.types";
import { withToast } from "@/store/middleware/toastMiddleware";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<AuthResponse, AddCategoryInput>({
      query: (body) => ({
        url: "api/category/createCategory",
        method: "POST",
        body,
      }),
      ...withToast<AuthResponse>("createCategory", (res) => res.result?.message)
    }),
    getAllCategories: builder.query<AuthResponse, void>({
      query: () => ({
        url: "api/category/getAllCategories",
        method: "POST",
      }),
      keepUnusedDataFor: 300,
      
    }),
    getCategoryById: builder.query<AuthResponse, { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: "api/category/getCategoryById",
        method: "POST",
        body: { categoryId },
      }),
      
    }),
    updateCategory: builder.mutation<AuthResponse, AddCategoryInput & { id: string }>({
      query: ({ id, ...body }) => ({
        url: "api/category/updateCategory",
        method: "PUT",
        body: { id, ...body },
      }),
      ...withToast<AuthResponse>("updateCategory", (res) => res.result?.message),
    }),
    deleteCategory: builder.mutation<AuthResponse, { id: string; adminId: string }>({
      query: (body) => ({
        url: "api/category/deleteCategory",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>("deleteCategory", (res) => res.result?.message),
    }),
  }),
  overrideExisting: false,
});

// Export typed hooks
export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
