"use client";

import { useState, useEffect } from "react";
import "antd/dist/reset.css";
import "../globals.css";
import Navbar from "@/components/ui/common/Navbar";
import { ClientProviders } from "./provider/ClientProviders";
import Footer from "@/components/ui/common/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aidirectory",
  description: "Your AI-powered directory solution",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#007acc"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate page load
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={inter.className}>
      <body>
        {loading ? (
          <div className="loader-container">
            <div className="spinner" />
          </div>
        ) : (
          <ClientProviders>
            <Navbar />
            <main style={{ minHeight: "100vh" }}>{children}</main>
            <Footer />
          </ClientProviders>
        )}

        <style jsx>{`
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .spinner {
            width: 60px;
            height: 60px;
            border: 6px solid #ddd;
            border-top: 6px solid #007acc;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </body>
    </html>
  );
}
