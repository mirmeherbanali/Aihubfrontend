"use client";

import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import "./DashboardLayout.scss";
import Navbar from "../ui/common/Navbar";
import Footer from "../ui/common/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* Top Header */}
      <Navbar />

      <div className="dashboard-body">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="dashboard-content">
          {children}
          {/* ✅ Footer inside main content */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
