"use client";

import Link from "next/link";
import styles from "../components/ui/style/notFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.glowOrb}></div>

      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Page Not Found</h2>
        <p className={styles.errorMessage}>
          Looks like you're exploring unknown territory.  
          The page you're looking for doesn’t exist.
        </p>

        <Link href="/" className={styles.homeBtn}>
          Go Back Home →
        </Link>
      </div>
    </div>
  );
}
