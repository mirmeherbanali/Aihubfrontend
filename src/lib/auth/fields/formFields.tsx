import { FormField } from "@/types/form.types";
import { LoginInput,RegisterInput } from "@/lib/validators/userValidator";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";

export const loginFields: FormField<LoginInput>[] = [
  { type: "input", name: "email", label: "Email", placeholder: "Enter your email", icon: <MailOutlined /> },
  { type: "password", name: "password", label: "Password", placeholder: "Enter your password", icon: <LockOutlined /> },
  { type: "button", label: "Login" }
];

export const registerFields = (
  userType?: string
): FormField<RegisterInput>[] => [
  {
    type: "dropdown",
    name: "userType",
    label: "Role",
    options:
      userType === "Admin"
        ? ["Reviewer", "Developer", "AdminUser"]
        : ["Reviewer", "Developer"],
    value: "Reviewer",
  },

  { type: "input", name: "firstName", label: "First Name", placeholder: "Enter your First Name", icon: <UserOutlined /> },

  { type: "input", name: "lastName", label: "Last Name", placeholder: "Enter your Last Name", icon: <UserOutlined /> },

  { type: "input", name: "email", label: "Email", placeholder: "Enter your email", icon: <MailOutlined />, conditional: { field: "userType", value: ["Reviewer", "AdminUser"] } },

  // Developer-specific
  { type: "input", name: "companyName", label: "Company Name", placeholder: "Enter your company name", icon: <HomeOutlined />, conditional: { field: "userType", value: "Developer" } },

  { type: "input", name: "companyWebsite", label: "Company Website", placeholder: "Enter company website", icon: <HomeOutlined />, conditional: { field: "userType", value: "Developer" } },

  { type: "input", name: "companyEmail", label: "Company Email", placeholder: "Enter company email", icon: <MailOutlined />, conditional: { field: "userType", value: "Developer" } },

  { type: "password", name: "password", label: "Password", placeholder: "Enter your password", icon: <LockOutlined /> },

  { type: "password", name: "confirmPassword", label: "Confirm Password", placeholder: "Re-enter password", icon: <LockOutlined /> },

  { type: "button", label: "Register" }
];
