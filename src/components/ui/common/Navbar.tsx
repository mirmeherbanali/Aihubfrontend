"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "../../ui/style/Navbar.module.scss";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { getToken, clearAuthData } from "@/utils/authStorage";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLogin } = useAuthToggle();
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Load token once on mount
  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto"; // prevent scroll
  }, [menuOpen]);

  const isActive = (path: string) => pathname === path;

  // ✅ Handle logout
  const handleLogout = () => {
    clearAuthData();
    setToken(null);
    setMenuOpen(false);
    router.push("/auth/login");
  };

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

        {/* ✅ Conditional Auth Button */}
        {token ? (
          <>
            {/* Show Profile Image or Placeholder */}
            
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
            <Link href="/profile" className={styles.profileLink}>
              <img
                src="/default-avatar.png"
                alt="Profile"
                className={styles.profileImage}
              />
            </Link>
          </>
        ) : (
          <>
          <Link
            href="/auth/login"
            onClick={() => setIsLogin(true)}
            className={isActive("/auth/login") ? styles.active : ""}
          >
            Login
          </Link>
          <button className={styles.submitBtn}>Add Your Tool</button>
          </>
        )}

        
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

        {/* ✅ Conditional Login/Logout */}
        {token ? (
          <>
           <button
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              Logout
            </button>
            <Link
              href="/profile"
              className={styles.profileLink}
              onClick={() => setMenuOpen(false)}
            >
              <img
                src="/default-avatar.png"
                alt="Profile"
                className={styles.profileImage}
              />
            </Link>
           
          </>
        ) : (
          <>
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
        </>
        )}

       
      </div>
    </header>
  );
}
