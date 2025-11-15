// src/lib/dashboard/tools/fields/fieldsForm.tsx
import { FormField } from "@/types/form.types";

export const reviewFields = (): FormField[] => [
  {
    name: "rating",
    label: "Rating *",
    type: "rating",
    placeholder: "Enter rating",
    min: 1,
    max: 5,
    required: true,
  },
  {
    name: "reviewText",
    label: "Comment",
    type: "textarea",
    placeholder: "Write your feedback..."
  },
  { type: "button", label: "" },
];
