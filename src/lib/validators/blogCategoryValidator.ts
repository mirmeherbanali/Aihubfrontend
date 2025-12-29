import { z } from "zod";

export const blogCategorySchema = z.object({
  categoryName: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name too long"), 
});

export type BlogCategoryInput = z.infer<typeof blogCategorySchema>;
