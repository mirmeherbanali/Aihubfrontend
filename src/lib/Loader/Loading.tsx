"use client";

import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderContent}>
        <div className={styles.spinner}></div>
        <h1 className={styles.appName}>Allisted</h1>
      </div>
    </div>
  );
}
