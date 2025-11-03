"use client";

import DynamicForm from "@/components/ui/DynamicForm";
import { loginFields, registerFields } from "@/lib/auth/fields/formFields";
import {
  createLoginHandler,
  createRegisterHandler
} from "@/lib/auth/handler/formHandlers";
import { useLoginMutation, useRegisterMutation } from "@/features/auth/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginInput,
  loginSchema,
  RegisterInput,
  registerSchema
} from "@/lib/validators/userValidator";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const { isLogin, setIsLogin } = useAuthToggle();

  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();
  const { control: loginControl, handleSubmit: loginSubmit } =
    useForm<LoginInput>({
      // resolver: zodResolver(loginSchema),
      mode: "onBlur"
    });
  const onLoginSubmit = createLoginHandler(loginUser, router);

  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation();
  const {
    control: registerControl,
    handleSubmit: registerSubmit,
    reset
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur"
  });
  const onRegisterSubmit = createRegisterHandler(
    registerUser,
    reset,
    setIsLogin
  );

  return isLogin ? (
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
  );
}
