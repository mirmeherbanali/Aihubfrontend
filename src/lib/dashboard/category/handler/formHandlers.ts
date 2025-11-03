"use client";

import { SubmitHandler } from "react-hook-form";
import { AddCategoryInput } from "@/lib/validators/addCatygoryValidator";
import { getUserId } from "@/utils/authStorage";

// 🔹 Create Category Handler
export const createCategoryHandler = (
  createCategory: (data: AddCategoryInput & { adminId: string }) => Promise<any>,
  reset: () => void
): SubmitHandler<AddCategoryInput> => {
  return async (data) => {
    try {
      const adminId = getUserId();
      const apiData = { ...data, adminId };

      console.log("📤 Create Category Data:", apiData);
      const res = await createCategory(apiData).unwrap();

      if (res.success) {
        console.log("🎉 Category created successfully:", res);
        reset();
      } else {
        console.warn("⚠️ Category creation failed:", res?.result?.message);
      }
    } catch (err: any) {
      console.error(
        "❌ Create Category Error:",
        err?.data?.message || err.message || "Unknown error"
      );
    }
  };
};

// 🔹 Update Category Handler
export const updateCategoryHandler = (
  updateCategory: (data: AddCategoryInput & { id: string; adminId: string }) => Promise<any>,
  reset: () => void
): SubmitHandler<AddCategoryInput & { id: string }> => {
  return async (data) => {
    try {
      const adminId = getUserId();
      const apiData = { ...data, adminId };

      console.log("📤 Update Category Data:", apiData);
      const res = await updateCategory(apiData).unwrap();

      if (res.success) {
        console.log("✅ Category updated successfully:", res);
        reset();
      } else {
        console.warn("⚠️ Category update failed:", res?.result?.message);
      }
    } catch (err: any) {
      console.error(
        "❌ Update Category Error:",
        err?.data?.message || err.message || "Unknown error"
      );
    }
  };
};

// 🔹 Delete Category Handler
export const deleteCategoryHandler = (
  deleteCategory: (data: { id: string; adminId: string }) => Promise<any>
) => {
  return async (id: string) => {
    try {
      const adminId = getUserId();
      const body = { id, adminId };

      console.log("🗑️ Delete Category Data:", body);
      const res = await deleteCategory(body).unwrap();

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
