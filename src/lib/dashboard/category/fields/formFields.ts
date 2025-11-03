import { FormField } from "@/types/form.types";

export const addCategoryFields: FormField<any>[] = [
  {
    type: "input",
    name: "categoryName",
    label: "Category Name",
    placeholder: "Enter category name",
    row: 1,
    col: 1,
  },
  {
    type: "input",
    name: "slug",
    label: "Slug",
    placeholder: "Enter unique slug (e.g., home-services)",
    row: 2,
    col: 1,
  },
  {
    type: "textarea",
    name: "categoryDescription",
    label: "Description",
    placeholder: "Enter category description",
    row: 3,
    col: 1,
  },
  {
    type: "faq",
    name: "faqs",
    label: "FAQs",
    row: 4,
    col: 1,
  },
  {
    type: "dropdown",
    name: "status",
    label: "Status",
    placeholder: "Select Status",
    options: [
      "Active",
      "Inactive",
      "Deleted",
    ],
    row: 5,
    col: 1,
  },
  {
    type: "button",
    label: "",
    style: { width: 200 },
    row: 6,
    col: 1,
  },
];
