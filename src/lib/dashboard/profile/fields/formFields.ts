// profileFields.ts
import { FormField } from "@/types/form.types";
import { MailOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";

export const generateProfileFields = (userType: string): FormField<any>[] => {
  const commonFields: FormField<any>[] = [
    // Row 1: First Name + Last Name + Email
    { type: "input", name: "firstName", label: "First Name", placeholder: "Enter first name", row: 1, col: 1 },
    { type: "input", name: "lastName", label: "Last Name", placeholder: "Enter last name", row: 1, col: 2 },
    { type: "input", name: "email", label: "Email", placeholder: "Enter email", row: 2, col: 3 },

    // Row 2: Industry + Country
    { type: "input", name: "industry", label: "Industry",placeholder: "Enter Industry name", row: 3, col: 1 },
    { type: "input", name: "country", label: "Country",placeholder: "Enter Country name" , row: 3, col: 2 },
  ];

  const developerFields: FormField<any>[] = [
    // Row 3: Company Info
    { type: "input", name: "companyName", label: "Company Name", placeholder: "Enter company name", row: 4, col: 1 },
    { type: "input", name: "companyEmail", label: "Company Email", placeholder: "Enter company email", row: 2, col: 2 },
    { type: "input", name: "companyWebsite", label: "Company Website", placeholder: "Enter website", row: 4, col: 3 },
  ];


  return [
    ...commonFields,
    ...(userType === "Developer" ? developerFields : []),
  ];
};
