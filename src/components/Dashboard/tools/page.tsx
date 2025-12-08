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
  useGetAllToolsQuery,
  useUpdateToolMutation
} from "@/features/tools/toolsApi";
import { getUserId } from "@/utils/authStorage";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import { Tool } from "@/types/tool.types";

export default function ToolsPage() {
  const userId = getUserId() ?? "";
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories = categoriesData?.result?.list || [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showGridForm, setShowGridForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: toolsData, refetch } = useGetAllToolsQuery({ userId });
  const [createTool,{isLoading:toolLoading}] = useCreateToolMutation();
  const [updateTool,{isLoading:toolUpdateLoading}] = useUpdateToolMutation();
  const tools = toolsData?.result?.list || [];
  const totalSubmitted = tools.length;

  const totalPending = tools.filter((t: { status: string; }) => t.status?.toLowerCase() === "pending").length;

  const totalApproved = tools.filter((t: { status: string; }) => t.status?.toLowerCase() === "approved").length;

  const gridForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
  });

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
    const formData = buildFormData(data, { userId });

    await createTool(formData).unwrap();

    addForm.reset();
    setShowAddForm(false);
    refetch();
  } catch (error) {
    console.error("Error adding tool:", error);
  }
};

const handleUpdateSubmit = async (data: ToolsInput) => {
  
  try {
    const toolId = tools[editingIndex!]?._id;

    if (!toolId) return console.error("Missing tool ID for update");

    const formData = buildFormData(data, {
      id: toolId,
      userId: userId,
    });

    await updateTool(formData).unwrap();

    gridForm.reset();
    setShowGridForm(false);
    setEditingIndex(null);
    refetch();
  } catch (error) {
    console.error("Error updating tool:", error);
  }
};

  const summaryItems = [
  { title: "Total Tools Submitted", value: totalSubmitted },
  { title: "Pending Approvals", value: totalPending },
  { title: "Approved Tools", value: totalApproved },
];


  const gridData = tools?.map((tool: Tool, index: number) => ({
    id: tool._id || index,
    title: tool.toolName,
    image: tool.logo,
    placeholder: "🛠️",
  }));

  return (
    <div className={styles.pageContainer}>
      <div className="header-wrapper">
        <h2 className="page-title">Welcome to Recuip!</h2>
        <p className="page-subtitle">Developer Dashboard Overview</p>
      </div>

      <SummaryGrid items={summaryItems} />
      <section className={styles.submittedSection}>
        <h2>Submitted Tools</h2>
        {/* <GridCards
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
        /> */}
        <div className={styles.toolsRow}>
          {/* LEFT: SLIDER */}
          <div className={styles.toolsSliderWrapper}>
            <button
              className={styles.slideBtnLeft}
              onClick={() => {
                const slider = document.getElementById("toolsSlider");
                if (slider) {
                  (slider as HTMLElement).scrollLeft -= 300;
                }
              }}
            >
              ◀
            </button>

            <div className={styles.toolsSlider} id="toolsSlider">
              {tools.map((tool: Tool, index: number) => (
                <div
                  key={tool._id}
                  className={styles.toolCard}
                  onClick={() => {
                    setEditingIndex(index);
                   const tool = tools[index];
    const categoryIds = tool?.category?.map((c: { _id: any; }) => c._id) || [];

    gridForm.reset({
      ...tool,
      category: categoryIds, // FIXED
    });
                    setShowGridForm(true);
                    setShowAddForm(false);
                  }}
                >
                  <img src={tool.logo} className={styles.toolImage} />
                  <p className={styles.toolName}>{tool.toolName}</p>
                  <p className={styles.toolName}>{tool.status}</p>

                </div>
              ))}
            </div>

            <button
              className={styles.slideBtnRight}
              onClick={() => {
                const slider = document.getElementById("toolsSlider");
                if (slider) {
                  (slider as HTMLElement).scrollLeft += 300;
                }
              }}
            >
              ▶
            </button>
          </div>

          {/* RIGHT SIDE FIXED BUTTON */}
          <div
            className={styles.addCard}
            onClick={() => {
              addForm.reset();
              setEditingIndex(null);
              setShowAddForm(true);
              setShowGridForm(false);
            }}
          >
            <span>+</span>
            <p>Submit a Tool</p>
          </div>
        </div>
      </section>

      {showGridForm && editingIndex !== null && (
        <Card className={styles.formCard}>
          <DynamicForm
            fields={toolsFields(categories,false,false)}
            control={gridForm.control}
            handleSubmit={gridForm.handleSubmit}
            onSubmit={handleUpdateSubmit}
            isLoading={toolUpdateLoading}
            buttonText={toolUpdateLoading?"Updating..":"Update Tool"}
          />
        </Card>
      )}

      {showAddForm && (
        <Card className={styles.formCard}>
          <DynamicForm
            fields={toolsFields(categories,false,false)}
            control={addForm.control}
            handleSubmit={addForm.handleSubmit}
            onSubmit={handleAddSubmit}
            isLoading={toolLoading}

            buttonText={toolLoading?"Adding":"Add Tool"}
          />
        </Card>
      )}
    </div>
  );
}
