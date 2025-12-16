"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import styles from "../../ui/style/Navbar.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { getToken } from "@/utils/authStorage";
import ButtonNew from "./ButtonNew";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname()!;
  const { setIsLogin } = useAuthToggle();

  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = pathname.startsWith("/auth");

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
    setMenuOpen(false);
    setIsLogin(true);
    router.push("/auth/login");
  };

  const handleToolClick = () => {
    setMenuOpen(false);
    setIsLogin(true);
    router.push("/tool");
  };

  const handleNavigation = (path: string) => {
    setMenuOpen(false);
    if (pathname !== path) router.push(path);
  };

  // LOADING STATE
  if (token === undefined) {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/logo-allisted.svg"
            width={34}
            height={34}
            alt="Allisted Logo"
            className={styles.logoImage}
          />
          <span>Allisted</span>
        </div>
      </header>
    );
  }

  // MAIN NAVBAR
  return (
    <>
      <header className={styles.header}>
        {/* LOGO */}
        <div
          className={styles.logo}
          onClick={() => handleNavigation("/")}
        >
          <Image
            src="/logo-allisted.svg"
            width={34}
            height={34}
            alt="Allisted Logo"
            className={styles.logoImage}
          />
          <span>Allisted</span>
        </div>

        {/* DESKTOP MENU */}
        <div className={styles.navContainer}>
          <nav className={styles.desktopMenu}>
            <button
              onClick={() => handleNavigation("/")}
              className={`${styles.navItem} ${
                pathname === "/" ? styles.active : ""
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavigation("/categories")}
              className={`${styles.navItem} ${
                pathname === "/categories" ? styles.active : ""
              }`}
            >
              Category
            </button>

            <button
              onClick={() => handleNavigation("/about")}
              className={`${styles.navItem} ${
                pathname === "/about" ? styles.active : ""
              }`}
            >
              About
            </button>
            {token &&
            <button onClick={() => handleNavigation("/dashboard")}
            className={`${styles.navItem} ${
                pathname === "/dashboard" ? styles.active : ""
              }`}
            >
                Dashboard
              </button>
            }
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
            ) : (
              !isAuthPage && <ButtonNew handleLoginClick={handleToolClick} />
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div
          className={styles.mobileMenuIcon}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>
      </header>

      {/* MOBILE DROPDOWN MENU */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.accordionItem}>
          <button onClick={() => handleNavigation("/")} className={styles.button}>
            Home
          </button>
        </div>

        <div className={styles.accordionItem}>
          <button
            onClick={() => handleNavigation("/categories")}
            className={styles.button}
          >
            Categories
          </button>
        </div>

        <div className={styles.accordionItem}>
          <button
            onClick={() => handleNavigation("/about")}
            className={styles.button}
          >
            About Us
          </button>
        </div>

        {!token && !isAuthPage && (
          <div className={styles.buttonGroup}>
            <button className={styles.loginBtn} onClick={handleLoginClick}>
              Login
            </button>
            <ButtonNew />
          </div>
        )}
      </div>
    </>
  );
}
