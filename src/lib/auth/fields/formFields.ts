import { FormField } from "@/types/form.types";
import { UserInput } from "@/lib/validators/userValidator";

// Login fields
export const loginFields: FormField<UserInput>[] = [
  { type: "input", name: "email", placeholder: "Email", label: "Email" },
  { type: "password", name: "password", placeholder: "Password", label: "Password" },
  { type: "button", label: "Login" }, // ✅ no `name`
];

// Register fields
export const registerFields: FormField<UserInput>[] = [
  { type: "input", name: "name", placeholder: "Name", label: "Name" },
  { type: "input", name: "email", placeholder: "Email", label: "Email" },
  { type: "password", name: "password", placeholder: "Password", label: "Password" },
  { type: "button", label: "Register" },
];
