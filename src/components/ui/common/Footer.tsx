import React from "react";
import styles from "../style/footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        {/* Left Content */}
        <div className={styles.left}>
          <h2 className={styles.logo}>Allisted</h2>
          <p>
            Allisted is your go-to directory for the best AI tools. Explore,
            compare, and discover innovative solutions across categories — from
            writing and design to automation and analytics. Stay updated with
            trending tools and the latest launches, all in one place.
          </p>
        </div>

        {/* Right Links */}
        <div className={styles.right}>
          <ul>
            <li>About Us</li>
            <li>Blog</li>
            <li>Categories</li>
          </ul>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className={styles.bottom}>
        <p>Copyright 2025. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
