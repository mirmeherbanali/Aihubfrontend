"use client";

import { SubmitHandler } from "react-hook-form";
import { LoginInput, RegisterInput } from "@/lib/validators/userValidator";
import { saveAuthData } from "@/utils/authStorage";

// Login handler
export const createLoginHandler = (
  loginUser: (data: LoginInput) => Promise<any>,
  router: any
): SubmitHandler<LoginInput> => {
  return async (data) => {
    try {

      const res = await loginUser(data);
      const response = res?.data ?? res;
      if (response?.success) {
      saveAuthData(
          response?.result?.list?.token,
          response?.result?.list?.user?._id,
          response?.result?.list?.user?.userType
        );
      router.prefetch("/dashboard");  
      router.push("/dashboard");
      }


    } catch (err: any) {
      console.error(
        "Login failed:",
        err?.data?.message || err.message || "Unknown error"
      );
    }
  };
};

// Register handler
export const createRegisterHandler = (
  registerUser: (data: RegisterInput) => Promise<any>,
  reset: () => void,
  setIsLogin?: (val: boolean) => void,
  userType?: string,
  userId?:string
): SubmitHandler<RegisterInput> => {
  return async (data) => {
    try {
      const { confirmPassword, ...rest } = data;
       // Base payload
      const apiData: any = { ...rest };

      // If AdminUser → add extra fields + remove userType
      if (userType === "Admin" && userId) {
        apiData.status = "Active";
        apiData.adminId = userId;
      }
      const res = await registerUser(apiData);
      const response = res?.data ?? res;
       if (response?.success) {
        reset();
        if (userType !== "Admin" && setIsLogin) {
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      console.error(
        "Registration failed:",
        err?.data?.message || err.message || "Unknown error"
      );
    }
  };
};
