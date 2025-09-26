"use client";

import { SubmitHandler } from "react-hook-form";
import { UserInput } from "@/lib/validators/userValidator";

// Login handler
export const createLoginHandler = (
  loginUser: (data: UserInput ) => Promise<any>,
  router: any
): SubmitHandler<UserInput> => {
  return async (data) => {
    try {
      const res = await loginUser(data);
      console.log("Login success:", res);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err.data?.message || err.message || err);
    }
  };
};

// Register handler
export const createRegisterHandler = (
  registerUser: (data: UserInput ) => Promise<any>,
  router: any,
): SubmitHandler<UserInput> => {
  return async (data) => {
    try {
      const { confirmPassword, ...apiData } = data;
      const res = await registerUser(apiData);
      console.log("Registration success:", res);
      router.push("/auth/login");
    } catch (err: any) {
      console.error("Registration failed:", err.data?.message || err.message || err);
    }
  };
};
