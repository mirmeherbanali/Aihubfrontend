"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useRouter } from "next/navigation";
import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import DynamicTable from "@/components/ui/common/DynamicTable";
import DynamicForm from "@/components/ui/DynamicForm";
import styles from "../../ui/style/ToolsPage.module.scss";
import { toolsFields } from "@/lib/dashboard/tools/fields/formFields";
import { ToolsInput, toolsSchema } from "@/lib/validators/toolsValidator";
import { TableAction, TableColumn } from "@/types/table.types";
import { Tool } from "@/types/tool.types";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import {
  useCreateToolMutation,
  useGetAllToolsQuery,
  useUpdateToolMutation,
  useDeleteToolMutation,
} from "@/features/tools/toolsApi";
import { getUserId, getUserType } from "@/utils/authStorage";
import { slugify } from "@/utils/useEncodeUrl";

const AdminTools = () => {
  const userId = getUserId();
  const userType = getUserType();
  const [tab, setTab] = useState(1);
  const [editTool, setEditTool] = useState<Tool | null>(null);
  const router = useRouter();
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories = categoriesData?.result?.list || [];
  const { data: toolsData, refetch } = useGetAllToolsQuery();
  const [deleteTool] = useDeleteToolMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const raw: any = toolsData?.result?.list;
  const isAdmin = userType === "Admin";
  const isEditMode = !!editTool;

  const baseTools: Tool[] = Array.isArray(raw)
    ? raw
    : Array.isArray(toolsData?.result)
      ? toolsData?.result
      : raw?.list || [];
  const sortedBaseTools = [...baseTools].sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime()
  );

  // 2️⃣ Build table rows from already-sorted tools
  const toolData: Tool[] = sortedBaseTools.flatMap((tool) => {
    const categoriesForTool = Array.isArray(tool.category)
      ? tool.category
      : tool.category
        ? [tool.category]
        : [];

    return categoriesForTool.map((cat: any) => ({
      ...tool,
      category: cat,
      rowId: `${tool._id}-${cat._id}`,
    }));
  });
  const [createTool] = useCreateToolMutation();
  const [updateTool] = useUpdateToolMutation();

  const resetFormAndState = () => {
    setEditTool(null);
    addForm.reset();
  };

  const tabActions = [
    {
      label: "Manage Tools",
      onClick: () => {
        setEditTool(null);
        addForm.reset({});
        setTab(1);
      },
    },
    {
      label: editTool ? "Edit Tool" : "Add Tool",
      onClick: () => {
        if (!editTool) {
          setEditTool(null);
          addForm.reset({});
        }
        setTab(2);
      },
      disabled: !!editTool,
    },
  ];

  const addForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
  });

  const buildFormData = (data: ToolsInput, extra: Record<string, any> = {}) => {
    const formData = new FormData();

    // handle screenshots (new + existing)
    if (Array.isArray(data.screenshots)) {
      const uploaded = data.screenshots.filter((f) => f instanceof File);
      const existing = data.screenshots.filter((f) => typeof f === "string");

      uploaded.forEach((file) => formData.append("screenshots", file));

      if (existing.length > 0) {
        formData.append("existingScreenshots", JSON.stringify(existing));
      }
    }

    const merged = { ...data, ...extra };

    Object.entries(merged).forEach(([key, value]) => {
      if (key === "screenshots") return;

      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return formData;
  };

  const handleAddSubmit = async (data: ToolsInput) => {
    try {
      setIsSubmitting(true);
      const formData = buildFormData(data, {
        userId,
        created_by: userId,
        status: "Approved",
      });
      // const submissionData = {
      //   ...data,
      //   userId: userId,
      //   created_by: userId,
      //   status: "Approved",
      // };

      await createTool(formData).unwrap();
      resetFormAndState();
      refetch();
      setTab(1);
    } catch (error) {
      console.error("Error adding tool:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (data: ToolsInput) => {
    try {
      setIsSubmitting(true);

      if (!editTool?._id) return;

      const formData = buildFormData(data, {
        id: editTool._id,
        userId: userId,
        updated_by: userId,
      });

      await updateTool(formData).unwrap();
      setEditTool(null);
      addForm.reset({}); // FULL RESET
      refetch();
      setTab(1);
    } catch (error) {
      console.error("Error updating tool:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: TableColumn<Tool>[] = [
    { key: "toolName", label: "Tool Name" },
    {
      key: "category",
      label: "Category",
      render: (tool) => {
        // support both array or single-object shapes for tool.category
        const catId =
          Array.isArray(tool?.category) && tool.category.length > 0
            ? tool.category[0]._id
            : (tool as any)?.category?._id;

        const category = categories.find((c: any) => c._id === catId);
        return category ? category.categoryName : "—";
      },
    },
    { key: "status", label: "Status" },
    {
      key: "createdAt",
      label: "Submitted Date",
      render: (tool) =>
        tool.createdAt
          ? moment(tool.createdAt).format("dddd, DD MMMM YYYY, hh:mm A")
          : "—",
    },
  ];

  const actions: TableAction<Tool>[] = [
    {
      label: "View",
      onClick: (row) => {
        const catId =
          Array.isArray(row?.category) && row.category.length > 0
            ? row.category[0]._id
            : (row as any)?.category?._id;

        if (!catId) return;

        const category = categories.find((c: any) => c._id === catId);
        if (!category) return;

        const categoryName = category.categoryName;
        const toolName = row.toolName;
        window.open(
          `/product/${slugify(toolName)}`,
          "_blank"
        );
      },
    },
    {
      label: "Edit",
      onClick: (row) => {
        const fullTool = baseTools?.find((t) => t._id === row._id);
        const allCategoryIds = (() => {
          const cat = fullTool?.category;
          if (!cat) return [];
          if (Array.isArray(cat)) return cat.map((c: any) => c._id);
          return [(cat as any)._id];
        })();
        setEditTool(fullTool || row);
        addForm.reset({
          ...fullTool,
          category: allCategoryIds,
          status: Array.isArray(fullTool?.status)
            ? fullTool.status[0]
            : (fullTool?.status ?? ""),
          logo: fullTool?.logo ?? "",
          screenshots: fullTool?.screenshots ?? [],
        });

        setTab(2);
      },
    },

    {
      label: "Delete",
      onClick: async (row) => {
        if (!confirm(`Delete tool "${row.toolName}"?`)) return;

        await deleteTool({ id: row._id, adminId: userId ?? "" });

        alert("Tool deleted");
        refetch();
      },
    },
  ];

  const bulkActions = [
    {
      label: "Delete Selected",
      onClick: async (rows: any[]) => {
        if (!rows.length) return;
        if (!confirm(`Delete ${rows.length} tools?`)) return;

        for (const tool of rows) {
          await deleteTool({ id: tool._id, adminId: userId ?? "" });
        }

        alert("Selected tools deleted");
        refetch();
      },
    },
  ];

  return (
    <div className="tab-content-wrapper">
      <DynamicHeaderTabs
        actions={tabActions}
        activeIndex={tab - 1}
        onTabChange={(index) => {
          setTab(index + 1);
          if (index === 1 && !editTool) {
            setEditTool(null);
            addForm.reset();
          }
        }}
      />

      {tab === 1 ? (
        toolData.length === 0 ? (
          <p className={styles.nodatatext}>No Tools Found</p>
        ) : (
          <DynamicTable
            columns={columns}
            data={toolData}
            actions={actions}
            bulkActions={bulkActions}
            searchKey="toolName"
            filterKeys={["status"]}
            itemsPerPage={10}
          />
        )
      ) : (
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid blue",
            margin: "50px 0px",
          }}
        >
          <DynamicForm
            fields={toolsFields(categories, isAdmin, isEditMode)}
            control={addForm.control}
            handleSubmit={addForm.handleSubmit}
            onSubmit={editTool ? handleUpdateSubmit : handleAddSubmit}
            buttonText={
              isSubmitting
                ? "Submitting..."
                : editTool
                  ? "Update Tool"
                  : "Add Tool"
            }
          />
        </div>
      )}
    </div>
  );
};

export default AdminTools;
