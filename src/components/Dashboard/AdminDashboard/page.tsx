"use client";

import React from "react";
import { FaTools, FaUser } from "react-icons/fa";
import "./AdminHome.scss";

const sampleTools = [
  {
    name: "AI Image Generator",
    category: "Graphics",
    logo: "https://picsum.photos/200?random=1",
  },
  {
    name: "Code Assistant",
    category: "Development",
    logo: "https://picsum.photos/200?random=2",
  },
  {
    name: "SEO Analyzer",
    category: "Marketing",
    logo: "https://picsum.photos/200?random=3",
  },
  {
    name: "Chatbot Builder",
    category: "Automation",
    logo: "https://picsum.photos/200?random=4",
  },
  {
    name: "Writer AI",
    category: "Content",
    logo: "https://picsum.photos/200?random=5",
  },
];

const recentUsers = [
  { name: "Aziz Bakree", status: "Developer" },
  { name: "Griezerman", status: "Admin" },
  { name: "Oconner", status: "Rejected" },
  { name: "Uli Trumb", status: "Recovered" },
  { name: "Aziz Bakree", status: "Pending" },
  { name: "Griezerman", status: "On Recovery" },
  { name: "Oconner", status: "Rejected" },
  { name: "Uli Trumb", status: "Recovered" },
];

const scrollTools = (offset) => {
  const slider = document.getElementById("toolsSlider");
  slider.scrollLeft += offset;
};

const AdminHome = () => {
  return (
    <div className="admin-home-container">

      {/* HEADER */}
      <h2 className="page-title">Welcome to Recuip!</h2>
      <p className="page-subtitle">Admin Dashboard Overview</p>

      {/* COUNTERS */}
      <div className="summary-grid">

        <div className="summary-card card-blue">
          <div>
            <h3>Total Users</h3>
            <h2>1,245</h2>
          </div>
          <FaUser className="summary-icon" />
        </div>

        <div className="summary-card card-purple">
          <div>
            <h3>Total Tools</h3>
            <h2>89</h2>
          </div>
          <FaTools className="summary-icon" />
        </div>

        <div className="summary-card card-green">
          <div>
            <h3>Categories</h3>
            <h2>34</h2>
          </div>
          <FaTools className="summary-icon" />
        </div>

      </div>

      <div className="main-row">

        <div className="top-tools-box">

          <div className="header-row">
            <h3>Top Rated Tools</h3>
            <a>View more ››</a>
          </div>

          <button className="slide-btn left" onClick={() => scrollTools(-300)}>
            ◀
          </button>
          <div className="tools-slider" id="toolsSlider">
            {sampleTools.map((tool, index) => (
              <div key={index} className="tool-card">
                <img src={tool.logo} className="tool-img" alt="tool" />
                <div className="tool-info">
                  <h4>{tool.name}</h4>
                  <p>{tool.category}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="slide-btn right" onClick={() => scrollTools(300)}>
            ▶
          </button>

        </div>
        <div className="recent-users-box">

          <div className="header-row">
            <h3>Recent Users</h3>
            <a>View more ››</a>
          </div>

          <div className="user-list">
            {recentUsers.map((user, i) => (
              <div key={i} className="user-item">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>New User</p>
                </div>

                <span className={`status ${user.status.replace(" ", "")}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminHome;
