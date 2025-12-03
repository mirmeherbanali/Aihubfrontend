"use client";

import React, { useEffect } from "react";
import styles from "../../../ui/style/AddUser.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import {
  AddCategoryInput,
  addCategorySchema,
} from "@/lib/validators/addCatygoryValidator";
import { addCategoryFields } from "@/lib/dashboard/category/fields/formFields";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/features/dashboard/category/categoryApi";
import { getUserId } from "@/utils/authStorage";

interface AddCategoryProps {
  refetch: () => void;
  onSuccess: () => void;
  editCategory?: (AddCategoryInput & { _id: string }) | undefined;
}

export default function AddCategory({
  refetch,
  editCategory,
  onSuccess,
}: AddCategoryProps) {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const adminId = getUserId();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<AddCategoryInput & { _id?: string }>({
    resolver: zodResolver(addCategorySchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (editCategory) {
      Object.keys(editCategory).forEach((key) => {
        setValue(
          key as keyof AddCategoryInput,
          editCategory[key as keyof AddCategoryInput]
        );
      });
    } else {
      reset();
    }
  }, [editCategory, setValue, reset]);

  const onSubmit = async (formData: any) => {
    try {
      const payload = {
        ...formData,
        adminId,
        created_by: adminId,
        updated_by: adminId,
      };

      if (editCategory) {
        await updateCategory({ ...payload, _id: editCategory._id }).unwrap();
      } else {
        await createCategory(payload).unwrap();
      }

      reset();     
      refetch();   
      onSuccess(); 

    } catch (err) {
      console.error("CATEGORY SAVE ERROR:", err);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <div className={styles.formSection}>
          <DynamicForm
            fields={addCategoryFields}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            buttonText={
              isSubmitting
                ? "loading..."
                : editCategory
                ? "Update Category"
                : "Submit"
            }
          />
        </div>
      </div>
    </div>
  );
}
