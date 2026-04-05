"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/ui/common/Navbar";
import Footer from "@/components/ui/common/Footer";
import { ClientProviders } from "./provider/ClientProviders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";

import {
  getToken,
  clearAuthData,
  getLoginTime,
  updateLoginTime,
} from "@/utils/authStorage";
import JsDetector from "./JsDetector";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [showWarning, setShowWarning] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const logoutTriggered = useRef(false);

  const MAX_TIME = 30 * 60 * 1000;
  const WARNING_TIME = MAX_TIME - 25 * 60 * 1000;
  const CHECK_INTERVAL = 15 * 1000; // 15 sec

  // ✅ 1. CHECK EXPIRED SESSION ON PAGE LOAD
  useEffect(() => {
    const token = getToken();
    const loginTime = getLoginTime();

    if (!token || !loginTime) {
      setShowTokenModal(true);
      return;
    }

    const diff = moment().diff(moment(loginTime), "milliseconds");

    if (diff >= MAX_TIME) {
      clearAuthData();
      toast.error("Session expired. Please login again.");
      router.push("/auth/login");
      return;
    }
  }, []);

  // ✅ 2. AUTO-LOGOUT + WARNING + ACTIVITY RESET
  useEffect(() => {
    const interval = setInterval(() => {
      const token = getToken();
      const loginTime = getLoginTime();

      if (!token || !loginTime) return;

      const diff = moment().diff(moment(loginTime), "milliseconds");

      if (diff >= WARNING_TIME && diff < MAX_TIME) {
        setShowWarning(true);
      }

      if (diff >= MAX_TIME) {
        clearAuthData();
        localStorage.setItem("logoutEvent", String(Date.now()));
        toast.error("Session expired due to inactivity.");
        router.push("/auth/login");
      }
    }, CHECK_INTERVAL);

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

  // ✅ 3. CROSS-TAB LOGOUT SYNC
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "logoutEvent") {
        if (logoutTriggered.current) return;
        logoutTriggered.current = true;
        clearAuthData();
        toast.error("Logged out from another tab.");
        router.push("/auth/login");
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const isDashboardPage = pathname?.startsWith("/dashboard");

  return (
    <ClientProviders>
      {!isDashboardPage && <Navbar />}

      <main style={{ minHeight: "100vh" }}>
        <JsDetector />
        {children}
      </main>

      {!isDashboardPage && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </ClientProviders>
  );
}
