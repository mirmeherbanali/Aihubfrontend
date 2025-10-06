"use client";

import React, { ReactNode, useState } from "react";
import { Layout, Menu, Grid } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ToolOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

// Pages
import ToolsPage from "./tools/page";
import ProfilePage from "./profile/page";
import AnalyticsPage from "./analytics/page";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const menuItems = [
  { key: "tools", label: "Tools", icon: <AppstoreOutlined />, component: <ToolsPage /> },
  { key: "profile", label: "Profile", icon: <ToolOutlined />, component: <ProfilePage /> },
  { key: "analytics", label: "Analytics", icon: <SettingOutlined />, component: <AnalyticsPage /> },
];

export default function DashboardPage({ children }: { children?: ReactNode }) {
  const screens = useBreakpoint();
  const [selectedKey, setSelectedKey] = useState("tools");

  // Dynamically get the component based on selectedKey
  const renderContent = () => {
    const item = menuItems.find((m) => m.key === selectedKey);
    return item?.component || <ToolsPage />;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        breakpoint="lg"
        collapsedWidth={80}
        style={{
          background: "#fff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 18,
            color: "#1890ff",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          ⚙️ Dashboard
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          style={{ border: "none", paddingTop: 16 }}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>

      {/* Content */}
      <Layout
        style={{
          marginLeft: screens.lg ? undefined : 0,
          transition: "margin-left 0.3s",
        }}
      >
        <Content style={{ padding: 40, display: "flex", justifyContent: "center" }}>
          {children || renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
