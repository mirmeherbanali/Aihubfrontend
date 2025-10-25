"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getToken, getUserId, clearAuthData, getUserType } from "@/utils/authStorage";
import { useGetProfileQuery } from "@/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = getToken();
  const userId = getUserId();
  const userType = getUserType();
  const tab = searchParams.get("tab");

  const [isChecking, setIsChecking] = useState(true);

  // ✅ Fetch profile only if token + userId exist
  const { data: profile, error, isLoading } = useGetProfileQuery(
    token && userId ? { token, userId } : skipToken
  );

  useEffect(() => {
    if (!token || !userId) {
      clearAuthData();
      router.replace("/auth/login");
      return;
    }

    // Role-based allowed tabs
    const roleTabs: { [key: string]: string[] } = {
      Developer: ["1", "2", "3", "4"], // Tools, Profile, Analytics, Rating
      Admin: ["1", "2", "5","6","7"], // Tools, Profile, Users,category,reviews
      Reviewer: ["1", "2"], // Tools, Profile
    };

    const allowedTabs = roleTabs[userType || "Reviewer"] || ["1"];

    // ✅ Redirect to first allowed tab if no tab is present or tab is invalid
    if (!tab || !allowedTabs.includes(tab)) {
      router.replace(`/dashboard?tab=${allowedTabs[0]}`);
      return;
    }

    if (error) {
      console.error("Profile fetch failed:", error);
      clearAuthData();
      router.replace("/auth/login");
      return;
    }

    if (!isLoading) {
      setIsChecking(false);
    }
  }, [token, userId, error, isLoading, router, tab, userType]);

  if (isChecking || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Verifying session...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-bold">
        Access Denied 🚫
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
