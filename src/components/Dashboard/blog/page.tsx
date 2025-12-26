"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DynamicTable from "@/components/ui/common/DynamicTable";
import FormRenderer from "./components/FormRenderer";
import styles from "../../ui/style/BlogEditor.module.scss";

import {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/features/blog/blogApi";

import {
  useGetAllAuthorsQuery,
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} from "@/features/author/authorApi";

import {
  useGetAllBlogCategoriesQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
} from "@/features/blog/blogCategoryApi";

import { TAB_CONFIG } from "./components/dashboardConfig";
import { COMMON_ACTIONS } from "./components/authorTableConfig";
import { BLOG_FORM } from "@/lib/dashboard/blog/fields/formFields";
import { getUserId } from "@/utils/authStorage";

type TabType = "blog" | "author" | "category";
type ModeType = "list" | "form";

export default function CreateBlogPage() {
  const userId =getUserId()
  const [activeTab, setActiveTab] = useState<TabType>("blog");
  const [mode, setMode] = useState<ModeType>("list");
  const [editItem, setEditItem] = useState<any>(null);
  const [submitAction, setSubmitAction] = useState<"draft" | "publish">("draft");

  /* ===================== CALL ALL HOOKS (NO DYNAMIC) ===================== */

  // BLOG
  const blogQuery = useGetAllBlogsQuery(undefined, { skip: activeTab !== "blog" });
  const [createBlog, blogCreate] = useCreateBlogMutation();
  const [updateBlog, blogUpdate] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  // AUTHOR
 const authorQuery = useGetAllAuthorsQuery(undefined, {
  skip: activeTab !== "author" && activeTab !== "blog",
});
  const [createAuthor, authorCreate] = useCreateAuthorMutation();
  const [updateAuthor, authorUpdate] = useUpdateAuthorMutation();
  const [deleteAuthor] = useDeleteAuthorMutation();

  // CATEGORY
  const categoryQuery = useGetAllBlogCategoriesQuery(undefined, {
  skip: activeTab !== "category" && activeTab !== "blog",
});
  const [createCategory, categoryCreate] = useCreateBlogCategoryMutation();
  const [updateCategory, categoryUpdate] = useUpdateBlogCategoryMutation();
  const [deleteCategory] = useDeleteBlogCategoryMutation();

  /* ===================== MAP BY TAB ===================== */

  const apiMap = {
    blog: {
      query: blogQuery,
      create: createBlog,
      update: updateBlog,
      delete: deleteBlog,
      creating: blogCreate.isLoading,
      updating: blogUpdate.isLoading,
    },
    author: {
      query: authorQuery,
      create: createAuthor,
      update: updateAuthor,
      delete: deleteAuthor,
      creating: authorCreate.isLoading,
      updating: authorUpdate.isLoading,
    },
    category: {
      query: categoryQuery,
      create: createCategory,
      update: updateCategory,
      delete: deleteCategory,
      creating: categoryCreate.isLoading,
      updating: categoryUpdate.isLoading,
    },
  } as const;

  const currentApi = apiMap[activeTab];
  const config = TAB_CONFIG[activeTab];

  const itemsRes = currentApi.query.data;
  const items = itemsRes?.result?.list ?? [];
  const refetch = currentApi.query.refetch;

  /* ===================== FORM ===================== */

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(config.formSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (editItem) {
      Object.entries(editItem).forEach(([key, value]) => {
        setValue(key, value as any);
      });
    } else {
      reset();
    }
  }, [editItem, reset, setValue]);

  /* ===================== SUBMIT ===================== */

const onSubmit: SubmitHandler<any> = async (data) => {
  try {
    // 👇 set status based on clicked button
    const finalData =
      activeTab === "blog"
        ? { ...data,userId:userId, status: submitAction }
        : data;

    const hasFile = Object.values(finalData).some(
      (v) => v instanceof File
    );

    let payload: any = finalData;

    if (hasFile) {
      const formData = new FormData();
      Object.entries(finalData).forEach(([key, value]) => {
        if (value instanceof File) formData.append(key, value);
        else if (value !== undefined && value !== null)
          formData.append(key, String(value));
      });
      payload = formData;
    }

    if (editItem) {
      await currentApi.update({
        ...(hasFile ? payload : { id: editItem._id, ...payload }),
      } as any).unwrap();
    } else {
      await currentApi.create(payload).unwrap();
    }

    reset();
    setEditItem(null);
    setMode("list");
    refetch();
  } catch (err) {
    console.error("❌ Submit failed:", err);
  }
};



  /* ===================== DELETE ===================== */

  const handleDelete = async (row: any) => {
    if (!confirm(`Delete this ${activeTab}?`)) return;
    try {
      await currentApi.delete({ id: row._id }).unwrap();
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const actions = COMMON_ACTIONS(
    (row) => {
      setEditItem(row);
      setMode("form");
    },
    handleDelete
  );

  const authorOptions =
  authorQuery.data?.result?.list?.map((a: any) => ({
    label: a.authorName,
    value: a._id,
  })) ?? [];

const categoryOptions =
  categoryQuery.data?.result?.list?.map((c: any) => ({
    label: c.categoryName,
    value: c._id,
  })) ?? [];

const dynamicFormFields = useMemo(() => {
  if (activeTab !== "blog") return config.formFields;

  return config.formFields.map((field: any) => {
    if (field.name === "author") return { ...field, options: authorOptions };
    if (field.name === "categories") return { ...field, options: categoryOptions };
    return field;
  });
}, [activeTab, config.formFields, authorOptions, categoryOptions]);


  /* ===================== UI ===================== */

  return (
    <div className={styles.container}>
      {/* TABS */}
      <div className={styles.tabSwitch}>
        {(Object.keys(TAB_CONFIG) as TabType[]).map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? styles.activeTab : ""}
            onClick={() => {
              setActiveTab(tab);
              setMode("list");
              setEditItem(null);
              reset();
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ACTIONS */}
      <div className={styles.tabActions}>
        <button
          onClick={() => {
            setMode("list");
            setEditItem(null);
            reset();
          }}
        >
          Manage {activeTab}
        </button>
        <button onClick={() =>{ setMode("form");reset();}}>
          {editItem ? "Edit" : "Add"} {activeTab}
        </button>
      </div>

      {/* CONTENT */}
      {mode === "list" ? (
        <DynamicTable
          columns={config.columns}
          data={items}
          actions={actions}
          searchKey="name"
          itemsPerPage={10}
        />
      ) : (
        <FormRenderer
          config={dynamicFormFields}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={
            isSubmitting ||
            currentApi.creating ||
            currentApi.updating
          }
          errors={errors}
          onActionClick={setSubmitAction}

        />
      )}
    </div>
  );
}
