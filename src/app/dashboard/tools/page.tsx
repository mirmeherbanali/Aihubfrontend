"use client";

import React, { useState } from "react";
import { Row, Col, Button, Card } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicForm from "@/components/ui/DynamicForm";
import ToolCard from "@/components/ui/tool/ToolCard";
import { toolsFields } from "@/lib/tools/fields/formFields";
import { toolsSchema, ToolsInput } from "@/lib/validators/toolsValidator";
import styles from "@/components/ui/style/Tool.module.scss";

interface UpNumber {
  id: number;
  name: string;
  number: number;
}

export default function Page() {
  const [tools, setTools] = useState<ToolsInput[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolsInput | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { control, handleSubmit, reset } = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: ToolsInput) => {
    if (editingIndex !== null) {
      const updated = [...tools];
      updated[editingIndex] = data;
      setTools(updated);
    } else {
      setTools((prev) => [...prev, data]);
    }

    reset();
    setShowForm(false);
    setSelectedTool(null);
    setEditingIndex(null);
  };

  const handleEditTool = (tool: ToolsInput, index: number) => {
    reset(tool);
    setSelectedTool(tool);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleAddNew = () => {
    reset({
      toolName: "",
      shortDescription: "",
    });
    setSelectedTool(null);
    setEditingIndex(null);
    setShowForm(false);
    setTimeout(() => setShowForm(true), 0);
  };

  const upNumber: UpNumber[] = [
    { id: 1, name: "bdjfjfd", number: 2 },
    { id: 2, name: "bdjfjfd", number: 20 },
    { id: 3, name: "bdjfjfd", number: 37 },
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* Static number cards */}
      <div className={styles.gridContainer}>
        <Row gutter={[16, 16]}>
         {upNumber.map((item, index) => (
  <Col key={item.id}>
    <ToolCard
      title={item.name}
      value={item.number}
      disabled={true} // disable this card
      className={styles.upcard}
    />
  </Col>
))}

        </Row>
      </div>

      {/* Tools from form */}
      <div className={styles.gridContainer} style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]}>
          {tools.map((tool, index) => (
            <Col key={index}>
              <ToolCard
                title={tool.toolName}
                logo={tool.logo}
                onClick={() => handleEditTool(tool, index)}
                style={{ borderColor: editingIndex === index ? "#3B82F6" : undefined }}
              />
            </Col>
          ))}

          {/* Add Tool button */}
          <Col>
            <Button className={styles.addToolButton} onClick={handleAddNew}>
              <span className={styles.addIcon}>+</span>
              <span className={styles.addText}>Add Tool</span>
            </Button>
          </Col>
        </Row>
      </div>

      {/* Form section */}
      {showForm && (
        <Card className={styles.formCard}>
          <DynamicForm
            fields={toolsFields}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            buttonText={editingIndex !== null ? "Update Tool" : "Add Tool"}
          />
        </Card>
      )}
    </div>
  );
}
