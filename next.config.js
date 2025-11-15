const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isDev = process.env.NODE_ENV === "development";


const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: isDev
      ? "default-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' http://ec2-98-89-29-192.compute-1.amazonaws.com:8080; img-src 'self' blob: data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
      : "default-src 'self'; connect-src 'self' http://ec2-98-89-29-192.compute-1.amazonaws.com:8080; img-src 'self' data: https:; script-src 'self'; style-src 'self';",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true, // recommended for production builds
  experimental: { appDir: true }, // if using app directory
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
});
