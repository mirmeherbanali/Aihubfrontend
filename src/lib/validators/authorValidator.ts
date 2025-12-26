import { z } from "zod";

export const authorSchema = z.object({
  authorName: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name too long"),

  authorBio: z
    .string()
    .max(500, "Bio too long")
    .optional(),

  socialLinks: z
    .array(
      z
        .string()
        .url("Enter a valid URL")
        .min(5, "Invalid social link")
    )
    .optional(),

  authorImage: z
    .any()
    .optional(), // handled as File via FormData
});

export type AuthorInput = z.infer<typeof authorSchema>;
