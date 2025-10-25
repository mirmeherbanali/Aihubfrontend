"use client";

import { useState, useEffect } from "react";
import "antd/dist/reset.css";
import "../globals.css";
import Navbar from "@/components/ui/common/Navbar";
import { ClientProviders } from "./provider/ClientProviders";
import Footer from "@/components/ui/common/Footer";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // ✅ Remove loading state or make it instant
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only show loading for a very short time if needed
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const isDashboardPage = pathname?.startsWith("/dashboard");

  return (
    <html lang="en" className={inter.className}>
      <body>
        <ClientProviders>
          {!isDashboardPage && <Navbar />}

          <main style={{ minHeight: "100vh" }}>
            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : (
              children
            )}
          </main>
          
          <ToastContainer position="top-right" autoClose={3000} />
          {!isDashboardPage && <Footer />}
        </ClientProviders>
      </body>
    </html>
  );
}