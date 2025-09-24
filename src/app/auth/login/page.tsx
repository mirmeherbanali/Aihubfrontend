"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Divider } from "antd";
import { GoogleOutlined, GithubOutlined, FacebookOutlined } from "@ant-design/icons";

import { UserInput, userSchema } from "@/lib/validators/userValidator";
import DynamicForm from "@/components/ui/DynamicForm";
import { loginFields } from "@/lib/auth/fields/formFields";
import { createLoginHandler } from "@/lib/auth/handler/formHandlers";
import { useLoginMutation } from "../../../features/auth/authApi";

export default function LoginPage() {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, formState } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
  });

  const onSubmit = createLoginHandler(loginUser, router);

  const handleSocialLogin = (provider: "google" | "github" | "facebook") => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="container min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="card w-full max-w-md shadow-xl rounded-2xl p-6 bg-white">
        <h2 className="text-center text-xl font-bold mb-6">Login to Aidirectory</h2>

        <DynamicForm
          fields={loginFields}
          register={register}
          handleSubmit={handleSubmit}
          formState={formState}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />

        {/* Social Login Section */}
        <Divider className="my-6">Or login with</Divider>
        <div className="flex justify-center items-center gap-4 mb-4">
          <Button
            icon={<GoogleOutlined />}
            shape="circle"
            size="large"
            onClick={() => handleSocialLogin("google")}
          />
          <Button
            icon={<GithubOutlined />}
            shape="circle"
            size="large"
            onClick={() => handleSocialLogin("github")}
          />
          <Button
            icon={<FacebookOutlined />}
            shape="circle"
            size="large"
            onClick={() => handleSocialLogin("facebook")}
          />
        </div>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
