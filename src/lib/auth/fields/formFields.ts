import { FormField } from "@/types/form.types";
import { UserInput } from "@/lib/validators/userValidator";

// Login fields

export const loginFields: FormField<UserInput>[] = [
  {
    type: "input",
    name: "email",
    label: "Email",
    placeholder: "Enter your email"
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password"
  },
  {
    type: "button",
    label: "Login",
    wrapperStyle: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
    width: "100%",
  },
  }
];

// Register fields
export const registerFields: FormField<UserInput | { confirmPassword: string }>[] = [
  {
    type: "input",
    name: "name",
    label: "Full Name",
    placeholder: "Enter your name"
  },
  {
    type: "input",
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    type: "input",
    name: "mobile",
    label: "mobile",
    placeholder: "Enter your Mobile Number",
  },{
    type: "input",
    name: "address",
    label: "Address",
    placeholder: "Enter your Address",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
    {
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your password",
  },
  {
    type: "button",
    label: "Register",
    wrapperStyle: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
    width: "100%",
  },
  }
];

