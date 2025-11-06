"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../components/ui/style/ProfilePage.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} from "@/features/auth/authApi";
import {
  getToken,
  getUserId,
  getUserType,
  clearAuthData,
} from "@/utils/authStorage";
import { generateProfileFields } from "@/lib/dashboard/profile/fields/formFields";
import { generateZodSchema } from "@/lib/validators/profileValidator";
import DynamicForm from "@/components/ui/DynamicForm";

const flattenObject = (obj: any, prefix = ""): Record<string, any> =>
  Object.keys(obj || {}).reduce((acc, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null)
      Object.assign(acc, flattenObject(value, newKey));
    else acc[newKey] = value;
    return acc;
  }, {} as Record<string, any>);

export default function ProfilePage() {
  const token = getToken();
  const userId = getUserId();
  const userType = getUserType();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [updateProfile] = useUpdateProfileMutation();
  const [deleteProfile] = useDeleteProfileMutation();

  const {
    data: profile,
    refetch,
    isFetching,
  } = useGetProfileQuery(token && userId ? { token, userId } : skipToken);

  const fields = generateProfileFields(userType ?? "");
  const schema = generateZodSchema(fields);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {},
  });

  // ✅ Populate form with profile data
  useEffect(() => {
    if (profile?.result?.list?.user) {
      reset(flattenObject(profile.result.list.user));
    }
  }, [profile, reset]);

  // ✅ Update handler
  const onSubmit = async (data: any) => {
    try {
      const visibleFields = fields.map((f) => f.name);
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key]) => visibleFields.includes(key))
      );

      const body = { ...filteredData, id: userId };
      await updateProfile(body).unwrap();

      await refetch();
      setIsEditing(false); // 🔒 Disable fields again after update
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // ✅ Delete handler
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;
    try {
      await deleteProfile({ id: userId ?? "" }).unwrap();
      clearAuthData();
      router.push("/auth/login");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>{userType} Profile</h2>

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <span>{profile?.result?.list?.user?.firstName?.[0] ?? "U"}</span>
            <button
              className={styles.editBtn}
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              ✏️
            </button>
          </div>
        </div>

        <div className={styles.formSection}>
          {isFetching ? (
            <p>Loading profile...</p>
          ) : (
            <DynamicForm
              fields={fields.map((f) => ({
                ...f,
                disabled: !isEditing, // ✅ disable fields until edit clicked
              }))}
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        {isEditing && (
          <button
            className={styles.updateBtn}
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update →"}
          </button>
        )}

        <button className={styles.deleteBtn}  onClick={() => setShowDeletePopup(true)} >
          Delete Account
        </button>
      </div>
      {/* Popup Confirmation */}
      {showDeletePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this account?</p>
            <div className={styles.popupButtons}>
              <button
                className={styles.confirmBtn}
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
