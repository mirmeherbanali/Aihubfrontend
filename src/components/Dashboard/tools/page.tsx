"use client";

import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import { toolsFields } from "@/lib/dashboard/tools/fields/formFields";
import { toolsSchema, ToolsInput } from "@/lib/validators/toolsValidator";
import styles from "@/components/ui/style/ToolsPage.module.scss";
import SummaryGrid from "@/components/ui/SummaryGrid";
import GridCards from "@/components/ui/GridCards";
import {
  useCreateToolMutation,
  useGetAllToolsQuery
} from "@/features/tools/toolsApi";
import { getUserId } from "@/utils/authStorage";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";

export default function ToolsPage() {
  const userId = getUserId()??""
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories = categoriesData?.result?.list || [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showGridForm, setShowGridForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // API hooks
  const { data: toolsData, refetch } = useGetAllToolsQuery({ userId });

  const [createTool] = useCreateToolMutation();

  // Tools list from backend
  const tools = toolsData?.result?.list || [];

  // Form for editing
  const gridForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
  });

  // Form for adding new tool
  const addForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
  });

  
const handleAddSubmit = async (data: ToolsInput) => {
  try {
    // Create FormData for file uploads
    const formData = new FormData();
    const submissionData = { ...data, userId: userId };

    Object.entries(submissionData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const res= await createTool(formData).unwrap();
    console.log("res",res)
    addForm.reset();
    setShowAddForm(false);
    refetch();
  } catch (error) {
    console.error("Error adding tool:", error);
  }
};

  // const summaryItems = [
  //   { title: "Total Tools Submitted", value: tools.length },
  //   { title: "Pending Approvals", value: tools?.filter((t) => t?.status === "Pending").length },
  //   { title: "Approved Tools", value: tools?.filter((t) => t?.status === "Approved").length },
  // ];
  
  const summaryItems = [
    { title: "Total Tools Submitted", value: 18},
    { title: "Pending Approvals", value: 20},
    { title: "Approved Tools", value: 23},
  ];

  const gridData = tools?.map((tool, index) => ({
    id: tool._id || index,
    title: tool.toolName,
    image: tool.logo,
    placeholder: "🛠️",
  }));

  return (
      <div className={styles.pageContainer}>
        <SummaryGrid items={summaryItems} />
        <section className={styles.submittedSection}>
          <h2>Submitted Tools</h2>
          <GridCards
            data={gridData}
            activeIndex={editingIndex}
            onSelect={(item, index) => {
              setEditingIndex(index);
              gridForm.reset(tools[index]);
              setShowGridForm(true);
              setShowAddForm(false);
            }}
            onAdd={() => {
              addForm.reset();
              setEditingIndex(null);
              setShowAddForm(true);
              setShowGridForm(false);
            }}
            addLabel="Submit a Tool"
          />
        </section>

        {showGridForm && editingIndex !== null && (
          <Card className={styles.formCard}>
            <DynamicForm
              fields={toolsFields(categories)}
              control={gridForm.control}
              handleSubmit={gridForm.handleSubmit}
              onSubmit={handleAddSubmit}
              buttonText="Update Tool"
            />
          </Card>
        )}

        {showAddForm && (
          <Card className={styles.formCard}>
            <DynamicForm
              fields={toolsFields(categories)}
              control={addForm.control}
              handleSubmit={addForm.handleSubmit}
              onSubmit={handleAddSubmit}
              buttonText="Add Tool"
            />
          </Card>
        )}
      </div>
  );
}
 