import type { Metadata } from "next";
import CategoryPage from "@/components/Category/page";
import React from "react";

export const metadata: Metadata = {
  title: "AI Tool Categories – Explore & Discover by Use Case | Recuip",
  description:
    "Browse AI tools sorted by category — find top solutions for marketing, productivity, design, automation and more. Explore the best AI tools by category at Recuip.",

  robots: {
    index: true,
    follow: true,
  },

  authors: [{ name: "Recuip" }],

  alternates: {
    canonical: "https://app.recuip.com/categories",
  },

  openGraph: {
    type: "website",
    url: "https://app.recuip.com/categories",
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
    siteName: "Recuip",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Tool Categories – Explore & Discover by Use Case | Recuip",
    description:
      "Browse curated AI tool categories at Recuip to find the best solutions for your needs — from marketing and productivity to creativity and automation.",
    images: ["https://app.recuip.com/og-image.png"],
  },
};

const Page = ({ searchParams }: { searchParams: { page?: string } }) => {
  return <CategoryPage searchParams={searchParams} />;
};

export default Page;
