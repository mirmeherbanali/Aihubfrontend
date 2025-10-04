"use client";
import { Card, Typography } from "antd";
import DynamicForm from "@/components/ui/DynamicForm";
import { toolsFields } from "@/lib/tools/fields/formFields";
import { toolsSchema, ToolsInput } from "@/lib/validators/toolsValidator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const { Title } = Typography;

export default function ToolsPage() {
  const { control, handleSubmit } = useForm<ToolsInput>({
    resolver: zodResolver(toolsSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: ToolsInput) => {
    console.log("✅ Form Submitted:", data);
    // 🚀 send to backend API here
  };

  return (
  <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f6fa",
      }}
    >
      <Card
        style={{
          width: 420,
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Fill Your Details
        </Title>

        <DynamicForm
          fields={toolsFields}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          buttonText="Submit"
        />
      </Card>
    </div>

  );
}
