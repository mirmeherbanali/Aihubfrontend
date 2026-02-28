import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../style/footer.module.scss";
import logoIMG from "../../../../public/assets/logo-allisted2.svg";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        
        {/* Left Section */}
        <div className={styles.left}>
           <Link href="/" className={styles.logo}>
        <Image
          src={logoIMG}
          alt="Allisted Logo"
          className={styles.logoImage}
          priority
        />
      </Link>
          <p>
            Allisted is your go-to directory for the best AI tools. Explore,
            compare, and discover innovative solutions across categories —
            from writing and design to automation and analytics.
          </p>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <ul>
            <li><Link href="/about" className={styles.footerLink}>About Us</Link></li>
            <li><Link href="/blog" className={styles.footerLink}>Blog</Link></li>
            <li><Link href="/category" className={styles.footerLink}>Categories</Link></li>
          </ul>

          <ul>
            <li><Link href="/terms" className={styles.footerLink}>Terms & Conditions</Link></li>
            <li><Link href="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.bottom}>
        <p>Copyright 2025. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
