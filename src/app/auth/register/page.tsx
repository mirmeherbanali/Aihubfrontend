"use client";

import { useRegisterMutation } from "@/features/auth/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserInput } from "@/lib/validators/userValidator";
import DynamicForm from "@/components/ui/DynamicForm";
import { registerFields } from "@/lib/auth/fields/formFields";
import { createRegisterHandler } from "@/lib/auth/handler/formHandlers";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
  });

  const onSubmit = createRegisterHandler(registerUser, router);

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>
          Join Aidirectory
        </h2>
        <DynamicForm
          fields={registerFields}
          register={register}
          handleSubmit={handleSubmit}
          formState={formState}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}