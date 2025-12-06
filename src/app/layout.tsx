"use client";

import { useState, useEffect,useRef } from "react";
import "../globals.css";
import Navbar from "@/components/ui/common/Navbar";
import Footer from "@/components/ui/common/Footer";
import { ClientProviders } from "./provider/ClientProviders";
import { Inter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import type { CSSProperties } from "react";

import {
  getToken,
  clearAuthData,
  getLoginTime,
  updateLoginTime,
} from "@/utils/authStorage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [showWarning, setShowWarning] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const logoutTriggered = useRef(false);

  const MAX_TIME = 30 * 60 * 1000;
  const WARNING_TIME = MAX_TIME - 25 * 60 * 1000;
  const CHECK_INTERVAL = 15 * 1000; // 15 sec

  // -----------------------------------------------------
  // ✅ 1. CHECK EXPIRED SESSION ON PAGE LOAD
  // -----------------------------------------------------
  useEffect(() => {
    const token = getToken();
    const loginTime = getLoginTime();

    if (!token || !loginTime) {
      setShowTokenModal(true);
      return;
    }

    const diff = moment().diff(moment(loginTime), "milliseconds");

    // ❗ Expire immediately if time already passed
    if (diff >= MAX_TIME) {
      clearAuthData();
      toast.error("Session expired. Please login again.");
      router.push("/auth/login");
      return;
    }
  }, []);

  // -----------------------------------------------------
  // ✅ 2. AUTO-LOGOUT + WARNING + ACTIVITY RESET
  // -----------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const token = getToken();
      const loginTime = getLoginTime();

      if (!token || !loginTime) return;

      const diff = moment().diff(moment(loginTime), "milliseconds");

      // ⚠ Show 1 min warning
      if (diff >= WARNING_TIME && diff < MAX_TIME) {
        setShowWarning(true);
      }

      // ⏳ Auto logout at MAX_TIME
      if (diff >= MAX_TIME) {
        clearAuthData();
        localStorage.setItem("logoutEvent", String(Date.now()));
        toast.error("Session expired due to inactivity.");
        router.push("/auth/login");
      }
    }, CHECK_INTERVAL);

    // Activity = reset timer
    const reset = () => {
      updateLoginTime();
      setShowWarning(false);
    };

    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, reset));

    return () => {
      clearInterval(interval);
      events.forEach((event) => window.removeEventListener(event, reset));
    };
  }, []);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "logoutEvent") {
        if (logoutTriggered.current) return; // ⛔ STOP REPEATED LOGOUT

        logoutTriggered.current = true;
        clearAuthData();
        toast.error("Logged out from another tab.");
        router.push("/auth/login");
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
 
  // -----------------------------------------------------
  const isDashboardPage = pathname?.startsWith("/dashboard");

  return (
    <html lang="en" className={inter.className}>
      <body>
        <ClientProviders>
          {!isDashboardPage && <Navbar />}

          <main style={{ minHeight: "100vh" }}>
            {/* ⚠ Warning Popup */}
            {showWarning && (
              <div style={popupStyles.overlay}>
                <div style={popupStyles.box}>
                  <h3>⚠ Session Timeout Warning</h3>
                  <p>You will be logged out in 1 minute (due to inactivity).</p>

                  <button
                    style={popupStyles.button}
                    onClick={() => {
                      updateLoginTime();
                      setShowWarning(false);
                      toast.success("Session extended.");
                    }}
                  >
                    Stay Logged In
                  </button>
                </div>
              </div>
            )}

            {children}
          </main>

          {/* 🔐 No token modal */}
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

          {!isDashboardPage && <Footer />}
          <ToastContainer position="top-right" autoClose={3000} />
        </ClientProviders>
      </body>
    </html>
  );
}

const popupStyles: {
  overlay: CSSProperties;
  box: CSSProperties;
  button: CSSProperties;
} = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999,
  },
  box: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    width: "350px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
  },
  button: {
    marginTop: "15px",
    padding: "12px 20px",
    background: "#0066ff",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};
