"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "../../ui/style/Navbar.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setIsLogin } = useAuthToggle();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto"; // prevent scroll
  }, [menuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>Allisted</div>

      {/* Desktop Menu */}
      <nav className={styles.desktopMenu}>
        <Link href="/" className={isActive("/") ? styles.active : ""}>
          Home
        </Link>
        <Link
          href="/categories"
          className={isActive("/categories") ? styles.active : ""}
        >
          Category
        </Link>
        <Link
          href="/auth/login"
          onClick={() => setIsLogin(true)}
          className={isActive("/auth/login") ? styles.active : ""}
        >
          Login
        </Link>

        <button className={styles.submitBtn}>Add Your Tool</button>
      </nav>

      {/* Mobile Hamburger / Cross */}
      <div
        className={styles.mobileMenuIcon}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <Link
          href="/"
          className={isActive("/") ? styles.active : ""}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/categories"
          className={isActive("/categories") ? styles.active : ""}
          onClick={() => setMenuOpen(false)}
        >
          Category
        </Link>
        <Link
          href="/auth/login"
          className={isActive("/auth/login") ? styles.active : ""}
          onClick={() => {
            setIsLogin(true);
            setMenuOpen(false);
          }}
        >
          Login
        </Link>
        <button className={styles.submitBtn} onClick={() => setMenuOpen(false)}>
          Add Your Tool
        </button>
      </div>
    </header>
  );
}
