"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../../ui/style/Navbar.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { clearAuthData, getToken } from "@/utils/authStorage";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname()!;
  const { setIsLogin } = useAuthToggle();

  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);
const [accordion, setAccordion] = useState<string | null>(null);
  // logout states (fixed)
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // FIX: Correct spelling for dashboard
  const isDashPage = pathname.startsWith("/dashboard");

  // Load token only once
  useEffect(() => {
    setToken(getToken());
  }, []);

  // Stop background scroll when mobile menu opens
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // FIXED: `_blank` navigation support
  const handleNavigation = (path: string, newTab: boolean = false) => {
    setMenuOpen(false);
    setAccordion(null);
    if (newTab) {
      window.open(path, "_blank");
      return;
    }

    if (pathname !== path) {
      router.push(path);
    }
  };

  // Logout properly
  const confirmLogout = async () => {
    setLoadingLogout(true);
    setShowLogoutPopup(false);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    clearAuthData();

    window.location.href = "/auth/login";
  };

  // First render (token === undefined)
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
      {/* HEADER */}
      <header className={styles.header}>
        {/* LOGO */}
        <div className={styles.logo} onClick={() => handleNavigation("/")}>
          <span className={styles.logoIcon}>⚡</span>
          Allisted
        </div>

        {/* DESKTOP MENU */}
        <div className={styles.navContainer}>
          <nav className={styles.desktopMenu}>
            <button
              onClick={() => handleNavigation("/", true)}
              className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavigation("/categories", true)}
              className={`${styles.navItem} ${pathname === "/categories" ? styles.active : ""}`}
            >
              Category
            </button>

            <button
              onClick={() => handleNavigation("/about", true)}
              className={`${styles.navItem} ${pathname === "/about" ? styles.active : ""}`}
            >
              About
            </button>

            {isDashPage && (
              <button
                onClick={() => confirmLogout()}
                className={styles.navItem}
              >
                Logout
              </button>
            )}
          </nav>

          {/* PROFILE ICON */}
          <div className={styles.ctaSection}>
            {token && (
              <img
                src="/default-avatar.png"
                alt="Profile"
                className={styles.profileImage}
              />
            )}
          </div>
        </div>

        {/* MOBILE MENU ICON */}
        <div
          className={styles.mobileMenuIcon}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        
        {/* ACCORDION ITEM 1 */}
        <div className={styles.accordionItem}>
         

              <button
                onClick={() => handleNavigation("/")}
                className={styles.button}
              >
              Home
              </button>
        
        </div>

        {/* ACCORDION ITEM 2 */}
        <div className={styles.accordionItem}>

              <button
                onClick={() => handleNavigation("/categories")}
                className={styles.button}
              >
               Categories
              </button>
        </div>

        {/* ACCORDION ITEM 3 */}
        <div className={styles.accordionItem}>
  
              <button
                onClick={() => handleNavigation("/about")}
                className={styles.button}
              >
                About Us
              </button>
        </div>

        {isDashPage && (
          <button onClick={confirmLogout} className={styles.navItem}>
            Logout
          </button>
        )}
      </div>
    </>
  );
}
