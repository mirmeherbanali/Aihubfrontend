import { z } from "zod";

const fileOrUrl = z.union([
  z.instanceof(File),
  z.string(),
  z.string().url().optional(),
  z.null(),
  z.literal(""),
]);

const validatedFileOrUrl = fileOrUrl.refine(
  (value) => {
    if (value instanceof File) {
      return value.size <= 10 * 1024 * 1024;
    }
    return true;
  },
  { message: "File must be under 10MB" }
);

export const toolsSchema = z.object({
  toolName: z.string().min(2, "Tool name is required"),

  category: z.array(z.string()).min(1, "At least one category is required"),

  shortDescription: z.string().min(10, "Short Description is too short").optional(),

  description: z.string().min(10, "Description is too short"),

  pricingType: z.enum(["Free", "Paid", "Premium"], {
    required_error: "Pricing Type is required",
  }),
  websiteUrl: z.string().url("Invalid website URL"),
  demoVideoUrl: z.string().url("Invalid demo video URL").optional(),

  tags: z.array(z.string()).optional(),
  startingPrice: z.string().optional(),
  features: z.array(z.string()).optional(),
  logo: validatedFileOrUrl.optional(),
  status: z.enum(["Pending", "Approved", "Rejected"]).optional(),
  referringDomains: z.string().optional(),
  uniqueBacklinks: z.string().optional(),
  screenshots: z.array(validatedFileOrUrl).optional(),
});

export type ToolsInput = z.infer<typeof toolsSchema>;
