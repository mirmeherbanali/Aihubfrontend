"use client";

import React from "react";
import { FaTools, FaUser } from "react-icons/fa";
import "./AdminHome.scss";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import { useGetAllToolsQuery } from "@/features/tools/toolsApi";
import { useGetAllUsersQuery } from "@/features/auth/authApi";
import Link from "next/link";
import moment from "moment";

const scrollTools = (offset: number) => {
  const slider = document.getElementById("toolsSlider");
  if (slider) slider.scrollLeft += offset;
};

const AdminHome = () => {
  // 🔥 Fetch API data
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: toolsData } = useGetAllToolsQuery();
  const { data: usersData } = useGetAllUsersQuery();

  // Extract results safely (handle cases where the hook returns an array directly or an object with result.list)
    const categories = Array.isArray(categoriesData) ? categoriesData : ((categoriesData as any)?.result?.list ?? [])
    const tools = Array.isArray(toolsData) ? toolsData : ((toolsData as any)?.result?.list ?? [])
    const users = Array.isArray(usersData) ? usersData : ((usersData as any)?.result?.list ?? [])

  // Dynamic counts
  const totalUsers = users.length;
  const totalTools = tools.length;
  const totalCategories = categories.length;

  // Recent users → latest 8
  // Recent users → latest 8 sorted by createdAt
const recentUsers = [...users]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 8)
  .map(user => ({
    ...user,
    timeAgo: moment(user.createdAt).fromNow()
  }));


  // Top tools → take first 10
  const topTools = tools.slice(0, 10);

  return (
    <div className="admin-home-container">
      {/* HEADER */}
      <h2 className="page-title">Welcome to Recuip!</h2>
      <p className="page-subtitle">Admin Dashboard Overview</p>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">
        <div className="summary-card card-blue">
          <div>
            <h3>Total Users</h3>
            <h2>{totalUsers}</h2>
          </div>
          <FaUser className="summary-icon" />
        </div>

        <div className="summary-card card-purple">
          <div>
            <h3>Total Tools</h3>
            <h2>{totalTools}</h2>
          </div>
          <FaTools className="summary-icon" />
        </div>

        <div className="summary-card card-green">
          <div>
            <h3>Categories</h3>
            <h2>{totalCategories}</h2>
          </div>
          <FaTools className="summary-icon" />
        </div>
      </div>

      <div className="main-row">
        {/* TOP TOOLS */}
        <div className="top-tools-box">
          <div className="header-row">
  <h3>Top Rated Tools</h3>
  <Link href="/dashboard?tab=3" className="view-more-link">
    View more ››
  </Link>
</div>


          <button className="slide-btn left" onClick={() => scrollTools(-300)}>
            ◀
          </button>

          <div className="tools-slider" id="toolsSlider">
            {topTools.map((tool: any, index: number) => (
              <div key={index} className="tool-card">
                <img
                  src={tool.logo || "https://via.placeholder.com/200"}
                  className="tool-img"
                  alt="tool"
                />
                <div className="tool-info">
                  <h4>{tool.toolName}</h4>
                </div>
              </div>
            ))}
          </div>

          <button className="slide-btn right" onClick={() => scrollTools(300)}>
            ▶
          </button>
        </div>

        {/* RECENT USERS */}
        <div className="recent-users-box">
          <div className="header-row">
            <h3>Recent Users</h3>
           <Link href="/dashboard?tab=5"className="view-more-link">
    View more ››
  </Link>
          </div>

          <div className="user-list">
            {recentUsers.map((user: any, i: number) => (
              <div key={i} className="user-item">
                <div className="user-avatar">
                  {user?.firstName?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </div>

                <div className="user-info">
                  <h4>{[user?.firstName, user?.lastName].filter(Boolean).join(" ")}</h4>
                  <p className="time-ago">{user.timeAgo}</p> {/* 🔥 ADDED */}
                </div>

                <span className="status Active">{user?.userType}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
