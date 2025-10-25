"use client";

import React, { useEffect } from "react";
import styles from "../../../components/ui/style/ProfilePage.module.scss";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { useForm } from "react-hook-form";
import { generateProfileFields } from "@/lib/dashboard/profile/fields/formFields";
import { generateZodSchema } from "@/lib/validators/profileValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import { getToken, getUserId, getUserType } from "@/utils/authStorage";
import { useGetProfileQuery } from "@/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";

// ✅ helper: flatten nested objects into a single-level object
// ✅ Flatten nested objects
const flattenObject = (obj: any, prefix = ""): Record<string, any> =>
  Object.keys(obj || {}).reduce((acc, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null) Object.assign(acc, flattenObject(value, newKey));
    else acc[newKey] = value;
    return acc;
  }, {} as Record<string, any>);

export default function ProfilePage() {
  const token = getToken();
  const userId = getUserId();
  const userType = getUserType();

  const fields = generateProfileFields(userType ?? "");
  const schema = generateZodSchema(fields);

  const { data: profile } = useGetProfileQuery(token && userId ? { token, userId } : skipToken);

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {},
  });

  // ✅ Populate form dynamically
  useEffect(() => {
    if (profile?.result?.list?.user) {
      reset(flattenObject(profile.result.list.user));
    }
  }, [profile, reset]);

  // ✅ Submit only visible fields
  const onSubmit = (data: any) => {
    const visibleFieldNames = fields.map(f => f.name);
    const filteredData = Object.keys(data)
      .filter(key => visibleFieldNames.includes(key))
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {} as Record<string, any>);

    console.log("Submitting filtered data:", filteredData);

    // Call your API here
    // await updateProfileAPI(filteredData);
  };


  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>{userType} Profile</h2>

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <span>{profile?.result?.list?.user?.firstName?.[0] ?? "U"}</span>
            <button className={styles.editBtn}>✏️</button>
          </div>
        </div>

        <div className={styles.formSection}>
          <DynamicForm
            fields={fields}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </div>
      </div>

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
  );
}
