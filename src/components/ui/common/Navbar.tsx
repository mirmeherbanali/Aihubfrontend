"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../../ui/style/Navbar.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { getToken, clearAuthData } from "@/utils/authStorage";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLogin } = useAuthToggle();
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  // ✅ Load token once
  useEffect(() => {
    setToken(getToken());
  }, []);

  // ✅ Prevent scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  // ✅ Logout handler with popup + loading + redirect
  const handleLogout = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const confirmLogout = useCallback(async () => {
    setLoadingLogout(true);
    setShowConfirm(false);
    await new Promise((resolve) => setTimeout(resolve, 1200)); // fake loading delay
    clearAuthData();
    setToken(null);
    setMenuOpen(false);
    router.replace("/auth/login");
    setLoadingLogout(false);
  }, [router]);

  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleLoginClick = useCallback(() => {
    console.time("⏩ Navigate to login");
    setIsLogin(true);
    setMenuOpen(false);
    console.log("🖱️ Login clicked");
  }, [setIsLogin]);

  // ✅ Prefetch likely pages
  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/categories");
    router.prefetch("/auth/login");
  }, [router]);

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <Link href="/" prefetch>
          Allisted
        </Link>
      </div>

      {/* Desktop Menu */}
      <nav className={styles.desktopMenu}>
        <Link
          href="/"
          className={isActive("/") ? styles.active : ""}
          prefetch
        >
          Home
        </Link>
        <Link
          href="/categories"
          className={isActive("/categories") ? styles.active : ""}
          prefetch
        >
          Category
        </Link>

        {token ? (
          <>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
            <Link href="/profile" className={styles.profileLink} prefetch>
              <img
                src="/default-avatar.png"
                alt="Profile"
                className={styles.profileImage}
                loading="eager"
              />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              onClick={handleLoginClick}
              className={isActive("/auth/login") ? styles.active : ""}
              prefetch
            >
              Login
            </Link>
            <button className={styles.submitBtn}>Add Your Tool</button>
          </>
        )}
      </nav>

      {/* Mobile Menu Icon */}
      <div
        className={styles.mobileMenuIcon}
        onClick={() => setMenuOpen(!menuOpen)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.menuOpen : ""
        }`}
      >
        <Link
          href="/"
          className={isActive("/") ? styles.active : ""}
          onClick={handleLinkClick}
          prefetch
        >
          Home
        </Link>
        <Link
          href="/categories"
          className={isActive("/categories") ? styles.active : ""}
          onClick={handleLinkClick}
          prefetch
        >
          Category
        </Link>

        {token ? (
          <>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
            <Link
              href="/profile"
              className={styles.profileLink}
              onClick={handleLinkClick}
              prefetch
            >
              <Image
                src="/default-avatar.png"
                alt="Profile"
                width={32}
                height={32}
                className={styles.profileImage}
                priority
              />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className={isActive("/auth/login") ? styles.active : ""}
              onClick={handleLoginClick}
              prefetch
            >
              Login
            </Link>
            <button className={styles.submitBtn} onClick={handleLinkClick}>
              Add Your Tool
            </button>
          </>
        )}
      </div>

      {/* ✅ Logout Confirmation Popup */}
      {showConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>Are you sure you want to logout?</p>
            <div className={styles.confirmActions}>
              <button onClick={confirmLogout} className={styles.yesBtn}>
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className={styles.noBtn}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Loading Animation */}
      {loadingLogout && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loader}></div>
          <p>Logging out...</p>
        </div>
      )}
    </header>
  );
}
