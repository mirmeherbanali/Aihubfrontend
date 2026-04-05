import type { Metadata } from "next";
import CategoryPage from "@/components/Category/page";
import React from "react";

export const revalidate = 3600; // ✅ ISR enabled

export const metadata: Metadata = {
  // ─── Basic ────────────────────────────────────────────────────────────────
  title: "AI Tool Categories – Explore & Discover by Use Case | Recuip",
  description:
    "Browse AI tools sorted by category — find top solutions for marketing, productivity, design, automation and more. Explore the best AI tools by category at Recuip.",

  // ─── Author ───────────────────────────────────────────────────────────────
  authors: [{ name: "Recuip" }],

  // ─── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
  },

  // ─── Canonical ────────────────────────────────────────────────────────────
  alternates: {
    canonical: "https://app.recuip.com/categories",
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
    url: "https://app.recuip.com/categories",
    siteName: "Recuip",
    title: "AI Tool Categories – Explore & Discover by Use Case | Recuip",
    description:
      "Explore AI tools by category. Navigate through curated AI tool categories like marketing, automation, productivity, design, and more on Recuip.",
    images: [
      {
        url: "https://app.recuip.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recuip AI Tool Categories",
      },
    ],
    locale: "en_US",
  },

  // ─── Twitter Card ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "AI Tool Categories – Explore & Discover by Use Case | Recuip",
    description:
      "Browse curated AI tool categories at Recuip to find the best solutions for your needs — from marketing and productivity to creativity and automation.",
    images: ["https://app.recuip.com/og-image.png"],
  },

  // ─── Keywords ─────────────────────────────────────────────────────────────
  keywords: [
    "AI tool categories",
    "best AI tools by category",
    "AI marketing tools",
    "AI productivity tools",
    "AI design tools",
    "AI automation tools",
    "AI tool directory",
    "explore AI tools",
  ],

  // ─── Other ────────────────────────────────────────────────────────────────
  other: {
    "twitter:url": "https://app.recuip.com/categories",
  },
};

const Page = ({ searchParams }: { searchParams: { page?: string } }) => {
  return <CategoryPage searchParams={searchParams} />;
};

export default Page;
