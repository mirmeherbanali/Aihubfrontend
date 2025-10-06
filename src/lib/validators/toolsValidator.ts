import { z } from "zod";

const fileSchema = z
  .instanceof(File)
  .or(z.string())
  .optional()
  .refine(
    (file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
    "Image must be under 5MB"
  );


export const toolsSchema = z.object({
  toolName: z.string().min(2, "Tool Name is required"),
  shortDescription: z.string().min(10, "Short description is too short"),
  detailedDescription: z.string().min(20, "Detailed description is too short"),

  category: z.string().nonempty("Category is required"),
  useCases: z.array(z.string()).min(1, "At least one Use Case is required"),
  targetUsers: z.string().nonempty("Target User is required"),

  pricingModel: z.enum(["Free", "Premium", "Subscription"], {
    required_error: "Pricing model is required",
  }),

  monthlyPrice: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Monthly Price must be a number",
    }),

  websiteUrl: z.string().url("Invalid website URL"),

  feature1: z.string().optional(),
  feature2: z.string().optional(),
  feature3: z.string().optional(),
  feature4: z.string().optional(),
  feature5: z.string().optional(),

  demoLink: z.string().url("Invalid YouTube link").optional(),

  // Image fields just placeholders for now (can refine later)
  logo: fileSchema,
  screenshot1: fileSchema,
  screenshot2: fileSchema,
  screenshot3: fileSchema,
});

export type ToolsInput = z.infer<typeof toolsSchema>;
