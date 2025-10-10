"use client";

import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React from "react";
import ToolsPage from "@/components/Dashboard/tools/page";
import ProfilePage from "@/components/Dashboard/profile/page";
import AnalyticsPage from "@/components/Dashboard/analytics/page";
import RatingPage from "@/components/Dashboard/rating/page";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <DashboardLayout>
      <div>
        {tab === "1" && <ToolsPage />}
        {tab === "2" && <ProfilePage />}
        {tab === "3" && <AnalyticsPage />}
        {tab === "4" && <RatingPage />}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
