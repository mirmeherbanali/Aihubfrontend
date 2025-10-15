import { FormField } from "@/types/form.types";

export const addCategoryFields: FormField<any>[] = [
  {
    type: "input",
    name: "category",
    label: "Category Name",
    placeholder: "Enter Category name",
    row: 1,
    col: 1
  },

  // Last Name
  {
    type: "input",
    name: "slug",
    label: "Slug",
    placeholder: "Enter slug",
    row: 2,
    col: 1
  },

  {
    type: "input",
    name: "description",
    label: "Description",
    placeholder: "Enter your email",
    row: 3,
    col: 1
  }
];
