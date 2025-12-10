"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/ui/common/DynamicTable";
import styles from "../../ui/style/DynamicTable.module.scss"
import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import AddCategory from "./components/addCategories";
import { TableColumn, TableAction } from "@/types/table.types";
import { useGetAllCategoriesQuery,useDeleteCategoryMutation } from "@/features/dashboard/category/categoryApi";
import { Category } from "@/types/category.types";
import { FaTrash } from "react-icons/fa";
import { getUserId } from "@/utils/authStorage";
export default function CategoryPage() {
  const userId=getUserId()
  const [tab, setTab] = useState(1);
  const [editCategory, setEditCategory] = useState<Category | undefined>(
    undefined
  );

  const { data, isLoading, isError, refetch } = useGetAllCategoriesQuery();
  const [deleteCategory]=useDeleteCategoryMutation()

  const categoryData: Category[] =
    data?.result?.list?.map((item: any) => ({
      _id: item._id,
      categoryName: item.categoryName,
      slug: item.slug,
      categoryDescription: item.categoryDescription,
      faqs: item.faqs,
      status: item.status,
    })) || [];

  const columns: TableColumn<Category>[] = [
    { key: "categoryName", label: "Category Name" },
    { key: "slug", label: "Slug" },
    { key: "categoryDescription", label: "Description" },
    { key: "status", label: "Status" },
  ];

  const actions: TableAction<Category>[] = [
    {
      label: "View",
      onClick: (row) => {
        const slug = row.categoryName.toLowerCase();
        window.open(`/categories/${slug}`, "_blank");
      },
    },
    {
      label: "Edit",
      onClick: (row) => {
        setEditCategory(row);
        setTab(2);
      },
    },
    {
      label: "Delete",
      onClick: (row) => {
  deleteCategory({ 
    id: row?._id,
    adminId: userId??""
  });
  refetch()
},

    },
  ];

const bulkActions = [
  {
    label: (
      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <FaTrash size={14} /> Delete Selected
      </span>
    ),
     onClick: async (rows: Category[]) => {
      try {
        // Collect all IDs
        const ids = rows.map((item) => item.id);

        // Loop delete
        for (const id of ids) {
          await deleteCategory({
            id,
            adminId: userId??""
          });
        }
       refetch()
      } catch (error) {
        console.error("Failed to delete selected categories");
      }
    },
  }
];


  const tabActions = [
    {
      label: "Manage Categories",
      onClick: () => {
        setEditCategory(undefined);
        setTab(1);
      },
    },
    {
      label: editCategory ? "Edit Category" : "Add Category",
      onClick: () => {
        setEditCategory(undefined);
        setTab(2);
      },
      disabled: !!editCategory,
    },
  ];

  if (isLoading)
    return <p className="text-center text-gray-500 py-4">Loading...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500 py-4">
        Failed to load categories. Try again later.
      </p>
    );

  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs
        actions={tabActions}
        activeIndex={tab - 1}
        onTabChange={(index) => setTab(index + 1)}
      />

      {tab === 1 ? (
  categoryData.length === 0 ? (
    <p className={styles.nodatatext}>
      No Category Found
    </p>
  ) : (
    <DynamicTable
      columns={columns}
      data={categoryData}
      actions={actions}
      bulkActions={bulkActions}
      filterKeys={["status"]}
      searchKey="categoryName"
      itemsPerPage={10}
    />
  )
) : (
  <AddCategory
    refetch={refetch}
    editCategory={editCategory}
    onSuccess={() => {
      setEditCategory(undefined);
      setTab(1);
    }}
  />
)}

    </div>
  );
}
