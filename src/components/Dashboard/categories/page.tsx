"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/ui/common/DynamicTable";
import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import AddCategory from "./components/addCategories";
import { TableColumn, TableAction } from "@/types/table.types";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import { Category } from "@/types/category.types";

export default function CategoryPage() {
  const [tab, setTab] = useState(1); // 1 = Manage, 2 = Add/Edit
  const [editCategory, setEditCategory] = useState<Category | undefined>(undefined);


  const { data, isLoading, isError, refetch } = useGetAllCategoriesQuery();

  const categoryData: Category[] =
    data?.result?.list?.map((item: any) => ({
      _id: item._id,
      categoryName: item.categoryName,
      slug: item.slug,
      categoryDescription: item.categoryDescription,
      faqs: item.faqs,
      status: item.status,
    })) || [];

  // ---------------- TABLE COLUMNS ----------------
  const columns: TableColumn<Category>[] = [
    { key: "categoryName", label: "Category Name" },
    { key: "slug", label: "Slug" },
    { key: "categoryDescription", label: "Description" },
    { key: "status", label: "Status" },
  ];

  // ---------------- TABLE ACTIONS ----------------
  const actions: TableAction<Category>[] = [
    {
      label: "View",
      onClick: (row) => {
        const slug = row.categoryName.toLowerCase()
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
        alert(`🗑️ Deleting: ${row.categoryName}`);
      },
    },
  ];

  // ---------------- BULK ACTIONS ----------------
  const bulkActions = [
    {
      label: "Delete Selected",
      onClick: (rows: Category[]) =>
        alert(`Deleting ${rows.length} categories`),
    },
  ];

  // ---------------- HEADER TAB ACTIONS ----------------
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

  // ---------------- LOADING / ERROR ----------------
  if (isLoading)
    return <p className="text-center text-gray-500 py-4">Loading...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500 py-4">
        Failed to load categories. Try again later.
      </p>
    );

  // ---------------- RENDER ----------------
  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs
        actions={tabActions}
        activeIndex={tab - 1}
        onTabChange={(index) => setTab(index + 1)}
      />

      {tab === 1 ? (
        <div>
          <DynamicTable
            columns={columns}
            data={categoryData}
            actions={actions}
            bulkActions={bulkActions}
            filterKeys={["status"]}
            searchKey="categoryName"
            itemsPerPage={10}
          />
        </div>
      ) : (
        <AddCategory refetch={refetch} editCategory={editCategory} />
      )}
    </div>
  );
}
