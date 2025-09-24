const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
   {
    key: "Content-Security-Policy",
    value: isDev
      ? "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:;"
      : "default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self';",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
});
