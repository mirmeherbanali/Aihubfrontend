import Link from "next/link";
import Image from "next/image";
import NavbarClient from "./NavbarClient";
import DesktopAuthLinks from "./DesktopAuthLinks";
import styles from "../../ui/style/Navbar.module.scss";
import { usePathname } from "next/navigation";
import logoIMG from "../../../../public/assets/logo-allisted2.svg";
export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => (pathname === path ? styles.active : "");

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src={logoIMG}
          alt="Allisted Logo"
          className={styles.logoImage}
          priority
        />
      </Link>

      {/* DESKTOP MENU */}
      <div className={styles.navContainer}>
        <nav className={styles.desktopMenu}>
          <Link href="/" className={`${styles.navItem} ${isActive("/")}`}>
            Home
          </Link>
          <Link
            href="/category"
            className={`${styles.navItem} ${isActive("/category")}`}
          >
            Category
          </Link>
          <Link
            href="/about"
            className={`${styles.navItem} ${isActive("/about")}`}
          >
            About
          </Link>
          <DesktopAuthLinks />
        </nav>
        <NavbarClient />
      </div>
    </header>
  );
}
