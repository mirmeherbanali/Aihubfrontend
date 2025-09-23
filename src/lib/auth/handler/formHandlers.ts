"use client";

import { UserInput } from "@/lib/validators/userValidator";
import { SubmitHandler } from "react-hook-form";

// Login handler - now returns a function that accepts router
export const createLoginHandler = (loginUser: any, router: any): SubmitHandler<UserInput> => {
  return async (data) => {
    try {
      await loginUser(data).unwrap();
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };
};

// Register handler - now returns a function that accepts router
export const createRegisterHandler = (registerUser: any, router: any): SubmitHandler<UserInput> => {
  return async (data) => {
    try {
      await registerUser(data).unwrap();
      router.push("/auth/login");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };
};