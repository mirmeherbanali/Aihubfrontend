import { z } from "zod";

// ✅ File schema (optional for future uploads)
const fileSchema = z
  .union([z.instanceof(File), z.string()])
  .optional()
  .refine(
    (file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
    { message: "Image must be under 5MB" }
  );

// ✅ Add User schema
export const addUserSchema = z
  .object({
    firstName: z.string().min(2, "First Name is required"),
    lastName: z.string().min(2, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    role: z.enum(
      ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
      { required_error: "Role is required" }
    ),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmpassword: z.string().min(6, "Confirm Password is required"),
    profileImage: fileSchema // optional field
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match"
  });

export type AddUserInput = z.infer<typeof addUserSchema>;
