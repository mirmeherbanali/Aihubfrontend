
import { FormField } from "@/types/form.types";




export const toolsFields = (
  categories: { label: string; value: string }[],
  isAdmin: boolean,
  isEditMode: boolean
): FormField<any>[] => {
  const fields: FormField<any>[] = [
    {
      type: "input",
      name: "toolName",
      label: "Tool Name",
      placeholder: "Enter tool name",
      row: 1,
      col: 1,
    },
    {
      type: "dropdown",
      name: "category",
      label: "Category",
      multiple: true,
      options: categories.map(c => ({ label: c.categoryName, value: c._id })),
      row: 2,
      col: 1,
    },
    {
      type: "textarea",
      name: "description",
      label: "Tool Description",
      placeholder: "Enter a detailed description",
      row: 3,
      col: 1,
    },
    {
      type: "dropdown",
      name: "pricingType",
      label: "Pricing Type",
      options: ["Free", "Paid", "Freemium"],
      row: 4,
      col: 1,
    },
    {
      type: "input",
      name: "websiteUrl",
      label: "Website URL",
      placeholder: "https://example.com",
      row: 5,
      col: 1,
    },
    {
      type: "chips",
      name: "tags",
      label: "Tags",
      row: 7,
      col: 1,
    },
    {
      type: "chips",
      name: "features",
      label: "Key Features",
      row: 8,
      col: 1,
    },
    {
      type: "image",
      name: "logo",
      label: "Tool Logo",
      row: 9,
      col: 1,
    },
    {
      type: "multi-image",
      name: "screenshots",
      label: "Screenshots",
      row: 10,
      col: 1,
    },
  ];

  // 👉 Add status field only if Admin + Edit Mode
  if (isAdmin && isEditMode) {
    fields.push({
      type: "dropdown",
      name: "status",
      label: "Status",
      options: ["Pending", "Approved", "Rejected"],
      row: 2,
      col: 1,
    });
  }

  // Button at last
  fields.push({
    type: "button",
    label: "",
    row: 11,
    col: 1,
  });

  return fields;
};

