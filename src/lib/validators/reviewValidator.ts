// src/lib/validators/reviewValidator.ts
import { z } from "zod";

export const reviewSchema = z.object({
  toolId: z.string().optional(),
  rating: z
    .number()
    .min(1, "Please give at least 1 star")
    .max(5, "You can give a maximum of 5 stars"),
  reviewText: z
    .string()
    .min(3, "Comment must be at least 3 characters long")
    .max(300, "Comment too long")
    .optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
