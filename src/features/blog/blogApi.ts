import { BlogInput } from "@/lib/validators/blogValidator";
import { baseApi } from "../api/baseApi";
import { withToast } from "@/store/middleware/toastMiddleware";
import { AuthResponse } from "@/types/form.types";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createBlog: builder.mutation<AuthResponse, FormData>({
      query: (body) => ({
        url: "api/blog/create",
        method: "POST",
        body,
      }),
      ...withToast<AuthResponse>(
        "createBlog",
        (res) => res.result?.message
      ),
    }),
    updateBlog: builder.mutation<AuthResponse, BlogInput & { id: string }>({
      query: (body) => ({
        url: "api/blog/updateBlog",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>(
        "updateBlog",
        (res) => res.result?.message
      ),
    }),

    // ✅ Delete Blog
    deleteBlog: builder.mutation<AuthResponse, { id: string }>({
      query: (body) => ({
        url: "api/blog/deleteBlog",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>(
        "deleteBlog",
        (res) => res.result?.message
      ),
    }),

    // ✅ Get All Blogs
    getAllBlogs: builder.query<AuthResponse, void>({
      query: () => ({
        url: "api/blog/getAllBlogs",
        method: "POST",
      }),
      keepUnusedDataFor: 300,
    }),

    // ✅ Get Blog By ID
    getBlogById: builder.query<AuthResponse, { blogId: string }>({
      query: (body) => ({
        url: "api/blog/getBlogById",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
} = blogApi;
