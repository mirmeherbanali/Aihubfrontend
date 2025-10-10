import { FormField } from "@/types/form.types";

export const toolsFields: FormField<any>[] = [
  { type: "input", name: "toolName", label: "Tool Name", placeholder: "Enter tool name", row: 1, col: 1 },
  { type: "textarea", name: "shortDescription", label: "Short Description", placeholder: "Enter a short description", row: 2, col: 1 },
  { type: "textarea", name: "detailedDescription", label: "Detailed Description", placeholder: "Enter detailed description", row: 3, col: 1 },

  // Category
  { type: "dropdown", name: "category", label: "Category", options: ["AI", "SaaS", "Design", "Development"], row: 4, col: 1 },

  // Use Case (multi-select)
  {
    type: "dropdown",
    name: "useCases",
    label: "Use Case",
    options: ["Graphic Designing", "Video Editing", "Content Writing", "Review", "Magenta"],
    multiple: true,
    row: 5,
    col: 1
  },

  // Target Users
  { type: "dropdown", name: "targetUsers", label: "Target Users", options: ["Students", "Freelancers", "Agencies", "Companies"], row: 6, col: 1 },

  // Pricing Model
  { type: "dropdown", name: "pricingModel", label: "Pricing Model", options: ["Free", "Premium", "Subscription"], row: 7, col: 1 },

  // Monthly Price
  { type: "input", name: "monthlyPrice", label: "Monthly Starting Price (USD)", placeholder: "e.g. 19", row: 8, col: 1 },

  // Website URL
  { type: "input", name: "websiteUrl", label: "Website URL", placeholder: "https://example.com", row: 9, col: 1 },

  // 5 Key Features
  { type: "input", name: "feature1", label: "Key Feature 1", placeholder: "Enter feature", row: 10, col: 1 },
  { type: "input", name: "feature2", label: "Key Feature 2", placeholder: "Enter feature", row: 11, col: 1 },
  { type: "input", name: "feature3", label: "Key Feature 3", placeholder: "Enter feature", row: 12, col: 1 },
  { type: "input", name: "feature4", label: "Key Feature 4", placeholder: "Enter feature", row: 13, col: 1 },
  { type: "input", name: "feature5", label: "Key Feature 5", placeholder: "Enter feature", row: 14, col: 1 },

  // Product demo
  { type: "input", name: "demoLink", label: "Product Demo Video (YouTube)", placeholder: "https://youtube.com/...", row: 15, col: 1 },

  // Logo + Screenshots in the same row
  { type: "image", name: "logo", label: "Logo", row: 16, col: 1 },
  { type: "image", name: "screenshot1", label: "Screenshot 1", row: 16, col: 1 },
  { type: "image", name: "screenshot2", label: "Screenshot 2", row: 16, col: 1 },
  { type: "image", name: "screenshot3", label: "Screenshot 3", row: 16, col: 1 },

  // Submit button
  { type: "button", label: "", style: { width: 200 }, row: 17, col: 1 },
];
