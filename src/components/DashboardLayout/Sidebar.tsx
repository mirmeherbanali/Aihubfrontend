"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaTools,
  FaUserCog,
  FaChartBar,
  FaStar,
  FaUsers,
  FaBars,
  FaCommentDots
} from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import "./DashboardLayout.scss";
import { getUserType } from "@/utils/authStorage";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const userType = getUserType();

  // ✅ Role-based menu items
  const roleMenuItems: { [key: string]: any[] } = {
    Admin: [
      { key: "tools", label: "Tools", tab: "1", icon: <FaTools /> },
      { key: "profile", label: "Profile", tab: "2", icon: <FaUserCog /> },
      { key: "analytics", label: "Analytics", tab: "3", icon: <FaChartBar /> },
      { key: "rating", label: "Rating", tab: "4", icon: <FaStar /> },
      { key: "users", label: "Users", tab: "5", icon: <FaUsers /> },
      {
        key: "categories",
        label: "Categories",
        tab: "6",
        icon: <TbCategoryFilled />
      },
      { key: "reviews", label: "Reviews", tab: "7", icon: <FaCommentDots /> }
    ],
    Developer: [
      { key: "tools", label: "Tools", tab: "1", icon: <FaTools /> },
      { key: "profile", label: "Profile", tab: "2", icon: <FaUserCog /> },
      { key: "analytics", label: "Analytics", tab: "3", icon: <FaChartBar /> },
    ],
    Reviewer: [
      { key: "profile", label: "Profile", tab: "2", icon: <FaUserCog /> },
      { key: "rating", label: "Rating", tab: "4", icon: <FaStar /> },
      // { key: "users", label: "Users", tab: "3", icon: <FaUsers /> }
    ]
  };

  const menuItems = roleMenuItems[userType || "Developer"];

  // ✅ Get current tab from search param, default to "1" (Tools)
  const currentTab = searchParams.get("tab") || "1";

  return (
    <>
      {/* Mobile menu toggle */}
      <button className="mobile-menu-btn" onClick={() => setOpen(!open)}>
        <FaBars size={20} />
      </button>

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const isActive = currentTab === item.tab;

            return (
              <div
                key={item.key}
                className={`menu-item ${isActive ? "active" : ""}`}
                onClick={() => {
                  router.push(`/dashboard?tab=${item.tab}`);
                  setOpen(false);
                }}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
