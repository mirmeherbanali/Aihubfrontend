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
import { getToken } from "@/utils/authStorage";
import Loader from "@/components/Loader/Loader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  // Check for token using your authStorage utility
  useEffect(() => {
    const checkToken = () => {
      const token = getToken();
      const tokenExists = !!token;
      setHasToken(tokenExists);
      
      if (!tokenExists) {
        setShowTokenModal(true);
      }
    };

    checkToken();
  }, []);

  // Set up interval to check for token every 5 minutes
  useEffect(() => {
    if (hasToken) {
      setShowTokenModal(false);
      return;
    }

    const interval = setInterval(() => {
      const token = getToken();
      
      if (!token) {
        setShowTokenModal(true);
      } else {
        setHasToken(true);
        setShowTokenModal(false);
        clearInterval(interval);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [hasToken]);

  useEffect(() => {
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
              <Loader/>
            ) : (
              children
            )}
          </main>
          
          {/* Custom Token Modal */}
          {/* {showTokenModal && (
           <div className="token-modal-overlay">
  <div className="token-modal-container">
    <div className="token-modal-header">
      <h2>🔐 Authentication Required</h2>
      <button
        onClick={() => setShowTokenModal(false)}
        className="token-modal-close"
      >
        ×
      </button>
    </div>

    <div className="token-modal-body">
      <div className="token-card-content">
        <h3>To continue using <strong>Allisted</strong>, please log in with your
          appropriate account type:</h3>
       

        <div className="token-role-card">
          <h4>👤 Reviewer Account</h4>
          <ul>
            <li>Explore all available tools</li>
            <li>Rate and review each tool</li>
            <li>Help developers improve their creations</li>
          </ul>
        </div>

        <div className="token-role-card">
          <h4>💻 Developer Account</h4>
          <ul>
            <li>Add and manage your tools</li>
            <li>View and respond to reviewer feedback</li>
            <li>Access advanced developer-only features</li>
          </ul>
        </div>

        <div className="token-modal-footer">
          <small>
            This reminder will appear every 5 minutes until you login.
          </small>
        </div>
      </div>
    </div>
  </div>
</div>

          )} */}

          <ToastContainer position="top-right" autoClose={3000} />
          {!isDashboardPage && <Footer />}
        </ClientProviders>
      </body>
    </html>
  );
}