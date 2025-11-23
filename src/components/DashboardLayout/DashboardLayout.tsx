"use client";

import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Footer from "../ui/common/Footer";
import "./DashboardLayout.scss";
import NavbarDash from "../ui/common/NavbarDash";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <NavbarDash />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          {/* ✅ Optional Page Title */}
          {/* <h2 className="dashboard-title">{pageTitle}</h2> */}

          {/* ✅ Responsive Padding Wrapper */}
          <div className="dashboard-content-wrapper">{children}</div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
