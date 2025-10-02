import { z } from "zod";

const forbiddenDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

export const registerSchema = z
  .object({
    userType: z.enum(["Reviewer", "Developer"], { required_error: "Role is required" }),
    firstName: z.string().min(2, "First Name is too short"),
    lastName: z.string().min(2, "Last Name is too short"),
    email: z.string().email("Invalid email").optional(), // optional for Developer
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    companyName: z.string().min(2, "Company Name is required").optional(),
    companyWebsite: z.string().url("Invalid URL").optional(),
    companyEmail: z.string().email("Invalid company email").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .superRefine((data, ctx) => {
    if (data.userType === "Developer") {
      // Developer email is optional, check companyEmail instead
      if (!data.companyEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyEmail"],
          message: "Company Email is required for Developers",
        });
      } else {
        // check forbidden domains for companyEmail
        const domain = data.companyEmail.split("@")[1]?.toLowerCase();
        if (!domain || forbiddenDomains.includes(domain)) {
          const formattedDomain = domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : "This domain";
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["companyEmail"],
            message: `${formattedDomain} is not allowed for Developers, please use your company email`,
          });
        }
      }

      // Require company details
      if (!data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyName"],
          message: "Company Name is required for Developers",
        });
      }
      if (!data.companyWebsite) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyWebsite"],
          message: "Company Website is required for Developers",
        });
      }

      // email field is optional for Developers
    } else {
      // Reviewer: email is required
      if (!data.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Email is required for Reviewers",
        });
      }
    }
  });

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
