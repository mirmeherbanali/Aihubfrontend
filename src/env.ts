import { z } from "zod";

// Define schema for environment variables
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_KEY: z.string().min(1),
  NODE_ENV: z.enum(["development", "test", "production"]),
  ANALYZE: z.string().optional(),
});

// Parse and validate process.env
const env = envSchema.parse(process.env);

// Export typed env variables
export const ENV = {
  API_URL: env.NEXT_PUBLIC_API_URL,
  SUPABASE_KEY: env.NEXT_PUBLIC_SUPABASE_KEY,
  NODE_ENV: env.NODE_ENV,
  ANALYZE: env.ANALYZE === "true",
};
