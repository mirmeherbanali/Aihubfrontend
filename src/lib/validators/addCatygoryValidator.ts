import { z } from "zod";

// Category schema with FAQ support and status
export const addCategorySchema = z.object({
  adminId:z.string().optional(),
  categoryName: z.string().min(2, "Category name is required"),
  slug: z.string().min(2, "Slug is required"),
  categoryDescription: z.string().min(2, "Description is required"),
  faqs: z
    .array(
      z.object({
        question: z.string().min(2, "Question is required"),
        answer: z.string().min(2, "Answer is required"),
      })
    )
    .optional(),
  status: z.enum(["Active", "Inactive", "Deleted"]).optional(),
});

export type AddCategoryInput = z.infer<typeof addCategorySchema>;
