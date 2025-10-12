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
      console.log("Login data:", data);

      const res = await loginUser(data).unwrap(); // ✅ unwrap RTK query
      if (res.success) {
      saveAuthData(
          res?.result?.list?.token,
          res?.result?.list?.user?._id,
          res?.result?.list?.user?.userType
        );
      router.push("/dashboard");
      }
      console.log("Login success:", res);

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
  setIsLogin: (val: boolean) => void
): SubmitHandler<RegisterInput> => {
  return async (data) => {
    try {
      const { confirmPassword, ...apiData } = data;
      console.log("Register data:", apiData);

      const res = await registerUser(apiData).unwrap();
       if (res.success) {
        reset();
        setIsLogin(true);
      }
      console.log("Registration response:", res);
    } catch (err: any) {
      console.error(
        "Registration failed:",
        err?.data?.message || err.message || "Unknown error"
      );
    }
  };
};
