import { FormField } from "@/types/form.types";

export const toolsFields: FormField<any>[] = [
  { type: "input", name: "toolName", label: "Tool Name", placeholder: "Enter tool name" },
  { type: "textarea", name: "shortDescription", label: "Short Description", placeholder: "Enter a short description" },
  { type: "textarea", name: "detailedDescription", label: "Detailed Description", placeholder: "Enter detailed description" },

  // Category
  { type: "dropdown", name: "category", label: "Category", options: ["AI", "SaaS", "Design", "Development"] },

  // Use Case (multi-select)
  {
    type: "dropdown",
    name: "useCases",
    label: "Use Case",
    options: ["Graphic Designing", "Video Editing", "Content Writing", "Review", "Magenta"],
    multiple: true
  },

  // Target Users
  { type: "dropdown", name: "targetUsers", label: "Target Users", options: ["Students", "Freelancers", "Agencies", "Companies"] },

  // Pricing Model
  { type: "dropdown", name: "pricingModel", label: "Pricing Model", options: ["Free", "Premium", "Subscription"] },

  // Monthly Price
  { type: "input", name: "monthlyPrice", label: "Monthly Starting Price (USD)", placeholder: "e.g. 19" },

  // Website URL
  { type: "input", name: "websiteUrl", label: "Website URL", placeholder: "https://example.com" },

  // 5 Key Features
  { type: "input", name: "feature1", label: "Key Feature 1", placeholder: "Enter feature" },
  { type: "input", name: "feature2", label: "Key Feature 2", placeholder: "Enter feature" },
  { type: "input", name: "feature3", label: "Key Feature 3", placeholder: "Enter feature" },
  { type: "input", name: "feature4", label: "Key Feature 4", placeholder: "Enter feature" },
  { type: "input", name: "feature5", label: "Key Feature 5", placeholder: "Enter feature" },

  // Product demo
  { type: "input", name: "demoLink", label: "Product Demo Video (YouTube)", placeholder: "https://youtube.com/..." },

  // Logo + Screenshots
  { type: "image", name: "logo", label: "Logo"},
{ type: "image", name: "screenshot1", label: "Screenshot 1" },
{ type: "image", name: "screenshot2", label: "Screenshot 2"},
{ type: "image", name: "screenshot3", label: "Screenshot 3"},


  // Submit
  { type: "button", label: "Submit" },
];
