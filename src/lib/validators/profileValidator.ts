// profileValidator.ts
import { z } from "zod";
import { FormField } from "@/types/form.types";

// ✅ Generate Zod schema dynamically from FormField array
export const generateZodSchema = (fields: FormField<any>[]) => {
  const shape: Record<string, any> = {};

  fields.forEach(field => {
    if (!field.name) return;
    switch (field.type) {
      case "input":
        shape[field.name] = z.string().min(1, `${field.label} is required`);
        break;
      case "dropdown":
        if (field.options) {
          shape[field.name] = z.enum(field.options as [string, ...string[]], { required_error: `${field.label} is required` });
        }
        break;
      default:
        shape[field.name] = z.any().optional();
    }
  });

  return z.object(shape);
};
