"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getToken,
  getUserId,
  clearAuthData,
  getUserType
} from "@/utils/authStorage";
import { useGetProfileQuery } from "@/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const token = getToken();
  const userId = getUserId();
  const userType = getUserType();
  const tab = searchParams.get("tab");

  const [isChecking, setIsChecking] = useState(true);

  // ✅ Fetch profile in background — don't block UI
  const { data: profile, isLoading, isError, error } = useGetProfileQuery(
    token && userId ? { token, userId } : skipToken,
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  // ✅ Allow instant UI load if token exists
  useEffect(() => {
    if (token && userId) setIsChecking(false);
  }, [token, userId]);

  // ✅ Handle token absence or role-based access
  useEffect(() => {
    if (!token || !userId) {
      clearAuthData();
      router.replace("/auth/login");
      return;
    }

    // 🎯 Role-based allowed tabs
    const roleTabs: Record<string, string[]> = {
      Admin: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      Developer: ["1", "2", "3"], // Example: Tools, Profile, Analytics
      Reviewer: ["1", "2"],       // Example: Profile, Ratings
    };

    const allowedTabs = roleTabs[userType || "Reviewer"] || ["1"];

    // 🧭 Redirect to default tab if invalid or missing
    // if (!tab || !allowedTabs.includes(tab)) {
    //   router.replace(`/dashboard?tab=${allowedTabs[0]}`);
    //   return;
    // }

    // 🚨 Handle profile fetch errors
    if (isError) {
      console.error("Profile fetch failed:", error);
      clearAuthData();
      router.replace("/auth/login");
      return;
    }

    if (!isLoading) setIsChecking(false);
  }, [token, userId, isLoading, isError, error, router, tab, userType]);

  // ✅ Don't block UI while verifying
  if (isLoading && !profile) return <>{children}</>;

  // 🚫 If API failed or no profile (should rarely happen)
  if (isError || !profile) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-bold">
        Access Denied 🚫
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
