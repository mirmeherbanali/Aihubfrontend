"use client";

import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../ui/common/Navbar";
import Footer from "../ui/common/Footer";
import "./DashboardLayout.scss";
import { useSearchParams } from "next/navigation";
import { getUserType } from "@/utils/authStorage";
import NavbarDash from "../ui/common/NavbarDash";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const userType = getUserType();

  // ✅ Current tab from URL or default
  const currentTab = searchParams.get("tab") || "1";

  // ✅ Define tab labels per role
  const getTabLabels = (role: string) => {
    switch (role) {
      case "Admin":
        return {
          "1": "Home",
          "2": "Profile",
          "3": "Tools",
          "4": "Categories",
          "5": "Users",
          "6": "Reviews",
          "7": "Blogs",
          "8": "Advertisements",
          "9": "Analytics"
        };
      case "Developer":
        return {
          "1": "Tools",
          "2": "Profile",
          "3": "Analytics"
        };
      case "Reviewer":
        return {
          "1": "Profile",
          "2": "Ratings & Reviews"
        };
      default:
        return {
          "1": "Tools",
          "2": "Profile"
        };
    }
  };

  const tabLabels = getTabLabels(userType || "");
  const pageTitle = tabLabels[currentTab] || "Dashboard";

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
