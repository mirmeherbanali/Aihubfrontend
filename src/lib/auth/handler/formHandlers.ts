"use client";

import { SubmitHandler } from "react-hook-form";
import { LoginInput, RegisterInput } from "@/lib/validators/userValidator";


// Login handler
export const createLoginHandler = (
  loginUser: (data: LoginInput) => Promise<any>,
  router: any,
  reset: () => void // <-- pass reset here
): SubmitHandler<LoginInput> => {
  return async (data) => {
    try {
      console.log("Login data:", data);

      const res = await loginUser(data).unwrap(); // ✅ unwrap RTK query
      reset(); // ✅ clear form
      console.log("Login success:", res);

      router.push("/dashboard");
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
      reset(); // ✅ clear form
      console.log("Registration success:", res);
      // ✅ After registration, switch to login screen
      setIsLogin(true);

    } catch (err: any) {
      console.error(
        "Registration failed:",
        err?.data?.message || err.message || "Unknown error"
      );
    }
  };
};
