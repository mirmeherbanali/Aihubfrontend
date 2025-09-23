"use client";

import { useLoginMutation } from "@/features/auth/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserInput } from "@/lib/validators/userValidator";
import DynamicForm from "@/components/ui/DynamicForm";
import { loginFields } from "@/lib/auth/fields/formFields";
import { createLoginHandler } from "@/lib/auth/handler/formHandlers";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [loginUser, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
  });

  const onSubmit = createLoginHandler(loginUser, router);

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>
          Login to Aidirectory
        </h2>
        <DynamicForm
          fields={loginFields}
          register={register}
          handleSubmit={handleSubmit}
          formState={formState}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}