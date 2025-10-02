"use client";

import { SubmitHandler } from "react-hook-form";
import { LoginInput,RegisterInput } from "@/lib/validators/userValidator";
import {
  showToastifySuccess,
  showToastifyError,
} from "../../../components/ui/tostify/Toastifyresponse";
// Login handler
import ShowTostifyMessageAndReset from "../../../components/ui/tostify/showTostifyMessageAndReset";
const showTostifyMessageAndReset = ShowTostifyMessageAndReset();
export const createLoginHandler = (
  loginUser: (data: LoginInput ) => Promise<any>,
  router: any

): SubmitHandler<LoginInput> => {
  return async (data) => {
    try {
      console.log(data);
      
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
  registerUser: (data: RegisterInput ) => Promise<any>,
  router: any,
): SubmitHandler<RegisterInput> => {
  return async (data) => {
    try {
      const { confirmPassword, ...apiData } = data;
      console.log("checkdata",apiData);
      
      const res = await registerUser(apiData);

      console.log("Registration success:", res);
      router.push("/auth/login");
    } catch (err: any) {
      console.error("Registration failed:", err.data?.message || err.message || err);
    }
  };
};
