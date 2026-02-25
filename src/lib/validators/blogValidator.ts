import { z } from "zod";

export const blogSchema = z.object({
  blogTitle: z
    .string()
    .min(3, "Blog title must be at least 3 characters")
    .max(150, "Blog title too long"),

  content: z
    .string()
    .min(20, "Content must be at least 20 characters"),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can contain lowercase letters, numbers, and hyphens"
    ),

  metaDescription: z
    .string()
    .max(160, "Meta description must be under 160 characters")
    .optional(),

  /* ================= AUTHOR ================= */
  author: z
    .string()
    .min(1, "At least one author is required"),

  /* ================= CATEGORY ================= */
  categories: z
    .array(z.string())
    .min(1, "At least one category is required"),

  /* ================= IMAGE ================= */
  featuredImage: z.any().optional(),

  featuredImageAltText: z
    .string()
    .max(150, "Alt text too long")
    .optional(),

  featuredImageTitleText: z
    .string()
    .max(150, "Title text too long")
    .optional(),

  /* ================= DATES ================= */
  publishedDate: z.string().optional(),
  lastModifiedDate: z.string().optional(),

  /* ================= SEO ================= */
jsonLdSchema: z
  .string()
  .optional()
  .transform((val) => {
    if (!val) return val;

    return val
      .replace(/“|”/g, '"')
      .replace(/‘|’/g, "'")
      .replace(/\t/g, "")
      .trim();
  })
  .refine((val) => {
    if (!val) return true;

    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, {
    message: "Invalid JSON format",
  }),


//   robots: z
//     .enum(["index,follow", "noindex,nofollow"])
//     .default("index,follow"),

  /* ================= ACTION ================= */

});

export type BlogInput = z.infer<typeof blogSchema>;
