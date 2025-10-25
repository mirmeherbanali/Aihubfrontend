"use client";

import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../ui/common/Navbar";
import Footer from "../ui/common/Footer";
import "./DashboardLayout.scss";
import { useSearchParams } from "next/navigation";
import { getUserType } from "@/utils/authStorage";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const userType = getUserType();

  // ✅ Get current tab, default to "1" (Tools)
  const currentTab = searchParams.get("tab") || "1";
  const getTabLabels = (userType: string): Record<string, string> => {
  switch (userType) {
    case "Developer":
      return {
        "1": "Tools",
        "2": "Profile",
        "3": "Analytics",
        "4": "Rating",
      };
    case "Admin":
      return {
        "1": "Tools",
        "2": "Profile",
        "5": "Users",
        "6": "Category",
        "7": "Reviews",
      };
    case "Reviewer":
      return {
        "1": "Tools",
        "2": "Profile",
      };
    default:
      return {
        "1": "Tools",
        "2": "Profile",
      };
  }
};


  // Map tab numbers to page names
  const tabLabels = getTabLabels(userType ?? "");

  const pageTitle = tabLabels[currentTab] || "Dashboard";

  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          {/* ✅ Dynamic page title */}
          {/* <h2 className="dashboard-title">{pageTitle}</h2> */}

          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
