import { baseApi } from "../api/baseApi";
import { withToast } from "@/store/middleware/toastMiddleware";
import { AuthResponse } from "@/types/form.types";


export const toolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTool: builder.mutation<AuthResponse, FormData>({
      query: (body) => ({
        url: "api/tool/create",
        method: "POST",
        body,
      }),
      ...withToast<AuthResponse>(
        "createTool",
        (res) => res.result?.message || "Tool created successfully"
      )
    }),

    getAllTools: builder.query<AuthResponse, { userId: string } | void>({
      query: (body) => ({
        url: "api/tool/getAllTools",
        method: "POST", // ✅ POST because userId is sent in body
        body:body ?? {},           // ✅ include userId inside body
      })
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
