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

  console.log("USER-Type", userType);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          {tab === "1" && userType === null ? (
            <AdminTools />
          ) : (
            tab === "1" && <ToolsPage />
          )}
          {tab === "2" && <ProfilePage />}
          {tab === "3" && userType === null && <AnalyticsPage />}
          {tab === "4" && userType === null && <RatingPage />}
          {tab === "5" && userType === null && <UserPage />}
          {tab === "6" && userType === null && <CategoryPage />}
          {tab === "7" && userType === null && <Reviews />}

          {/* {tab === "5" && userType === "Developer" && <UserPage />} */}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
