"use client";

import React, { useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import DynamicForm from "@/components/ui/DynamicForm";
import { toolsFields } from "@/lib/tools/fields/formFields";
import { toolsSchema, ToolsInput } from "@/lib/validators/toolsValidator";
import styles from "@/components/ui/style/ToolsPage.module.scss";

export default function ToolsPage() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tools, setTools] = useState<ToolsInput[]>([]);

  const { control, handleSubmit, reset } = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur"
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
    setEditingIndex(null);
  };

  return (
    <DashboardLayout>
      <div className={styles.pageContainer}>
        {/* === Summary Cards === */}
        <Row gutter={[16, 16]} className={styles.summaryRow}>
          <Col xs={24} sm={8}>
            <Card className={styles.summaryCard}>
              <h3>Total No. of Tools Submitted</h3>
              <p>{tools.length}</p>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className={styles.summaryCard}>
              <h3>Total No. of Ratings Received</h3>
              <p>15</p>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className={styles.summaryCard}>
              <h3>Total No. of Reviews Received</h3>
              <p>7</p>
            </Card>
          </Col>
        </Row>

        {/* === Submitted Tools Section === */}
        <section className={styles.submittedSection}>
          <h2>Submitted Tools</h2>
          <div className={styles.toolsGrid}>
            {tools.map((tool, i) => (
              <div
                key={i}
                className={`${styles.toolCard} ${
                  editingIndex === i ? styles.activeCard : ""
                }`}
                onClick={() => {
                  reset(tool);
                  setEditingIndex(i);
                }}
              >
                {tool.logo ? (
                  <img
                    src={URL.createObjectURL(tool.logo as File)}
                    alt="Tool"
                    className={styles.toolImage}
                  />
                ) : (
                  <div className={styles.placeholder}>🛠️</div>
                )}
                <p className={styles.toolName}>{tool.toolName}</p>
              </div>
            ))}

            <div className={styles.addCard} onClick={() => reset()}>
              <span>＋</span>
              <p>Submit a Tool</p>
            </div>
          </div>
        </section>

        {/* === Tool Form === */}
        <Card className={styles.formCard}>
          <DynamicForm
            fields={toolsFields}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            buttonText={editingIndex !== null ? "Update Tool" : "Add Tool"}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}
