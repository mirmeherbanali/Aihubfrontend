"use client";

import { Layout, Menu, Dropdown, Button } from "antd";
import { DownOutlined, GlobalOutlined, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import { COLORS } from "@/constants/colors";

const { Header } = Layout;

export default function Navbar() {
  const menuItems = [
    { key: "1", label: <Link href="/free-tools">Free Tools</Link> },
    {
      key: "2",
      label: (
        <Dropdown
          menu={{
            items: [
              { key: "21", label: <Link href="/products/ai">AI Products</Link> },
              { key: "22", label: <Link href="/products/saas">SaaS Tools</Link> },
            ],
          }}
        >
          <span>
            Products <DownOutlined style={{ fontSize: 10 }} />
          </span>
        </Dropdown>
      ),
    },
    { key: "3", label: <Link href="/categories">Category</Link> },
    { key: "4", label: <Link href="/ranking">Ranking</Link> },
    { key: "5", label: <Link href="/jobs">Jobs</Link> },
    { key: "6", label: <Link href="/research">Research</Link> },
    { key: "7", label: <Link href="/submit">Submit</Link> },
  ];

  return (
    <Header
      style={{
        background: COLORS.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        borderBottom: `1px solid ${COLORS.lightGray}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Gradient Backgrounds */}
      <div className="nav-gradient blue" />
      <div className="nav-gradient pink" />

      {/* Left Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 700,
          fontSize: 22,
          color: COLORS.primaryBlue,
          gap: 10,
          zIndex: 1,
        }}
      >
        <img src="/logo.svg" alt="Logo" style={{ height: 30 }} />
        AiDictionary
      </div>

      {/* Center Menu */}
      <Menu
        mode="horizontal"
        style={{
          borderBottom: "none",
          flex: 1,
          justifyContent: "center",
          background: "transparent",
          zIndex: 1,
        }}
        items={menuItems}
      />

  <div style={{ display: "flex", alignItems: "center", gap: 20, zIndex: 1 }}>
      {/* Login Button with Icon */}
      <Link href="/auth/login">
        <Button
          type="link"
          icon={<LoginOutlined />}
          style={{ color: COLORS.primaryBlue, fontWeight: 500 }}
        >
          Login
        </Button>
      </Link>

      {/* Submit a Tool Button */}
      <Button
        type="primary"
        style={{
          backgroundColor: COLORS.accentBlue,
          borderColor: COLORS.accentBlue,
          color: COLORS.white,
          fontWeight: 500,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLORS.teal;
          (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.teal;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLORS.accentBlue;
          (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.accentBlue;
        }}
      >
        Submit a Tool
      </Button>
    </div>

      {/* Floating Gradient Animations */}
      <style jsx>{`
        .nav-gradient {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          z-index: 0;
          animation: float 12s ease-in-out infinite alternate;
        }
        .nav-gradient.blue {
          top: -150px;
          left: -150px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.25), transparent 70%);
          animation-delay: 0s;
        }
        .nav-gradient.pink {
          bottom: -150px;
          right: -150px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 70%);
          animation-delay: 6s;
        }
        @keyframes float {
          from {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          to {
            transform: translateY(20px) translateX(20px) scale(1.05);
          }
        }
      `}</style>
    </Header>
  );
}
