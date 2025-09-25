"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Divider } from "antd";
import { GoogleOutlined, GithubOutlined, FacebookOutlined } from "@ant-design/icons";
import DynamicForm from "@/components/ui/DynamicForm";
import { loginFields, registerFields } from "@/lib/auth/fields/formFields";
import { createLoginHandler, createRegisterHandler } from "@/lib/auth/handler/formHandlers";
import { useLoginMutation, useRegisterMutation } from "@/features/auth/authApi";
import { UserInput, userSchema } from "@/lib/validators/userValidator";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register

  // Login mutation + form
  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();
  const { control: loginControl, handleSubmit: loginSubmit } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
  });
  const onLoginSubmit = createLoginHandler(loginUser, router);

  // Register mutation + form
  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation();
  const { control: registerControl, handleSubmit: registerSubmit } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
  });
  const onRegisterSubmit = createRegisterHandler(registerUser, router);

  const handleSocialLogin = (provider: "google" | "github" | "facebook") => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="container min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="card w-full max-w-md shadow-xl rounded-2xl p-6 bg-white">
        {/* Header */}
        <h2 className="text-center text-2xl font-bold mb-6">
          {isLogin ? "Login to Aidirectory" : "Join Aidirectory"}
        </h2>

        {/* Form */}
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

        {/* Social Login */}
        <Divider className="my-6">Or {isLogin ? "login" : "register"} with</Divider>
        <div className="flex justify-center items-center gap-4 mb-4">
          {["google", "github", "facebook"].map(provider => {
            const Icon = provider === "google" ? GoogleOutlined : provider === "github" ? GithubOutlined : FacebookOutlined;
            return (
              <Button
                key={provider}
                icon={<Icon />}
                shape="circle"
                size="large"
                onClick={() => handleSocialLogin(provider as "google" | "github" | "facebook")}
              />
            );
          })}
        </div>

        {/* Toggle Link */}
        <p className="text-center mt-4">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
