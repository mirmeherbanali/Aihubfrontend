import Link from "next/link";
import Image from "next/image";
import NavbarClient from "./NavbarClient";
import DesktopAuthLinks from "./DesktopAuthLinks";
import styles from "../../ui/style/Navbar.module.scss";

export default function Navbar() {
  return (
    <header className={styles.header}>
      {/* LOGO */}
      <Link href="/" className={styles.logo}>
        <Image src="/logo-allisted.svg" width={34} height={34} alt="Allisted Logo" />
        <span>Allisted</span>
      </Link>

      {/* DESKTOP MENU */}
      <nav className={styles.desktopMenu}>
        <Link href="/" className={styles.navItem}>Home</Link>
        <Link href="/categories" className={styles.navItem}>Category</Link>
        <Link href="/about" className={styles.navItem}>About</Link>

        {/* ✅ AUTH-CONTROLLED */}
        <DesktopAuthLinks />
      </nav>

      {/* MOBILE MENU */}
      <NavbarClient />
      
    </header>
  );
}
