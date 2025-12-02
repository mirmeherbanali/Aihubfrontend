"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useRouter } from "next/navigation";
import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import DynamicTable from "@/components/ui/common/DynamicTable";
import DynamicForm from "@/components/ui/DynamicForm";

import { toolsFields } from "@/lib/dashboard/tools/fields/formFields";
import { ToolsInput, toolsSchema } from "@/lib/validators/toolsValidator";
import { TableAction, TableColumn } from "@/types/table.types";
import { Tool } from "@/types/tool.types";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import {
  useCreateToolMutation,
  useGetAllToolsQuery,
} from "@/features/tools/toolsApi";
import { getUserId } from "@/utils/authStorage";

const AdminTools = () => {
  const userId = getUserId();
  const [tab, setTab] = useState(1);
  const [editTool, setEditTool] = useState<Tool | null>(null);
  const router = useRouter();
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories = categoriesData?.result?.list || [];
  const { data: toolsData, refetch } = useGetAllToolsQuery();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const raw: any = toolsData?.result?.list;

  const baseTools: Tool[] = Array.isArray(raw)
    ? raw
    : Array.isArray(toolsData?.result)
      ? toolsData?.result
      : raw?.list || [];

  const toolData: Tool[] = baseTools.flatMap((tool) =>
    (tool.category || []).map((cat: any) => ({
      ...tool,
      category: [cat],
      rowId: `${tool._id}-${cat._id}`,
    }))
  );

  const [createTool] = useCreateToolMutation();
  const resetFormAndState = () => {
    setEditTool(null);
    addForm.reset();
  };
  const tabActions = [
    {
      label: "Manage Tools",
      onClick: () => {
        resetFormAndState();
        setTab(1);
      },
    },

    {
      label: editTool ? "Edit Tool" : "Add Tool",
      onClick: () => {
        if (!editTool) {
          setEditTool(null);
          addForm.reset();
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

  const handleAddSubmit = async (data: ToolsInput) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      const submissionData = {
        ...data,
        userId: userId,
        created_by: userId,
        status: "Approved",
      };

      if (Array.isArray(data.screenshots)) {
        const uploadedFiles = data.screenshots.filter(
          (file) => file instanceof File
        );
        const existingUrls = data.screenshots.filter(
          (file) => typeof file === "string"
        );

        uploadedFiles.forEach((file) => {
          formData.append("screenshots", file);
        });

        if (existingUrls.length > 0) {
          formData.append("existingScreenshots", JSON.stringify(existingUrls));
        }
      }

      Object.entries(submissionData).forEach(([key, value]) => {
        if (key === "screenshots") return;

        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

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

  const columns: TableColumn<Tool>[] = [
    { key: "toolName", label: "Tool Name" },
    {
      key: "category",
      label: "Category",
      render: (tool) => {
        const category = categories.find(
          (c) => c._id === tool?.category[0]?._id
        );
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
        if (!row.category || row.category.length === 0) return;
        const category = categories.find((c) => c._id === row.category[0]?._id);
        if (!category) return;

        const categoryName = category.categoryName;
        const toolName = row.toolName;
        window.open(
          `/categories/${encodeURIComponent(categoryName)}/tooldetails/${encodeURIComponent(toolName)}`,
          "_blank"
        );
      },
    },
    {
      label: "Edit",
      onClick: (row) => {
        const fullTool = baseTools?.find((t) => t._id === row._id);
        const allCategoryIds = fullTool?.category?.map((c: any) => c._id) || [];
        setEditTool(fullTool || row);
        addForm.reset({
          ...fullTool,
          category: allCategoryIds,
        });

        setTab(2);
      },
    },

    {
      label: "Delete",
      onClick: (row) => alert(`🗑️ Deleting: ${row.toolName}`),
    },
  ];

  const bulkActions = [
    {
      label: "Delete Selected",
      onClick: (rows: Tool[]) => alert(`Deleting ${rows.length} Tools`),
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
        <DynamicTable
          columns={columns}
          data={toolData}
          actions={actions}
          bulkActions={bulkActions}
          searchKey="toolName"
          filterKeys={["status"]}
          itemsPerPage={10}
        />
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
            fields={toolsFields(categories)}
            control={addForm.control}
            handleSubmit={addForm.handleSubmit}
            onSubmit={handleAddSubmit}
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
