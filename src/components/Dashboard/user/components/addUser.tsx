"use client";

import React from "react";
import styles from "../../../ui/style/AddUser.module.scss";
import { useForm } from "react-hook-form";
import {
  createRegisterHandler,
} from "@/lib/auth/handler/formHandlers";
import {  useRegisterMutation } from "@/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import {
  RegisterInput,
  registerSchema,
} from "@/lib/validators/userValidator";
import { getUserId, getUserType } from "@/utils/authStorage";
import { registerFields } from "@/lib/auth/fields/formFields";

export default function AddUser() {
  const userType = getUserType();
  const userId = getUserId();
  // ✅ Initialize the form with validation
  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation();
    const { control: registerControl, handleSubmit: registerSubmit, reset } =
      useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
      });

  const onRegisterSubmit = createRegisterHandler(
    registerUser,
    reset,
    undefined,
    userType??undefined,
    userId ?? undefined // 👈 pass Admin ID
  );

  return (
    <div className={styles.profileContainer}>
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          <span>C</span>
          <button className={styles.editBtn}>✏️</button>
        </div>
      </div>

      <div className={styles.profileContent}>
        {/* Profile Avatar */}

        {/* Profile Form */}
        <div className={styles.formSection}>
          <DynamicForm
      fields={registerFields(userType ?? undefined)}
      control={registerControl}
      handleSubmit={registerSubmit}
      onSubmit={onRegisterSubmit}
      isLoading={registerLoading}
    />
        </div>
      </div>

      {/* Buttons */}
      {/* <div className={styles.buttonGroup}>
        <button
          className={styles.updateBtn}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Createe"}
        </button>
      </div> */}
    </div>
  );
}
