"use client";

import { useState, useEffect } from "react";
import styles from "../../ui/style/Navbar.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { getToken } from "@/utils/authStorage";
import Image from "next/image";

export default function NavbarDash() {
  const { setIsLogin } = useAuthToggle();
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);
  }, []);

  const handleLoginClick = () => {
    setIsLogin(true);
    window.location.href = "/auth/login";
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const handleLinkClick = (url: string) => {
    setMenuOpen(false);
    window.open(url, "_blank");
  };

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
      <div
        className={styles.logo}
        onClick={() => window.open("/", "_blank")}
        style={{ cursor: "pointer" }}
      >
        Allisted
      </div>

      {/* Desktop Menu */}
      <nav className={styles.desktopMenu}>
        <button
          onClick={() => handleLinkClick("/")}
          className={styles.navButton}
        >
          Home
        </button>

        <button
          onClick={() => handleLinkClick("/categories")}
          className={styles.navButton}
        >
          Category
        </button>

        {token ? (
          <button
            onClick={() => handleLinkClick("/profile")}
            className={styles.profileLink}
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
            <button
              className={styles.submitBtn}
              onClick={() => handleLinkClick("/add-tool")}
            >
              Add Your Tool
            </button>
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
        className={`${styles.mobileMenu} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <button onClick={() => handleLinkClick("/")} className={styles.navButton}>
          Home
        </button>
        <button
          onClick={() => handleLinkClick("/categories")}
          className={styles.navButton}
        >
          Category
        </button>

        {token ? (
          <button
            onClick={() => handleLinkClick("/profile")}
            className={styles.profileLink}
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
              className={styles.submitBtn}
              onClick={() => handleLinkClick("/add-tool")}
            >
              Add Your Tool
            </button>
          </>
        )}
      </div>
    </header>
  );
}
