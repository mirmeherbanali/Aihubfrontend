// src/lib/dashboard/review/fields/formFields.ts
import { FormField } from "@/types/form.types";

export const reviewFields = (isAdmin: boolean, toolOptions = []): FormField[] => {
  const fields: FormField[] = [
    {
      name: "rating",
      label: "Rating *",
      type: "rating",
      placeholder: "Enter rating",
    },
    {
      name: "reviewText",
      label: "Comment",
      type: "textarea",
      placeholder: "Write your feedback..."
    },
  ];

  if (isAdmin) {
    fields.unshift({
      type: "dropdown",
      name: "toolId",
      label: "Select Tool",
      options: toolOptions, // 🔥 tools injected dynamically
      row: 1,
      col: 1,
    });
  }

  fields.push({ type: "button", label: "" });

  return fields;
};
