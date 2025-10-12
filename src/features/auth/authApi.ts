import { baseApi } from "../api/baseApi";
import { LoginInput,RegisterInput } from "@/lib/validators/userValidator";
import { AuthResponse,User } from "../../types/form.types";
import { withToast } from "@/store/middleware/toastMiddleware";

// Inject auth endpoints into baseApi
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginInput>({
      query: (body) => ({ url: "api/auth/login", method: "POST", body }),
      ...withToast<AuthResponse>("login", (res) => res.result?.message),
    }),
    register: builder.mutation<AuthResponse, RegisterInput>({
      query: (body) => ({ url: "api/auth/register", method: "POST", body }),
      ...withToast<AuthResponse>("register", (res) => res.result?.message),
    }),
    getProfile: builder.query<User, { token: string; userId: string }>({
      query: ({ token, userId }) => ({
        url: "api/user/getUserById",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          id: userId,
        },
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
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
