"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaTools, FaUserCog, FaChartBar, FaBars, FaStar } from "react-icons/fa";
import "./DashboardLayout.scss";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      key: "tools",
      label: "Tools",
      icon: <FaTools />,
      path: "/dashboard/tools"
    },
    {
      key: "profile",
      label: "Profile",
      icon: <FaUserCog />,
      path: "/dashboard/profile"
    },
    {
      key: "analytics",
      label: "Analytics",
      icon: <FaChartBar />,
      path: "/dashboard/analytics"
    },
    {
      key: "rating",
      label: "Rating",
      icon: <FaStar />,
      path: "/dashboard/rating" // 👈 New Rating Page
    }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="mobile-menu-btn" onClick={() => setOpen(!open)}>
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="logo">⚙️</span>
          <span className="logo-text">Dashboard</span>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <div
                key={item.key}
                className={`menu-item ${isActive ? "active" : ""}`}
                onClick={() => {
                  router.push(item.path);
                  setOpen(false); // Close menu on mobile
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
