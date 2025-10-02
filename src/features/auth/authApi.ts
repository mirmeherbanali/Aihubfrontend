import { baseApi } from "../api/baseApi";
import { LoginInput,RegisterInput } from "@/lib/validators/userValidator";
import { AuthResponse,UserProfile } from "../../types/form.types";
import { withToast } from "@/store/middleware/toastMiddleware";

// Inject auth endpoints into baseApi
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginInput>({
      query: (body) => ({ url: "api/auth/login", method: "POST", body }),
      ...withToast("login", "Login successful!"),
    }),
    register: builder.mutation<AuthResponse, RegisterInput>({
      query: (body) => ({ url: "api/auth/register", method: "POST", body }),
      ...withToast("register", "Registration successful!"),
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => "/auth/me",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (body) => ({ url: "/auth/me", method: "PUT", body }),
      ...withToast("updateProfile", "Profile updated!"),
      invalidatesTags: ["Profile"],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      ...withToast("logout", "Logged out successfully!"),
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
