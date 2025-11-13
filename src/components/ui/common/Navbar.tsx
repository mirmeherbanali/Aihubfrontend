"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../../ui/style/Navbar.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { getToken } from "@/utils/authStorage";
import Image from "next/image";
import ButtonNew from "./ButtonNew";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLogin } = useAuthToggle();
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check token only once
  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);
  }, []);

  // Disable scroll when mobile menu is open
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

  // Avoid flicker during token check
  if (token === undefined) {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>Allisted</div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <button onClick={() => handleNavigation("/")} className={styles.navButton}>
          Allisted
        </button>
      </div>

      {/* Desktop Menu */}
      <nav className={styles.desktopMenu}>
        <button
          onClick={() => handleNavigation("/")}
          className={`${pathname === "/" ? styles.active : ""} ${styles.navButton}`}
        >
          Home
        </button>
        <button
          onClick={() => handleNavigation("/categories")}
          className={`${pathname === "/categories" ? styles.active : ""} ${styles.navButton}`}
        >
          Category
        </button>
        <button
          onClick={() => handleNavigation("/about")}
          className={`${pathname === "/about" ? styles.active : ""} ${styles.navButton}`}
        >
          About
        </button>

        {token ? (
          <button
            onClick={() => handleNavigation("/profile")}
            className={`${pathname === "/profile" ? styles.active : ""} ${styles.navButton}`}
          >
            <img
              src="/default-avatar.png"
              alt="Profile"
              className={styles.profileImage}
              loading="eager"
            />
          </button>
        ) : (
          <>
            <button onClick={handleLoginClick} className={styles.navButton}>
              Login
            </button>
            <ButtonNew/>
           
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
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.menuOpen : ""}`}>
        <button
          onClick={() => handleNavigation("/")}
          className={`${pathname === "/" ? styles.active : ""} ${styles.navButton}`}
        >
          Home
        </button>
        <button
          onClick={() => handleNavigation("/categories")}
          className={`${pathname === "/categories" ? styles.active : ""} ${styles.navButton}`}
        >
          Category
        </button>

        {token ? (
          <button
            onClick={() => handleNavigation("/profile")}
            className={`${pathname === "/profile" ? styles.active : ""} ${styles.navButton}`}
          >
            <Image
              src="/default-avatar.png"
              alt="Profile"
              width={32}
              height={32}
              className={styles.profileImage}
              priority
            />
          </button>
        ) : (
          <>
            <button onClick={handleLoginClick} className={styles.navButton}>
              Login
            </button>
            <button
              onClick={() => handleNavigation("/add-tool")}
              className={styles.submitBtn}
            >
              Add Your Tool
            </button>
          </>
        )}
      </div>
    </header>
  );
}
