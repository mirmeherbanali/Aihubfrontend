import "../globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

// ─── Global / fallback SEO metadata ─────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Recuiip – AI Tool Directory",
    template: "%s | Recuiip",
  },
  description: "Discover and compare the best AI tools for every use case.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

