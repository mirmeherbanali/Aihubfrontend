import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer, dev }) {
    if (dev) {
    }
    if (isServer) {
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/old-page",
        destination: "/new-page",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "images.pexels.com",
      "dragon-customer-staging.s3.amazonaws.com",
      "dragon-customer-staging.s3.eu-west-2.amazonaws.com"
    ],
  },
};

export default nextConfig;