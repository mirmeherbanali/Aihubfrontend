"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/ui/common/DynamicTable";
import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import AddCategory from "./components/addCategories";
import { TableColumn, TableAction } from "@/types/table.types";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import { Category } from "@/types/category.types";
import SmartViewModal from "@/components/ui/common/SmartView";



export default function CategoryPage() {
  const [tab, setTab] = useState(1); // 1 = Manage, 2 = Add/Edit
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [viewCategory, setViewCategory] = useState<Category | null>(null);
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

  const columns: TableColumn<Category>[] = [
    { key: "categoryName", label: "Category Name" },
    { key: "slug", label: "Slug" },
    { key: "categoryDescription", label: "Description" },
    {
      key: "faqs",
      label: "FAQs",
      render: (row: Category) => (
        <ul className="ml-2 list-disc text-sm">
          {row.faqs?.map((faq, idx) => (
            <li key={idx}>
              <strong>Q:</strong> {faq.question} <br />
              <strong>A:</strong> {faq.answer}
            </li>
          ))}
        </ul>
      ),
    },
    { key: "status", label: "Status" },
  ];

  const actions: TableAction<Category>[] = [
     {
      label: "View",
      onClick: (row) => setViewCategory(row), // 🔹 open view modal
    },
    {
      label: "Edit",
      onClick: (row) => {
        setEditCategory(row); // populate form with selected category
        setTab(2); // switch to Add/Edit tab
      },
    },
    {
      label: "Delete",
      onClick: (row) => alert(`🗑️ Deleting: ${row.categoryName}`),
    },
  ];

  const bulkActions = [
    {
      label: "Delete Selected",
      onClick: (rows: Category[]) =>
        alert(`Deleting ${rows.length} categories`),
    },
  ];

  const tabActions = [
    { label: "Manage Categories", onClick: () => {
      setEditCategory(null);
       setTab(1); }
      },
    {
      label: editCategory ? "Edit Category" : "Add Category",
      onClick: () => {
        if (!editCategory) {
        setEditCategory(null); // clear previous edit
        setTab(2); // switch to Add form
        }
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
console.log("tabs",tab)
  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs 
      actions={tabActions}
  activeIndex={tab - 1} // controlled by your tab state 
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
        {viewCategory && (
  <SmartViewModal
    title={viewCategory.categoryName}
    data={viewCategory}
    onClose={() => setViewCategory(null)}
  />
)}
  </div>
      ) : (
        <AddCategory refetch={refetch} editCategory={editCategory} />
      )}
    </div>
  );
}
