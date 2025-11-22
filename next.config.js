const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isDev = process.env.NODE_ENV === "development";
const API_URL = process.env.NEXT_PUBLIC_API_URL; // dynamic from env

// Dynamic Content Security Policy
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      isDev
        ? `
          default-src 'self' 'unsafe-inline' 'unsafe-eval';
          connect-src 'self' ${API_URL};
          img-src 'self' blob: data: https:;
          script-src 'self' 'unsafe-inline' 'unsafe-eval';
          style-src 'self' 'unsafe-inline';
        `.replace(/\n/g, " ")
        : `
          default-src 'self';
          connect-src 'self' ${API_URL};
          img-src 'self' data: https:;
          script-src 'self';
          style-src 'self';
        `.replace(/\n/g, " "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
});
