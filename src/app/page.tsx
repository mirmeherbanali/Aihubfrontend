import type { Metadata } from "next";
import HomePage from "@/components/Home/page";
import React from "react";

export const revalidate = 3600; // ✅ ISR enabled

export const metadata: Metadata = {
  title: "Recuiip – Discover & Compare the Best AI Tools | AI Tool Directory",
  description:
    "Find and explore 1000+ AI tools for marketing, creativity, productivity, automation and more.",
};

const Page = () => {
  return <HomePage />;
};

export default Page;