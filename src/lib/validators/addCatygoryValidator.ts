import { z } from "zod";

// ✅ Add User schema
export const addCategorySchema = z.object({
  category: z.string().min(2, "First Name is required"),
  slug: z.string().min(2, "Last Name is required"),
  description: z.string().email("Invalid email address")
});

export type AddCategoryInput = z.infer<typeof addCategorySchema>;
