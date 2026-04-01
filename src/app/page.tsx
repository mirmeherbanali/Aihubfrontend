import type { Metadata } from "next";
import HomePage from "@/components/Home/page";
import React from "react";
import { ENV } from "@/env";

export const revalidate = 3600; // ✅ ISR enabled

export const metadata: Metadata = {
  // ─── Basic ────────────────────────────────────────────────────────────────
  title: "Recuip – Discover & Compare the Best AI Tools | AI Tool Directory",
  description:
    "Find and explore 1000+ AI tools for marketing, creativity, productivity, automation and more. Browse top AI categories, trending tools, and in-depth insights at Recuip.",

  // ─── Author ───────────────────────────────────────────────────────────────
  authors: [{ name: "Recuip" }],

  // ─── Canonical ────────────────────────────────────────────────────────────
  alternates: {
    canonical: `${ENV.APP_URL}/`,
  },

  // ─── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
  },

  // ─── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // ─── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: `${ENV.APP_URL}/`,
    siteName: "Recuip",
    title: "Recuip – Discover & Compare the Best AI Tools",
    description:
      "Explore 1000+ AI tools across categories like marketing, productivity, automation, and creativity. Discover trending AI tools on Recuip.",
    images: [
      {
        url: `${ENV.APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Recuip – AI Tool Directory",
      },
    ],
    locale: "en_US",
  },

  // ─── Twitter Card ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Recuip – Discover & Compare the Best AI Tools",
    description:
      "Browse, compare, and discover the best AI tools for every use case. Find trending and curated AI tools at Recuip.",
    images: [`${ENV.APP_URL}/og-image.png`],
  },

  // ─── Keywords ─────────────────────────────────────────────────────────────
  keywords: [
    "AI tools",
    "AI directory",
    "best AI tools",
    "AI tools for marketing",
    "AI tools for productivity",
    "AI tools for developers",
    "AI image generation",
    "AI writing tools",
    "AI automation",
    "artificial intelligence tools",
  ],
};

const Page = () => {
  return <HomePage />;
};

export default Page;