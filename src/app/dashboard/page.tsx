"use client";

import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React from "react";
import ToolsPage from "@/components/Dashboard/tools/page";
import ProfilePage from "@/components/Dashboard/profile/page";
import AnalyticsPage from "@/components/Dashboard/analytics/page";
import RatingPage from "@/components/Dashboard/rating/page";
import UserPage from "@/components/Dashboard/user/page";
import ProtectedRoute from "../ProtectedRoute";
import { getUserType } from "@/utils/authStorage";
import AdminTools from "@/components/Dashboard/tools/adminTools";
import CategoryPage from "@/components/Dashboard/categories/page";
import Reviews from "@/components/Dashboard/reviews/page";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const userType = getUserType();

  // ✅ Default to tab "1" (Tools) if not present
  const tab = searchParams.get("tab") || "1";

  // console.log("USER-Type", userType);

  const renderTabContent = () => {
  switch (tab) {
    case "1":
      if (userType === "Admin") return <AdminTools />;
      return <ToolsPage />;

    case "2":
      return <ProfilePage />;

    case "3":
      if (userType === "Developer") return <AnalyticsPage />;
      return null;

    case "4":
      if (userType === "Reviewer") return <RatingPage />;
      return null;

    case "5":
      if (userType === "Admin") return <UserPage />;
      return null;

    case "6":
      if (userType === "Admin") return <CategoryPage />;
      return null;

    case "7":
      if (userType === "Admin") return <Reviews />;
      return null;

    default:
      return null;
  }
};


  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
{renderTabContent()}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
