"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaTools, FaUserCog, FaChartBar, FaBars, FaStar } from "react-icons/fa";
import "./DashboardLayout.scss";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { key: "tools", label: "Tools", icon: <FaTools />, tab: 1 },
    { key: "profile", label: "Profile", icon: <FaUserCog />, tab: 2 },
    { key: "analytics", label: "Analytics", icon: <FaChartBar />, tab: 3 },
    { key: "rating", label: "Rating", icon: <FaStar />, tab: 4 }
  ];

  // ✅ Reactively get current tab from URL
  const currentTab = Number(searchParams.get("tab")) || 1;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="mobile-menu-btn" onClick={() => setOpen(!open)}>
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
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
