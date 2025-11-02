"use client";

import React, { useEffect } from "react";
import styles from "../../../ui/style/AddUser.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import {
  AddCategoryInput,
  addCategorySchema
} from "@/lib/validators/addCatygoryValidator";
import { addCategoryFields } from "@/lib/dashboard/category/fields/formFields";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/features/dashboard/category/categoryApi";
import { createCategoryHandler, updateCategoryHandler } from "@/lib/dashboard/category/handler/formHandlers";

interface AddCategoryProps {
  refetch: () => void;
  editCategory?: AddCategoryInput & { _id: string };
}

export default function AddCategory({ refetch, editCategory }: AddCategoryProps) {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<AddCategoryInput>({
    resolver: zodResolver(addCategorySchema),
    mode: "onBlur",
  });

  // 🔹 Pre-fill form when editing
  useEffect(() => {
    if (editCategory) {
      Object.keys(editCategory).forEach((key) => {
        setValue(key as keyof AddCategoryInput, editCategory[key as keyof AddCategoryInput]);
      });
    } else {
      reset();
    }
  }, [editCategory, setValue, reset]);

  const onSubmit = editCategory
    ? updateCategoryHandler(updateCategory, reset) // for edit
    : createCategoryHandler(createCategory, reset); // for create

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <div className={styles.formSection}>
          <DynamicForm
            fields={addCategoryFields}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            buttonText={isSubmitting ? "loading..." : editCategory ? "Update Category" : "Submit"}
          />
        </div>
      </div>
    </div>
  );
}
