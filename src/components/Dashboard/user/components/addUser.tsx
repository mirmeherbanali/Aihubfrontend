"use client";

import React,{useEffect} from "react";
import styles from "../../../ui/style/AddUser.module.scss";
import { useForm } from "react-hook-form";
import {
  createRegisterHandler
} from "@/lib/auth/handler/formHandlers";
import {  useRegisterMutation,useUpdateProfileMutation } from "@/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import {
  RegisterInput,
  registerSchema,
} from "@/lib/validators/userValidator";
import { getUserId, getUserType } from "@/utils/authStorage";
import { userFields } from "@/lib/auth/fields/formFields";

export default function AddUser({ editData, setEditData,setTab,refetch}: any) {
  const userType = getUserType();
  const userId = getUserId();
  // ✅ Initialize the form with validation
  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation();
  const [updateProfile,{ isLoading: updateLoading }] = useUpdateProfileMutation();
    const { control: registerControl, handleSubmit, reset,setValue } =
      useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
      });
   // 🟦 Pre-fill when editing
  useEffect(() => {
    if (editData) {
      Object.keys(editData).forEach((key) => {
        // @ts-ignore
        if (editData[key]) setValue(key, editData[key]);
      });
    } else {
      reset();
    }
  }, [editData]);

  const onRegisterSubmit = createRegisterHandler(
    registerUser,
    reset,
    undefined,
    userType??undefined,
    userId ?? undefined // 👈 pass Admin ID
  );

   const onUpdate = async (values: RegisterInput) => {
    try {
        await updateProfile({ ...values, id: editData._id }).unwrap();
        setEditData(null);
      reset();
      setTab(1)
      refetch()
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return (
  <div className={styles.pageWrapper}>
    
    <div className={styles.card}>
      
      <div className={styles.avatarWrapper}>
        <div className={styles.avatar}>
          <span>{editData ? editData.firstName?.[0] : "C"}</span>
          <button className={styles.editBtn}>✏️</button>
        </div>
      </div>

      <div className={styles.formWrapper}>
        <DynamicForm
          fields={userFields(userType ?? undefined)}
          control={registerControl}
          handleSubmit={handleSubmit}
          onSubmit={editData ? onUpdate : onRegisterSubmit}
          isLoading={editData?updateLoading:registerLoading}
          buttonText={
            editData
              ? updateLoading
                ? "Updating..."
                : "Update"
              : "Register"
          }
        />
      </div>
    </div>
  </div>
);

}
