import { MetadataRoute } from "next";
import { ENV } from "@/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${ENV.APP_URL}/sitemap.xml`,
  };
}
