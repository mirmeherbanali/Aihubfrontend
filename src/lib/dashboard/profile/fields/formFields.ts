import { FormField } from "@/types/form.types";

export const profileFields: FormField<any>[] = [
  // Company Name
  {
    type: "input",
    name: "companyName",
    label: "Company Name",
    placeholder: "Enter your company name",
    row: 1,
    col: 1,
  },

  // First Name
  {
    type: "input",
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
    row: 2,
    col: 1,
  },

  // Last Name
  {
    type: "input",
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
    row: 2,
    col: 1,
  },
 // Role Dropdown
  {
    type: "dropdown",
    name: "role",
    label: "Select Role",
    options: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
    row: 3,
    col: 2,
  },
  // Email
  {
    type: "input",
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    row: 4,
    col: 2,
  },

  // Industry Dropdown
  {
    type: "dropdown",
    name: "industry",
    label: "Industry",
    options: [
      "Information Technology",
      "Finance",
      "Healthcare",
      "Education",
      "E-commerce",
      "Real Estate",
      "Manufacturing",
      "Other",
    ],
    row: 5,
    col: 1,
  },

  // Country Dropdown
  {
    type: "dropdown",
    name: "country",
    label: "Country",
    options: [
      "India",
      "United States",
      "Canada",
      "United Kingdom",
      "Germany",
      "Australia",
      "France",
      "Japan",
      "China",
      "Other",
    ],
    row: 5,
    col: 1,
  },

];
