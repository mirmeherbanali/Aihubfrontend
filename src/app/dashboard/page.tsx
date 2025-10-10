"use client";

import React, { useState } from "react";
import { Card } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import DynamicForm from "@/components/ui/DynamicForm";
import { toolsFields } from "@/lib/dashboard/tools/fields/formFields";
import { toolsSchema, ToolsInput } from "@/lib/validators/toolsValidator";
import styles from "@/components/ui/style/ToolsPage.module.scss";
import SummaryGrid from "@/components/ui/SummaryGrid";
import GridCards from "@/components/ui/GridCards";

export default function ToolsPage() {
  const [tools, setTools] = useState<ToolsInput[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showGridForm, setShowGridForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form for editing grid data
  const gridForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
    defaultValues: {}
  });

  // Form for adding a new tool
  const addForm = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
    defaultValues: {}
  });

  const handleGridSubmit = (data: ToolsInput) => {
    if (editingIndex !== null) {
      const updated = [...tools];
      updated[editingIndex] = data;
      setTools(updated);
    }
    setEditingIndex(null);
    setShowGridForm(false);
  };

  const handleAddSubmit = (data: ToolsInput) => {
    setTools((prev) => [...prev, data]);
    addForm.reset();
    setShowAddForm(false);
  };

  const summaryItems = [
    { title: "Total No. of Tools Submitted", value: tools.length },
    { title: "Total No. of Ratings Received", value: 15 },
    { title: "Total No. of Reviews Received", value: 7 }
  ];

  const gridData = tools.map((tool, index) => ({
    id: index,
    title: tool.toolName,
    image: tool.logo instanceof File ? tool.logo : undefined,
    placeholder: "🛠️"
  }));

  return (
    <DashboardLayout>
      <div className={styles.pageContainer}>
        <SummaryGrid items={summaryItems} />

        <section className={styles.submittedSection}>
          <h2>Submitted Tools</h2>
          <GridCards
            data={gridData}
            activeIndex={editingIndex}
            onSelect={(item, index) => {
              setEditingIndex(index);
              gridForm.reset(tools[index]); // populate grid form
              setShowGridForm(true);
              setShowAddForm(false); // hide add form
            }}
            onAdd={() => {
              addForm.reset(); // clear add form
              setEditingIndex(null);
              setShowAddForm(true);
              setShowGridForm(false); // hide grid form
            }}
            addLabel="Submit a Tool"
          />
        </section>

        {/* Grid Data Form */}
        {showGridForm && editingIndex !== null && (
          <Card className={styles.formCard}>
            <DynamicForm
              fields={toolsFields}
              control={gridForm.control}
              handleSubmit={gridForm.handleSubmit}
              onSubmit={handleGridSubmit}
              buttonText="Update Tool"
            />
          </Card>
        )}

        {/* Add Tool Form */}
        {showAddForm && (
          <Card className={styles.formCard}>
            <DynamicForm
              fields={toolsFields}
              control={addForm.control}
              handleSubmit={addForm.handleSubmit}
              onSubmit={handleAddSubmit}
              buttonText="Add Tool"
            />
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
