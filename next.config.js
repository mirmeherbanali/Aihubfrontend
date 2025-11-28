/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const crypto = require("crypto");

function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = () => {
  const nonce = generateNonce();

  return [
    {
      key: "Content-Security-Policy",
      value: isDev
        ? `
          default-src 'self' 'unsafe-inline' 'unsafe-eval';
          connect-src 'self' https://recuip.com;
          img-src 'self' blob: data: https:;
          script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:;
          style-src 'self' 'unsafe-inline';
        `.replace(/\s{2,}/g, " ").trim()
        : `
          default-src 'self';

          script-src 
            'self'
            'nonce-${nonce}'
            https://app.recuip.com
            blob:;

          script-src-elem 
            'self'
            'unsafe-inline'
            https://app.recuip.com
            blob:;

          style-src 'self' 'unsafe-inline';
          img-src 'self' data: https:;
          connect-src 'self' https://recuip.com;
          object-src 'none';
          base-uri 'self';
        `.replace(/\s{2,}/g, " ").trim(),
    },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  ];
};

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders(),
      },
    ];
  },
});
