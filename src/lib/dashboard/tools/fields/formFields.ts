
import { FormField } from "@/types/form.types";




export const toolsFields = (
  categories: {
    _id: any;
    categoryName: any; label: string; value: string 
}[],
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
      name: "shortDescription",
      label: "Short Description",
      placeholder: "Enter a Short  description",
      row: 3,
      col: 1,
    },
    {
      type: "textarea",
      name: "description",
      label: "Tool Description",
      placeholder: "Enter a detailed description",
      row: 4,
      col: 1,
    },
    {
      type: "dropdown",
      name: "pricingType",
      label: "Pricing Type",
      options: ["Free", "Paid", "Premium"],
      row: 5,
      col: 1,
    },
    {
      type: "input",
      name: "startingPrice",
      label: "Monthly Starting Price( in USD )",
      placeholder: "Enter Price",
      row: 6,
      col: 1,
    },
    {
      type: "input",
      name: "websiteUrl",
      label: "Website URL",
      placeholder: "https://example.com",
      row: 7,
      col: 1,
    },
    // {
    //   type: "chips",
    //   name: "tags",
    //   label: "Tags",
    //   row: 7,
    //   col: 1,
    // },
     {
      type: "input",
      name: "demoVideoUrl ",
      label: "Product Demo Video YouTube Link",
      row: 8,
      col: 1,
    },
    {
      type: "chips",
      name: "features",
      label: "Key Features",
      row: 9,
      col: 1,
    },
    {
      type: "image",
      name: "logo",
      label: "Tool Logo",
      row: 12,
      col: 1,
    },
    {
      type: "multi-image",
      name: "screenshots",
      label: "Screenshots",
      row: 13,
      col: 1,
    },
  ];

  // 👉 Add status field only if Admin + Edit Mode
if (isAdmin && isEditMode) {
  fields.push(
    {
      type: "dropdown",
      name: "status",
      label: "Status",
      options: ["Pending", "Approved", "Rejected"],
      row: 2,
      col: 1,
    },
    {
      type: "input",
      name: "referringDomains",
      label: "Referring Domains",
      placeholder: "Enter referring domains",
      row: 10,
      col: 1,
    },
    {
      type: "input",
      name: "uniqueBacklinks",
      label: "Unique Backlinks",
      placeholder: "Enter unique backlinks",
      row: 11,
      col: 1,
    }
  );
}

  // Button at last
  fields.push({
    type: "button",
    label: "",
    row: 14,
    col: 1,
  });

  return fields;
};

