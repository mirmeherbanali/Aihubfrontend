import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserInput } from "../../lib/validators/userValidator";
import { ENV } from "../../env";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.API_URL,
    credentials: "include", // cookie-based auth
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ message: string }, UserInput>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    register: builder.mutation<{ message: string }, UserInput>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    refresh: builder.query<{ accessToken: string }, void>({
      query: () => "/auth/refresh",
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),
    getProfile: builder.query<any, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshQuery,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;
