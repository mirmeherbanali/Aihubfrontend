import { baseApi } from "../api/baseApi";
import { withToast } from "@/store/middleware/toastMiddleware";
import { AuthResponse } from "@/types/form.types";
import { ToolsInput } from "@/lib/validators/toolsValidator";

export const toolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTool: builder.mutation<AuthResponse, ToolsInput>({
      query: (body) => ({
        url: "api/tool/create",
        method: "POST",
        body,
      }),
      ...withToast<AuthResponse>(
        "createTool",
        (res) => res.result?.message || "Tool created successfully"
      ),
      invalidatesTags: ["Tool"],
    }),

    getAllTools: builder.query<AuthResponse, { userId: string }>({
  query: ({ userId }) => {
    return {
      url: `api/tool/getAllTools?userId=${userId}`,
      method: "GET", 
    };
  },
  providesTags: ["Tool"],
}),

  getToolDetailsById: builder.mutation<AuthResponse, { id: string }>({
      query: (body) => ({
        url: "api/tool/getToolDetailsById",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateToolMutation, useGetAllToolsQuery, useGetToolDetailsByIdMutation } = toolsApi;
