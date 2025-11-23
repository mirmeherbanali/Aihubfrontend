"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../components/ui/style/ProfilePage.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skipToken } from "@reduxjs/toolkit/query";
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

  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

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
    if (profile) {
      reset(flattenObject(profile));
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
      // await updateProfile(body).unwrap();
      await refetch();
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // ✅ Delete account handler
  const handleDelete = async () => {
    try {
      await deleteProfile({ id: userId ?? "" }).unwrap();
      clearAuthData();
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ✅ Logout logic
  const confirmLogout = async () => {
    setLoadingLogout(true);
    setShowLogoutPopup(false);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    clearAuthData();
    window.location.href = "/auth/login"; // redirect without router
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>{userType} Profile</h2>

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <span>{profile?.firstName?.[0] ?? "U"}</span>
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
                disabled: !isEditing,
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

        <button
          className={styles.deleteBtn}
          onClick={() => setShowDeletePopup(true)}
        >
          Delete Account
        </button>

        {/* ✅ Logout button */}
        <button
          className={styles.logoutBtn}
          onClick={() => setShowLogoutPopup(true)}
        >
          Logout
        </button>
      </div>

      {/* ✅ Delete confirmation popup */}
      {showDeletePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this account?</p>
            <div className={styles.popupButtons}>
              <button className={styles.confirmBtn} onClick={handleDelete}>
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

      {/* ✅ Logout confirmation popup */}
      {showLogoutPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className={styles.popupButtons}>
              <button className={styles.confirmBtn} onClick={confirmLogout}>
                Yes, Logout
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Loading overlay */}
      {loadingLogout && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loader}></div>
          <p>Logging out...</p>
        </div>
      )}
    </div>
  );
}
