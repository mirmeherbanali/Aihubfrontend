"use client";

import React from "react";
import styles from "../../../ui/style/AddUser.module.scss";
import { useForm } from "react-hook-form";
import { AddUserInput, addUserSchema } from "@/lib/validators/addUserValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import { addUserFields } from "@/lib/dashboard/user/fields/formFields";

export default function AddUser() {
  // ✅ Initialize the form with validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<AddUserInput>({
    resolver: zodResolver(addUserSchema),
    mode: "onBlur",
    defaultValues: {}
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: AddUserInput) => {
    try {
      console.log("Profile Data Submitted:", data);
      // You can call API here (e.g., await axios.post("/api/profile", data))
      reset(); // reset form after successful submission
    } catch (error) {
      console.error("Profile Update Error:", error);
    }
  };

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
            fields={addUserFields}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            // buttonText={isSubmitting ? "Updating..." : "Update"}
            // notshow={true} // ✅ hide default submit button, you already have below
          />
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button
          className={styles.updateBtn}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Createe"}
        </button>
      </div>
    </div>
  );
}
