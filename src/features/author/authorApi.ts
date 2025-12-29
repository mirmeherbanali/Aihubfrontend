import { baseApi } from "../api/baseApi";
import { withToast } from "@/store/middleware/toastMiddleware";
import { AuthorInput } from "@/lib/validators/authorValidator";
import { AuthResponse } from "@/types/form.types";

/**
 * Helper to convert AuthorInput → FormData
 */


export const authorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Author
    createAuthor: builder.mutation<AuthResponse, AuthorInput>({
      query: (body) => ({
        url: "api/author/create",
        method: "POST",
        body,
      }),
      ...withToast<AuthResponse>(
        "createAuthor",
        (res) => res.result?.message
      ),
    }),

    // ✅ Update Author
    updateAuthor: builder.mutation<
      AuthResponse,
      AuthorInput & { id: string }
    >({
      query: (body) => ({
        url: "api/author/updateAuthor",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>(
        "updateAuthor",
        (res) => res.result?.message
      ),
    }),

    // ✅ Delete Author
    deleteAuthor: builder.mutation<AuthResponse, { id: string }>({
      query: ( body ) => ({
        url: "api/author/deleteAuthor",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>(
        "deleteAuthor",
        (res) => res.result?.message
      ),
    }),

    // ✅ Get All Authors
    getAllAuthors: builder.query<AuthResponse, void>({
      query: () => ({
        url: "api/author/getAllAuthors",
        method: "POST",
      }),
      keepUnusedDataFor: 300,
    }),

    // ✅ Get Author By ID
    getAuthorById: builder.query<AuthResponse, { authorId: string }>({
      query: ({ authorId }) => ({
        url: "api/author/getAuthorById",
        method: "POST",
        body: { authorId },
      }),
      keepUnusedDataFor: 300,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
  useGetAllAuthorsQuery,
  useGetAuthorByIdQuery,
} = authorApi;
