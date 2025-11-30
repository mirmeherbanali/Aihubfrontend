
import { FormField } from "@/types/form.types";




export const toolsFields = (categories: { label: string; value: string }[]): FormField<any>[] => [
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
    placeholder: "Enter a detailed description about your tool",
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
    type: "input",
    name: "demoVideoUrl",
    label: "Demo Video (YouTube)",
    placeholder: "https://youtube.com/...",
    row: 6,
    col: 1,
  },
  {
    type: "chips",
    name: "tags",
    label: "Tags",
    placeholder: "Add tags (e.g. AI, Chatbot, Productivity)",
    row: 7,
    col: 1,
  },
  {
    type: "chips",
    name: "features",
    label: "Key Features",
    placeholder: "Add tool features",
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
    label: "Screenshots (Max 5)",
    row: 10,
    col: 1,
  },
  {
    type: "button",
    label: "",
    style: { width: 200 },
    row: 11,
    col: 1,
  },
];
