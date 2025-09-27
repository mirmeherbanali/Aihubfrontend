"use client";

import { Layout, Menu, Dropdown, Button, Drawer } from "antd";
import { DownOutlined, LoginOutlined, MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { COLORS } from "@/constants/colors";
import { useState } from "react";
import styles from "../../ui/style/Navbar.module.scss";

const { Header } = Layout;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const isUserLogin = JSON.parse(localStorage.getItem("user_login"));

  const handleMenuClick = () => setOpen(false);

  const menuItems = [
    {
      key: "3",
      label: (
        <Link href="/categories" onClick={handleMenuClick}>
          Category
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
            Resources <DownOutlined style={{ fontSize: 10 }} />
          </span>
        </Dropdown>
      )
    }
  ];

  return (
    <Header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>AiDictionary</div>

      {/* Desktop Menu */}
      {/* Desktop Menu & Buttons Wrapper */}
      <div className={styles.desktopRight}>
        <Menu
          mode="horizontal"
          theme="dark"
          style={{
            borderBottom: "none",
            background: "transparent"
          }}
          items={menuItems}
        />

        <div className={styles.desktopButtons}>
          <Link href="/auth/login">
            <Button type="link" className={styles.loginBtn}>
              Login
            </Button>
          </Link>
          <Button className={styles.submitBtn}>Add Your Tool</Button>
        </div>
      </div>

      {/* Desktop Buttons */}
      {/* <div className={styles.desktopButtons}>
        <Link href="/auth/login">
          <Button type="link" className={styles.loginBtn}>
            Login
          </Button>
        </Link>
        <Button className={styles.submitBtn}>Add Your Tool</Button>
      </div> */}

      {/* Mobile/Tablet Hamburger */}
      <div className={styles.mobileTabletMenu}>
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: "white", fontSize: "20px" }} />}
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Drawer for Mobile/Tablet */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          // onClick={handleMenuClick} // auto close after click
        />

        {/* Buttons inside Drawer */}
        <div className={styles.mobileButtons}>
          <Link href="/auth/login" onClick={handleMenuClick}>
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
            onClick={handleMenuClick}
          >
            Submit a Tool
          </Button>
        </div>
      </Drawer>
    </Header>
  );
}
