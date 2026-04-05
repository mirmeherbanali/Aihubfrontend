import "../globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { ENV } from "@/env";

const inter = Inter({ subsets: ["latin"] });

// ─── Global / fallback SEO metadata ─────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Recuip – AI Tool Directory",
    template: "%s | Recuip",
  },
  description: "Discover and compare the best AI tools for every use case. Find trending AI tools across 100+ categories.",
  metadataBase: new URL(ENV.APP_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Recuip",
    title: "Recuip – AI Tool Directory",
    description: "Discover and compare the best AI tools for every use case.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recuip – AI Tool Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recuip – AI Tool Directory",
    description: "Discover and compare the best AI tools for every use case.",
    images: ["/og-image.png"],
  },
  keywords: [
    "AI tools",
    "AI directory",
    "best AI tools",
    "artificial intelligence",
    "AI software",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#ffffff",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

