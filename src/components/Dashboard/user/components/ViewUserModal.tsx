"use client";

import React from "react";
import styles from "../../../ui/style/ViewUserModal.module.scss"

export default function ViewUserModal({ user, onClose }: any) {
  if (!user) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h2>User Details</h2>

        <div className={styles.detailGrid}>
          {Object.entries(user).map(([key, value]) => (
            <div className={styles.row} key={key}>
              <span className={styles.label}>{key}:</span>
              <span className={styles.value}>
                {value === undefined || value === null || value === "" ? "N/A" : String(value)}
              </span>
            </div>
          ))}
        </div>

        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
