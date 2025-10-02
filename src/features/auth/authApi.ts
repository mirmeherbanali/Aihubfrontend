import { baseApi } from "../api/baseApi";
import { LoginInput,RegisterInput } from "@/lib/validators/userValidator";
import { AuthResponse,UserProfile } from "../../types/form.types";


// Inject auth endpoints into baseApi
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginInput>({
      query: (body) => ({ url: "api/auth/login", method: "POST", body }),
    }),
    register: builder.mutation<AuthResponse, RegisterInput>({
      query: (body) => ({ url: "api/auth/register", method: "POST", body }),
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => "/auth/me",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (body) => ({ url: "/auth/me", method: "PUT", body }),
      invalidatesTags: ["Profile"],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
});

// Export typed hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutMutation,
} = authApi;
