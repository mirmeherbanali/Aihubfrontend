import { z } from "zod";

// ======================
// 1️⃣ Server-only environment schema
// ======================
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_SUPABASE_KEY: z.string().min(1),
});

// ======================
// 2️⃣ Client-safe environment schema
// ======================
const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  ANALYZE: z.string().optional(),
});

// ======================
// 3️⃣ Parse environment variables safely
// ======================

// Server-side parsing (only on Node.js)
const serverEnv =
  typeof window === "undefined"
    ? serverEnvSchema.parse(process.env)
    : undefined;

// Client-side parsing (only NEXT_PUBLIC_* variables)
const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  ANALYZE: process.env.NEXT_PUBLIC_ANALYZE,
});

// ======================
// 4️⃣ Export typed ENV object
// ======================
export const ENV = {
  // Server-only vars
  NODE_ENV: serverEnv?.NODE_ENV ?? "development", // fallback for client
  SUPABASE_KEY: serverEnv?.NEXT_PUBLIC_SUPABASE_KEY ?? "", // fallback for client

  // Client-safe vars
  API_URL: clientEnv.NEXT_PUBLIC_API_URL,
  ANALYZE: clientEnv.ANALYZE === "true",
};

// ======================
// 5️⃣ Convenience flags
// ======================
export const IS_DEV = ENV.NODE_ENV === "development";
export const IS_PROD = ENV.NODE_ENV === "production";
export const IS_TEST = ENV.NODE_ENV === "test";
