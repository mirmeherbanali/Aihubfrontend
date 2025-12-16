"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../ui/style/Navbar.module.scss";
import { getToken } from "@/utils/authStorage";
import { useAuthToggle } from "@/context/AuthToggleContext";
import ButtonNew from "./ButtonNew";

export default function NavbarClient() {
  const pathname = usePathname() ?? "";
  const { setIsLogin } = useAuthToggle();

  const [token, setToken] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    setToken(getToken());
  }, []);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 768 && menuOpen) {
      setMenuOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* DESKTOP CTA */}
      <div className={styles.ctaSection}>
        {token ? (
          <img
            src="/default-avatar.png"
            alt="Profile"
            className={styles.profileImage}
          />
        ) : (
          !isAuthPage && <ButtonNew />
        )}
      </div>

      {/* MOBILE MENU ICON */}
      <button
        type="button"
        className={styles.mobileMenuIcon}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      <nav
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.accordionItem}>
          <Link href="/" className={styles.button} onClick={closeMenu}>
            Home
          </Link>
        </div>

        <div className={styles.accordionItem}>
          <Link href="/categories" className={styles.button} onClick={closeMenu}>
            Categories
          </Link>
        </div>

        <div className={styles.accordionItem}>
          <Link href="/about" className={styles.button} onClick={closeMenu}>
            About
          </Link>
        </div>

        {!token && !isAuthPage ? (
          <>
            <div className={styles.accordionItem}>
              <Link
                href="/auth/login"
                className={styles.button}
                onClick={() => {
                  setIsLogin(true);
                  closeMenu();
                }}
              >
                Login
              </Link>
            </div>

            {/* MOBILE ONLY CTA */}
            <div className={styles.mobileOnly}>
              <ButtonNew />
            </div>
          </>
        ) : (
          <div className={styles.accordionItem}>
            <Link
              href="/dashboard"
              className={styles.button}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
