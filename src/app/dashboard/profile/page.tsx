"use client";

import React from "react";
import styles from "../../../components/ui/style/ProfilePage.module.scss";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { useForm } from "react-hook-form";
import { ProfileInput, profileSchema } from "@/lib/validators/profileValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import { profileFields } from "@/lib/dashboard/profile/fields/formFields";

export default function ProfilePage() {
  // ✅ Initialize the form with validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {},
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: ProfileInput) => {
    try {
      console.log("Profile Data Submitted:", data);
      // You can call API here (e.g., await axios.post("/api/profile", data))
      reset(); // reset form after successful submission
    } catch (error) {
      console.error("Profile Update Error:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.profileContainer}>
        <h2 className={styles.title}>Developer Profile</h2>

        <div className={styles.profileContent}>
          {/* Profile Avatar */}
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <span>C</span>
              <button className={styles.editBtn}>✏️</button>
            </div>
          </div>

          {/* Profile Form */}
          <div className={styles.formSection}>
            <DynamicForm
              fields={profileFields}
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
            {isSubmitting ? "Updating..." : "Update →"}
          </button>

          <button className={styles.logoutBtn}>Logout ⏻</button>
          <button className={styles.deleteBtn}>Delete Account</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
