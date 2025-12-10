import { FormField } from "@/types/form.types";

export const reviewFields = (
  isAdmin: boolean,
  toolOptions = [],
  isEditMode = false
): FormField[] => {
  const fields: FormField[] = [];

  if (isAdmin) {
    fields.push({
      type: "dropdown",
      name: "toolId",
      label: "Select Tool",
      options: toolOptions,
      disabled: isEditMode, 
    });
  }

  fields.push({
    name: "rating",
    label: "Rating *",
    type: "rating",
  });

  fields.push({
    name: "reviewText",
    label: "Comment",
    type: "textarea",
    placeholder: "Write your feedback...",
  });

  if (isEditMode) {
    fields.push({
      type: "dropdown",
      name: "status",
      label: "Status",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Rejected", value: "Rejected" },
      ],
    });
  }

  fields.push({ type: "button", label: "" });

  return fields;
};
