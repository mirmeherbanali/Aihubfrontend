"use client";
import React from "react";
import styles from "../../../ui/style/ViewUser.module.scss";

export default function ViewUser({ user, onBack }: any) {
  return (
    <div className={styles.viewContainer}>
      
      {/* Back Arrow */}
      <button className={styles.backBtn} onClick={onBack}>
        ← Back
      </button>

      <h2 className={styles.title}>User Details</h2>

      <div className={styles.detailGrid}>
        {Object.entries(user)
          .filter(([key]) => key !== "_id") // do NOT show id
          .map(([key, value]) => (
            <div className={styles.row} key={key}>
              <span className={styles.label}>{key}:</span>
              <span className={styles.value}>
                {value ? String(value) : "N/A"}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
