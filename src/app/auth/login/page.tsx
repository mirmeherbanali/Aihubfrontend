"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/ui/DynamicForm";

import { loginFields, registerFields } from "@/lib/auth/fields/formFields";
import {
  createLoginHandler,
  createRegisterHandler
} from "@/lib/auth/handler/formHandlers";
import { useLoginMutation, useRegisterMutation } from "@/features/auth/authApi";
import { LoginInput,loginSchema, registerSchema,RegisterInput } from "@/lib/validators/userValidator";
import styles from "../../../components/ui/style/login.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext"; // updated path

export default function AuthPage() {
  const router = useRouter();
  const { isLogin, setIsLogin } = useAuthToggle();

  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();
  const { control: loginControl, handleSubmit: loginSubmit,reset: loginReset } =
    useForm<LoginInput>({
      resolver: zodResolver(loginSchema),
      mode: "onBlur"
    });
  const onLoginSubmit = createLoginHandler(loginUser, router,loginReset);

  // ✅ Register mutation + form
  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation();
  const { control: registerControl, handleSubmit: registerSubmit,reset: registerReset } =
    useForm<RegisterInput>({
      resolver: zodResolver(registerSchema),
      mode: "onBlur"
    });
  const onRegisterSubmit = createRegisterHandler(registerUser,registerReset, setIsLogin );

  // ✅ Social login
  const handleSocialLogin = (provider: "google" | "github" | "facebook") => {
    console.log(`Login with ${provider}`);
  };

  // ✅ Define providers with order
  const socialProviders: {
    name: "google" | "facebook" | "github";
    icon: string;
  }[] = [
    { name: "google", icon: "/icons/google.svg" },
    { name: "facebook", icon: "/icons/facebook.svg" },
    { name: "github", icon: "/icons/github.svg" }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/assets/logo.jpg" alt="Logo" style={{ height: 55 }} />
        </div>
        {/* Title */}
        <h2 className={styles.title}>
          {isLogin ? "Sign in" : "Create Account"}
        </h2>
        <p className={styles.subtitle}>
          {isLogin
            ? "to continue to your account"
            : "Join us by creating an account"}
        </p>
        {/* */}
        {isLogin ? (
          <DynamicForm
            fields={loginFields}
            control={loginControl}
            handleSubmit={loginSubmit}
            onSubmit={onLoginSubmit}
            isLoading={loginLoading}
          />
        ) : (
          <DynamicForm
            fields={registerFields}
            control={registerControl}
            handleSubmit={registerSubmit}
            onSubmit={onRegisterSubmit}
            isLoading={registerLoading}
          />
        )}
        {/* Divider */}
        <div className={styles.or}>
          <span></span>
          <p>or</p>
          <span></span>
        </div>
        {/* 🔹 Updated social login buttons */}
        <div className={styles.socialsRow}>
          {socialProviders.map((provider) => (
            <button
              key={provider.name}
              type="button"
              className={styles[provider.name]} // style per provider
              onClick={() => handleSocialLogin(provider.name)}
            >
              <img src={provider.icon} alt={provider.name} />
            </button>
          ))}
        </div>
        {/* Footer toggle */}
        <p className={styles.footer}>
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button type="button" onClick={() => setIsLogin(false)}>
                Create account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => setIsLogin(true)}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
