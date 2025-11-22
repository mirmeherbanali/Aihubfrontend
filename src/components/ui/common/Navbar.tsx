"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../../ui/style/Navbar.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { getToken } from "@/utils/authStorage";
import ButtonNew from "./ButtonNew";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLogin } = useAuthToggle();
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = pathname.startsWith("/auth"); // ✅ Hide login/add on auth pages

  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const handleLoginClick = () => {
    setIsLogin(true);
    router.push("/auth/login");
  };

  const handleNavigation = (path: string) => {
    setMenuOpen(false);
    if (pathname !== path) router.push(path);
  };

  if (token === undefined) {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          Allisted
        </div>
      </header>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          Allisted
        </div>

        <div className={styles.navContainer}>
          <nav className={styles.desktopMenu}>
            <button
              onClick={() => handleNavigation("/")}
              className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavigation("/categories")}
              className={`${styles.navItem} ${pathname === "/categories" ? styles.active : ""}`}
            >
              Category
            </button>

            <button
              onClick={() => handleNavigation("/about")}
              className={`${styles.navItem} ${pathname === "/about" ? styles.active : ""}`}
            >
              About
            </button>

            {/* ✅ Hide login + Add Tool on auth pages */}
            {!token && !isAuthPage && (
                <button onClick={handleLoginClick} className={styles.navItem}>
                  Login
                </button>
            )}
          </nav>

          <div className={styles.ctaSection}>
            {token ? (
              <img
                src="/default-avatar.png"
                alt="Profile"
                className={styles.profileImage}
              />
            ):!isAuthPage && <ButtonNew />}
          </div>
        </div>

        <div
          className={styles.mobileMenuIcon}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <button
          onClick={() => handleNavigation("/")}
          className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}
        >
          Home
        </button>

        <button
          onClick={() => handleNavigation("/categories")}
          className={`${styles.navItem} ${pathname === "/categories" ? styles.active : ""}`}
        >
          Category
        </button>

        <button
          onClick={() => handleNavigation("/about")}
          className={`${styles.navItem} ${pathname === "/about" ? styles.active : ""}`}
        >
          About
        </button>

        {/* ✅ Hide in mobile menu too */}
        {!token && !isAuthPage && (
          <div className={styles.buttonGroup}>
            <button onClick={handleLoginClick} className={styles.loginBtn}>
              Login
            </button>
            <ButtonNew />
          </div>
        )}
      </div>
    </>
  );
}
