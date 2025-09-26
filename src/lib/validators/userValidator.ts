import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2, "First Name is too short"),
  lastName: z.string().min(2, "Last Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type UserInput = z.infer<typeof userSchema>;
