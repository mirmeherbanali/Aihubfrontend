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
  const [createTool] = useCreateToolMutation();
  const tools = toolsData?.result?.list || [];

  const gridForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
  });

  const addForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
  });

  const handleAddSubmit = async (data: ToolsInput) => {
    try {
      const formData = new FormData();
      const submissionData = { ...data, userId: userId };
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

      const res = await createTool(formData).unwrap();

      addForm.reset();
      setShowAddForm(false);
      refetch();
    } catch (error) {
      console.error("Error adding tool:", error);
    }
  };

  const summaryItems = [
    { title: "Total Tools Submitted", value: 18 },
    { title: "Pending Approvals", value: 20 },
    { title: "Approved Tools", value: 23 },
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
                document.getElementById("toolsSlider").scrollLeft -= 300;
              }}
            >
              ◀
            </button>

            <div className={styles.toolsSlider} id="toolsSlider">
              {tools.map((tool: Tool, index) => (
                <div
                  key={tool._id}
                  className={styles.toolCard}
                  onClick={() => {
                    setEditingIndex(index);
                    gridForm.reset(tool);
                    setShowGridForm(true);
                    setShowAddForm(false);
                  }}
                >
                  <img src={tool.logo} className={styles.toolImage} />
                  <p className={styles.toolName}>{tool.toolName}</p>
                </div>
              ))}
            </div>

            <button
              className={styles.slideBtnRight}
              onClick={() => {
                document.getElementById("toolsSlider").scrollLeft += 300;
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
