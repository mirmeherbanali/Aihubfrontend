import { BlogCategoryInput } from "@/lib/validators/blogCategoryValidator";
import { baseApi } from "../api/baseApi";
import { withToast } from "@/store/middleware/toastMiddleware";
import { AuthResponse } from "@/types/form.types";

export const blogCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Create Category
    createBlogCategory: builder.mutation<AuthResponse, BlogCategoryInput>({
      query: (body) => {
        console.log("📦 createBlogCategory body:", body);
         return {
          url: "api/blogCategory/create",
          method: "POST",
          body,
        };
      },
      ...withToast<AuthResponse>(
        "createBlogCategory",
        (res) => res.result?.message
      ),
    }),

    // ✅ Update Category
    updateBlogCategory: builder.mutation<
    AuthResponse, 
    BlogCategoryInput & { id: string }
    >({
      query: (body) => ({
        url: "api/blogCategory/updateBlogCategory",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>(
        "updateBlogCategory",
        (res) => res.result?.message
      ),
    }),

    // ✅ Delete Category
    deleteBlogCategory: builder.mutation<AuthResponse, { id: string }>({
      query: (body) => ({
        url: "api/blogCategory/deleteBlogCategory",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>(
        "deleteBlogCategory",
        (res) => res.result?.message
      ),
    }),

    // ✅ Get All Categories
    getAllBlogCategories: builder.query<AuthResponse, void>({
      query: () => ({
        url: "api/blogCategory/getAllBlogCategories",
        method: "POST",
      }),
      keepUnusedDataFor: 300,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  useGetAllBlogCategoriesQuery,
} = blogCategoryApi;
