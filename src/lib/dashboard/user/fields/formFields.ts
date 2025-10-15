import { FormField } from "@/types/form.types";

export const addUserFields: FormField<any>[] = [
  // Company Name
  // {
  //   type: "input",
  //   name: "companyName",
  //   label: "Company Name",
  //   placeholder: "Enter your company name",
  //   row: 1,
  //   col: 1
  // },

  // First Name
  {
    type: "input",
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
    row: 1,
    col: 1
  },

  // Last Name
  {
    type: "input",
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
    row: 1,
    col: 1
  },

  {
    type: "input",
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    row: 2,
    col: 2
  },

  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    row: 3,
    col: 1
  },

  {
    type: "password",
    name: "confirmpassword",
    label: "Confirm Password",
    placeholder: "Enter Confirm Password",
    row: 4,
    col: 1
  },

  // Role Dropdown
  {
    type: "dropdown",
    name: "role",
    label: "Select Role",
    options: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
    row: 5,
    col: 1
  }
];
