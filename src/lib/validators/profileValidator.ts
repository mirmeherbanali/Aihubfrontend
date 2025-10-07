import { z } from "zod";

// ✅ File schema (kept here if later you add file uploads like companyLogo)
const fileSchema = z
  .instanceof(File)
  .or(z.string())
  .optional()
  .refine(
    (file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
    "Image must be under 5MB"
  );

// ✅ Schema validation aligned with profileFields
export const profileSchema = z.object({
  companyName: z.string().min(2, "Company Name is required"),
  role: z.enum(
    ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
    { required_error: "Role is required" }
  ),
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  industry: z.enum(
    [
      "Information Technology",
      "Finance",
      "Healthcare",
      "Education",
      "E-commerce",
      "Real Estate",
      "Manufacturing",
      "Other",
    ],
    { required_error: "Industry is required" }
  ),
  country: z.enum(
    [
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
    { required_error: "Country is required" }
  ),
});

export type ProfileInput = z.infer<typeof profileSchema>;
