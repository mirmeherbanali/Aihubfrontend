import { baseApi } from "../api/baseApi";
import { LoginInput,RegisterInput } from "@/lib/validators/userValidator";
import { AuthResponse } from "../../types/form.types";
import { withToast } from "@/store/middleware/toastMiddleware";
import {User,UserProfile} from "../../types/user.types"

// Inject auth endpoints into baseApi
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginInput>({
      query: (body) => ({ url: "api/auth/login", method: "POST", body }),
      ...withToast<AuthResponse>("login", (res) => res.result?.message),
    }),
    register: builder.mutation<AuthResponse, RegisterInput>({
      query: (body) => {
        const isAdminUser = body?.userType === "AdminUser";
        return {
          url: isAdminUser
            ? "api/adminUser/addAdminUser"
            : "api/auth/register",
          method: "POST",
          body,
        };
      },
      ...withToast<AuthResponse>("register", (res) => res.result?.message),
    }),
    getProfile: builder.query<UserProfile, { token: string; userId: string }>({
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
      keepUnusedDataFor: 300,
    }),
    // 🔹 ✅ Get All Users
       getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "api/user/getAllUsers",
        method: "POST",
        body: {}, // You can remove this if the API doesn't need it
      }),
    }),
   updateProfile: builder.mutation<AuthResponse, Partial<User> & { id: string | null }>({
  query: (body) => ({
    url: "api/user/updateUser",
    method: "PUT",
    body,
  }),
  ...withToast<AuthResponse>("updateProfile", (res) => res.result?.message),
}),

deleteProfile: builder.mutation<AuthResponse, { id: string }>({
  query: (body) => ({
    url: "api/user/deleteUser",
    method: "PUT",
    body,
  }),
  ...withToast<AuthResponse>("deleteProfile", (res) => res.result?.message),
}),
  }),
  overrideExisting: false,
});

// Export typed hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useGetAllUsersQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = authApi;
