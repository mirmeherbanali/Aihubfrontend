const crypto = require("crypto");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isDev = process.env.NODE_ENV === "development";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Generate nonce for production
function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}

// Dynamic Content Security Policy
const securityHeaders = () => {
  const nonce = generateNonce();

  return [
    {
      key: "Content-Security-Policy",
      value: isDev
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
            script-src 'self' 'nonce-${nonce}';
            style-src 'self' 'unsafe-inline';
            object-src 'none';
            base-uri 'self';
          `.replace(/\n/g, " "),
    },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

    // Expose nonce → used in _document.tsx for NextScript
    !isDev
      ? { key: "x-nonce", value: nonce }
      : { key: "x-nonce", value: "" },
  ];
};

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
        headers: securityHeaders(),
      },
    ];
  },
});
