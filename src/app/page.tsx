import type { Metadata } from "next";
import HomePage from "@/components/Home/page";
import React from "react";


export const metadata: Metadata = {
  title: "Recuiip – Discover & Compare the Best AI Tools | AI Tool Directory",
  description:
    "Find and explore 1000+ AI tools for marketing, creativity, productivity, automation and more. Browse top AI categories, trending tools, and in-depth insights at Recuiip.",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://app.recuiip.com/",
  },

  openGraph: {
    type: "website",
    url: "https://app.recuiip.com/",
    title: "Recuiip – Discover & Compare the Best AI Tools",
    description:
      "Explore 1000+ AI tools across categories like marketing, productivity, automation, and creativity. Discover trending AI tools on Recuiip.",
    images: [
      {
        url: "https://app.recuiip.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recuiip AI Tools",
      },
    ],
    siteName: "Recuiip",
  },

  twitter: {
    card: "summary_large_image",
    title: "Recuiip – Discover & Compare the Best AI Tools",
    description:
      "Browse, compare, and discover the best AI tools for every use case. Find trending and curated AI tools at Recuiip.",
    images: ["https://app.recuiip.com/og-image.png"],
  },
};

const Page = () => {
  return <HomePage />;
};

export default Page;
