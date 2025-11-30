"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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

  // ⭐ accordion open section
  const [accordion, setAccordion] = useState<string | null>(null);

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



  const handleNavigation = (path: string) => {
    setMenuOpen(false);
    setAccordion(null);
    if (pathname !== path) router.push(path);
  };

  const toggleAccordion = (section: string) => {
    setAccordion((prev) => (prev === section ? null : section));
  };

  if (token === undefined) {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span> Allisted
        </div>
      </header>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span> Allisted
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
              !isAuthPage && <ButtonNew handleLoginClick={handleLoginClick} />
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

      {/* MOBILE ACCORDION MENU */}
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

        {/* LOGIN + ADD TOOL */}
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
