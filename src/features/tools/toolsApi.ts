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
    updateTool: builder.mutation<AuthResponse, FormData>({
      query: (body) => ({
        url: "api/tool/updateTool",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>(
        "updateTool",
        (res) => res.result?.message || "Tool updated successfully"
      )
    }),
    deleteTool: builder.mutation<AuthResponse, { id: string; adminId: string }>({
      query: (body) => ({
        url: "api/tool/deleteTool",
        method: "PUT",
        body,
      }),
      ...withToast<AuthResponse>(
        "deleteTool",
        (res) => res.result?.message || "Tool delete successfully"
      )
    }),
    
    //   use PUT 
  }),
  overrideExisting: false,
});

export const { useCreateToolMutation, useGetAllToolsQuery, useGetToolDetailsByIdMutation ,
 useUpdateToolMutation ,useDeleteToolMutation             // ✅ Missing in your code
} = toolsApi;
