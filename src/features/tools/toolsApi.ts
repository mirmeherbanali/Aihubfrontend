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

    getAllTools: builder.query<AuthResponse, void>({
      query: () => ({
        url: "api/tool/getAllTools",
        method: "GET",
      }),
      providesTags: ["Tool"],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateToolMutation, useGetAllToolsQuery } = toolsApi;
