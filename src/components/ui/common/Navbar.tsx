"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../../ui/style/Navbar.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { getToken, clearAuthData } from "@/utils/authStorage";
import Image from "next/image"

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLogin } = useAuthToggle();
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Optimized token loading - only once
  useEffect(() => {
    setToken(getToken());
  }, []);

  // ✅ Prevent body scroll with cleanup
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // ✅ Memoize active path check
  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  // ✅ Optimized logout handler
  const handleLogout = useCallback(() => {
    clearAuthData();
    setToken(null);
    setMenuOpen(false);
    // Use replace instead of push for immediate navigation
    router.replace("/auth/login");
  }, [router]);

  // ✅ Memoize navigation handlers
  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleLoginClick = useCallback(() => {
    setIsLogin(true);
    setMenuOpen(false);
  }, [setIsLogin]);

  // ✅ Prefetch important routes
  useEffect(() => {
    // Prefetch likely next pages
    router.prefetch("/");
    router.prefetch("/categories");
    router.prefetch("/auth/login");
  }, [router]);

  return (
    <header className={styles.header}>
      {/* Logo with optimized Link */}
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
                loading="eager" // ✅ Important for above-fold images
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
        onKeyPress={(e) => e.key === 'Enter' && setMenuOpen(!menuOpen)}
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
  priority // ✅ For above-fold images
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
    </header>
  );
}