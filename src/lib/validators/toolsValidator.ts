import { z } from "zod";

// ✅ File upload validator
const fileSchema = z
  .instanceof(File)
  .or(z.string())
  .optional()
  .refine(
    (file) =>
      !file || (file instanceof File && file.size <= 10 * 1024 * 1024),
    "File must be under 10MB"
  );

// ✅ Main Tools Schema (matches backend model)
export const toolsSchema = z.object({
  toolName: z.string().min(2, "Tool name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description is too short"),
  pricingType: z.enum(["Free", "Paid", "Freemium"], {
    required_error: "Pricing Type is required",
  }),
  websiteUrl: z.string().url("Invalid website URL"),
  demoVideoUrl: z.string().url("Invalid demo video URL").optional(),
  tags: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  logo: fileSchema.optional(),
  screenshots: z.array(fileSchema).optional(),
  
});

export type ToolsInput = z.infer<typeof toolsSchema>;
