"use client";

import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import "./DashboardLayout.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
