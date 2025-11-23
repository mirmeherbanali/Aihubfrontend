"use client";

import { SubmitHandler } from "react-hook-form";
import { AddCategoryInput } from "@/lib/validators/addCatygoryValidator";
import { getUserId } from "@/utils/authStorage";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from "@/features/dashboard/category/categoryApi";

// Infer mutation trigger types
export type CreateCategoryTrigger = ReturnType<typeof useCreateCategoryMutation>[0];
export type UpdateCategoryTrigger = ReturnType<typeof useUpdateCategoryMutation>[0];
export type DeleteCategoryTrigger = ReturnType<typeof useDeleteCategoryMutation>[0];

// ----------------------------------------
// CREATE HANDLER
// ----------------------------------------
export const createCategoryHandler = (
  createCategory: CreateCategoryTrigger,
  reset: () => void
): SubmitHandler<AddCategoryInput & { _id?: string }> => {
  return async (data) => {
    try {
      const adminId = getUserId() ?? ""; // FIXED
      const apiData = { ...data, adminId };

      const res = await createCategory(apiData).unwrap(); // FIXED unwrap

      if (res.success) reset();
    } catch (err: any) {
      console.error("Create Category Error:", err);
    }
  };
};

// ----------------------------------------
// UPDATE HANDLER
// ----------------------------------------
export const updateCategoryHandler = (
  updateCategory: UpdateCategoryTrigger,
  reset: () => void
): SubmitHandler<AddCategoryInput & { _id?: string }> => {
  return async (data) => {
    try {
      if (!data._id) {
        console.error("❌ Missing _id for update");
        return;
      }

      const adminId = getUserId() ?? ""; // FIXED

      // Convert _id → id (API requires id)
      const final = { id: data._id, adminId, ...data };

      const res = await updateCategory(final).unwrap(); // FIXED unwrap
      if (res.success) reset();
    } catch (err: any) {
      console.error("Update Category Error:", err);
    }
  };
};

// ----------------------------------------
// DELETE HANDLER
// ----------------------------------------
export const deleteCategoryHandler = (
  deleteCategory: DeleteCategoryTrigger
) => {
  return async (id: string) => {
    try {
      const adminId = getUserId() ?? ""; // FIXED

      const body = { id, adminId };

      console.log("🗑️ Delete Category Data:", body);

      const res = await deleteCategory(body).unwrap(); // FIXED unwrap support

      if (res.success) {
        console.log("🧹 Category deleted successfully:", res);
      } else {
        console.warn("⚠️ Category deletion failed:", res?.result?.message);
      }
    } catch (err: any) {
      console.error(
        "❌ Delete Category Error:",
        err?.data?.message || err.message || "Unknown error"
      );
    }
  };
};
