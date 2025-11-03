"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";

import DynamicHeaderTabs from "@/components/DynamicHeaderTabs/DynamicHeaderTabs";
import DynamicTable from "@/components/ui/common/DynamicTable";
import DynamicForm from "@/components/ui/DynamicForm";

import { toolsFields } from "@/lib/dashboard/tools/fields/formFields";
import { ToolsInput, toolsSchema } from "@/lib/validators/toolsValidator";
import { TableAction, TableColumn } from "@/types/table.types";
import { Tool } from "@/types/tool.types";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import { useCreateToolMutation, useGetAllToolsQuery } from "@/features/tools/toolsApi";
import { getUserId } from "@/utils/authStorage";

const AdminTools = () => {
  const userId = getUserId();
  const [tab, setTab] = useState(1);
  const [editTool, setEditTool] = useState<Tool | null>(null);
  console.log("editTool",editTool)

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories = categoriesData?.result?.list || [];

  const { data: toolsData, refetch } = useGetAllToolsQuery();
  const raw: any = toolsData?.result?.list;
  const toolData: Tool[] = Array.isArray(raw)
    ? raw.flatMap((i: any) => i?.list || [])
    : raw?.list || raw || [];

  const [createTool] = useCreateToolMutation();

  // Fix: Add function to clear form and reset state
  const resetFormAndState = () => {
    setEditTool(null);
    addForm.reset();
  };

  const tabActions = [
    {
      label: "Manage Tools",
      onClick: () => {
        resetFormAndState(); // Clear form when going back to manage
        setTab(1);
      },
    },
    {
      label: editTool ? "Edit Tool" : "Add Tool",
      onClick: () => {
        // Fix: Clear form when clicking "Add Tool" specifically
        if (!editTool) {
          setEditTool(null)
          addForm.reset();
        }
        setTab(2);
      },
      disabled: !!editTool,
    },
  ];

  const addForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur"
  });

  const handleAddSubmit = async (data: ToolsInput) => {
    try {
      const formData = new FormData();
      const submissionData = {
        ...data,
        userId:userId,
        created_by: userId,
        status: "Approved",
      };

      Object.entries(submissionData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      await createTool(formData).unwrap();
      resetFormAndState(); // Use the reset function here too
      refetch();
      setTab(1);
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };

  const columns: TableColumn<Tool>[] = [
    { key: "_id", label: "ID" },
    { key: "toolName", label: "Tool Name" },
    {
      key: "category",
      label: "Category",
      render: (tool) => {
        const category = categories.find((c) => c._id === tool?.category?._id);
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
      onClick: (row) => alert(`👤 Viewing: ${row.toolName}`),
    },
    {
      label: "Edit",
      onClick: (row) => {
        setEditTool(row);
        addForm.reset({
          ...row,
          category: row.category?._id || "", // <-- use _id only
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
          // Fix: Clear form when switching to Add Tool tab (tab 2) without editTool
          if (index === 1 && !editTool) {
            setEditTool(null)
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
            buttonText={editTool ? "Update Tool" : "Add Tool"}
          />
        </div>
      )}
    </div>
  );
};

export default AdminTools;