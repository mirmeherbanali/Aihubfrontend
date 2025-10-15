"use client";

import React from "react";
import styles from "../../../ui/style/AddUser.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import {
  AddCategoryInput,
  addCategorySchema
} from "@/lib/validators/addCatygoryValidator";
import { addCategoryFields } from "@/lib/dashboard/category/fields/formFields";

export default function AddCategory() {
  // ✅ Initialize the form with validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<AddCategoryInput>({
    resolver: zodResolver(addCategorySchema),
    mode: "onBlur",
    defaultValues: {}
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: AddCategoryInput) => {
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
      <div className={styles.profileContent}>
        {/* Profile Avatar */}

        {/* Profile Form */}
        <div className={styles.formSection}>
          <DynamicForm
            fields={addCategoryFields}
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
