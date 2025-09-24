import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "../../env";
import { DynamicMutationArgs, DynamicQueryArgs } from "../../types/base.types";



export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.API_URL,
    credentials: "include", // for cookie auth
  }),
  endpoints: (builder) => ({
    dynamicQuery: builder.query<any, DynamicQueryArgs>({
      query: ({ url, params }) => ({ url, method: "GET", params }),
    }),
    dynamicMutation: builder.mutation<any, DynamicMutationArgs>({
      query: ({ url, method = "POST", body }) => ({ url, method, body }),
    }),
  }),
});

export const {
  useDynamicQueryQuery,
  useDynamicMutationMutation,
} = baseApi;
