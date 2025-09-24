const { z } = require("zod");

// Define schema
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_KEY: z.string().min(1),
  NODE_ENV: z.enum(["development", "test", "production"]),
  ANALYZE: z.string().optional()
});

// Parse
try {
  envSchema.parse(process.env);
  console.log("✅ Environment variables validated successfully.");
} catch (error) {
  console.error("❌ Invalid environment variables:", error.errors);
  process.exit(1);
}
