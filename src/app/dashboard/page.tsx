"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
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
  const searchParams = useSearchParams()!;   // ← FIXED
  const router = useRouter();

  const [userType, setUserType] = useState<string | null>(null);

  const tab = searchParams.get("tab") || "1";

  // ✅ Check user immediately (no loading state)
  useEffect(() => {
    const storedType = getUserType();

    if (!storedType) {
      // 🚀 Instant redirect — prevents UI from flashing
      router.replace("/auth/login");
      return;
    }

    setUserType(storedType);

    // ✅ Ensure tab query always exists
    if (!searchParams.get("tab")) {
      router.replace("/dashboard?tab=1");
    }
  }, []);

  // ✅ Don’t render anything while redirecting
  if (!userType) return null;

  // ✅ Admin Tabs
  const renderAdminTabs = () => {
    switch (tab) {
      case "1":
        return <div>🏠 Home Dashboard</div>;
      case "2":
        return <ProfilePage />;
      case "3":
        return <AdminTools />;
      case "4":
        return <CategoryPage />;
      case "5":
        return <UserPage />;
      case "6":
        return <Reviews />;
      case "7":
        return <div>📝 Blogs Management</div>;
      case "8":
        return <div>📢 Advertisements Management</div>;
      case "9":
        return <AnalyticsPage />;
      default:
        return <div>Invalid Tab — Please select from sidebar</div>;
    }
  };

  // ✅ Role-Based Tabs
  const renderTabContent = () => {
    switch (userType) {
      case "Admin":
        return renderAdminTabs();
      case "Developer":
        switch (tab) {
          case "1":
            return <ToolsPage />;
          case "2":
            return <ProfilePage />;
          case "3":
            return <AnalyticsPage />;
          default:
            return <ToolsPage />;
        }
      case "Reviewer":
        switch (tab) {
          case "1":
            return <ProfilePage />;
          case "2":
            return <RatingPage />;
          default:
            return <ProfilePage />;
        }
      default:
        return <ToolsPage />;
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>{renderTabContent()}</DashboardLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
