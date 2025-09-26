"use client";

import { Layout, Menu, Dropdown, Button, Drawer } from "antd";
import { DownOutlined, LoginOutlined, MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { COLORS } from "@/constants/colors";
import { useState } from "react";
import styles from "../../ui/style/Navbar.module.scss"; // 👈 import sass module

const { Header } = Layout;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => setOpen(false);

  const menuItems = [
    {
      key: "1",
      label: (
        <Link href="/free-tools" onClick={handleMenuClick}>
          Free Tools
        </Link>
      )
    },
    {
      key: "2",
      label: (
        <Dropdown
          menu={{
            items: [
              {
                key: "21",
                label: (
                  <Link href="/products/ai" onClick={handleMenuClick}>
                    AI Products
                  </Link>
                )
              },
              {
                key: "22",
                label: (
                  <Link href="/products/saas" onClick={handleMenuClick}>
                    SaaS Tools
                  </Link>
                )
              }
            ]
          }}
        >
          <span>
            Products <DownOutlined style={{ fontSize: 10 }} />
          </span>
        </Dropdown>
      )
    },
    {
      key: "3",
      label: (
        <Link href="/categories" onClick={handleMenuClick}>
          Category
        </Link>
      )
    },
    {
      key: "4",
      label: (
        <Link href="/ranking" onClick={handleMenuClick}>
          Ranking
        </Link>
      )
    },
    {
      key: "5",
      label: (
        <Link href="/jobs" onClick={handleMenuClick}>
          Jobs
        </Link>
      )
    },
    {
      key: "6",
      label: (
        <Link href="/research" onClick={handleMenuClick}>
          Research
        </Link>
      )
    },
    {
      key: "7",
      label: (
        <Link href="/login" onClick={handleMenuClick}>
          Submit
        </Link>
      )
    }
  ];

  return (
    <Header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src="/assets/logo.jpg" alt="Logo" style={{ height: 35 }} />
        AiDictionary
      </div>

      {/* Desktop Menu */}
      <div className={styles.desktopMenu}>
        <Menu
          mode="horizontal"
          style={{
            borderBottom: "none",
            background: "transparent",
            display: "flex",
            justifyContent: "center"
          }}
          items={menuItems}
        />
      </div>

      {/* Right Section */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 15, zIndex: 1 }}
      >
        {/* Desktop Buttons */}
        <div className={styles.desktopButtons}>
          <Link href="/auth/login">
            <Button
              type="link"
              icon={<LoginOutlined />}
              style={{ color: COLORS.primaryBlue, fontWeight: 500 }}
            >
              Login
            </Button>
          </Link>
          <Button
            type="primary"
            style={{
              backgroundColor: COLORS.accentBlue,
              borderColor: COLORS.accentBlue,
              color: COLORS.white,
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                COLORS.teal;
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                COLORS.teal;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                COLORS.accentBlue;
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                COLORS.accentBlue;
            }}
          >
            Submit a Tool
          </Button>
        </div>

        {/* Mobile/Tablet Hamburger */}
        <div className={styles.mobileTabletMenu}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      {/* Drawer for Mobile */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu mode="vertical" items={menuItems} />

        {/* Mobile-only Buttons inside Drawer */}
        <div className={styles.mobileButtons}>
          <Link href="/auth/login">
            <Button
              type="link"
              icon={<LoginOutlined />}
              style={{ color: COLORS.primaryBlue, fontWeight: 500 }}
            >
              Login
            </Button>
          </Link>
          <Button
            type="primary"
            style={{
              backgroundColor: COLORS.accentBlue,
              borderColor: COLORS.accentBlue,
              color: COLORS.white,
              fontWeight: 500,
              marginTop: 10
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                COLORS.teal;
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                COLORS.teal;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                COLORS.accentBlue;
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                COLORS.accentBlue;
            }}
          >
            Submit a Tool
          </Button>
        </div>
      </Drawer>
    </Header>
  );
}
