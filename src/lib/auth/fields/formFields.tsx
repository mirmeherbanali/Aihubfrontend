import { FormField } from "@/types/form.types";
import { LoginInput,RegisterInput } from "@/lib/validators/userValidator";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";

export const loginFields: FormField<LoginInput>[] = [
  { type: "input", name: "email", label: "Email", placeholder: "Enter your email", icon: <MailOutlined /> },
  { type: "password", name: "password", label: "Password", placeholder: "Enter your password", icon: <LockOutlined /> },
  { type: "button", label: "Login" }
];

export const registerFields: FormField<RegisterInput | { confirmPassword: string }>[] = [
  { type: "input", name: "firstName", label: "First Name", placeholder: "Enter your First Name", icon: <UserOutlined /> },
  { type: "input", name: "lastName", label: "Last Name", placeholder: "Enter your Last Name ", icon: <UserOutlined  /> },
  { type: "input", name: "email", label: "Email", placeholder: "Enter your email", icon: <MailOutlined /> },
  { type: "password", name: "password", label: "Password", placeholder: "Enter your password", icon: <LockOutlined /> },
  { type: "password", name: "confirmPassword", label: "Confirm Password", placeholder: "Re-enter password", icon: <LockOutlined /> },
  { type: "button", label: "Register" }
];

