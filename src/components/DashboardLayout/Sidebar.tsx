"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaTools,
  FaUserCog,
  FaChartBar,
  FaUsers,
  FaBars,
  FaCommentDots,
  FaBlog,
  FaBullhorn,
  FaHome
} from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import "./DashboardLayout.scss";
import { getUserType } from "@/utils/authStorage";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const [open, setOpen] = useState(false);
  const userType = getUserType();

  const roleMenuItems: Record<string, any[]> = {
    Admin: [
      { key: "home", label: "Home", tab: "1", icon: <FaHome /> },
      { key: "profile", label: "Profile", tab: "2", icon: <FaUserCog /> },
      { key: "tools", label: "Tools", tab: "3", icon: <FaTools /> },
      {
        key: "categories",
        label: "Categories",
        tab: "4",
        icon: <TbCategoryFilled />
      },
      { key: "users", label: "Users", tab: "5", icon: <FaUsers /> },
      { key: "reviews", label: "Reviews", tab: "6", icon: <FaCommentDots /> },
      { key: "blogs", label: "Blogs", tab: "7", icon: <FaBlog /> },
      {
        key: "advertisements",
        label: "Advertisements",
        tab: "8",
        icon: <FaBullhorn />
      },
      { key: "analytics", label: "Analytics", tab: "9", icon: <FaChartBar /> }
    ],

    Developer: [
      { key: "tools", label: "Tools", tab: "1", icon: <FaTools /> },
      { key: "profile", label: "Profile", tab: "2", icon: <FaUserCog /> },
      { key: "analytics", label: "Analytics", tab: "3", icon: <FaChartBar /> }
    ],

    Reviewer: [
      { key: "profile", label: "Profile", tab: "1", icon: <FaUserCog /> },
      {
        key: "rating",
        label: "Ratings & Reviews",
        tab: "2",
        icon: <FaCommentDots />
      }
    ]
  };

  const menuItems = roleMenuItems[userType || "Developer"];
  const currentTab = searchParams.get("tab") || "1";

  return (
    <>
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
