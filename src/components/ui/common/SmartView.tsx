// components/ui/SmartViewModal.tsx
"use client";

import React from "react";
import styles from "../style/SmartViewModal.module.scss";

type SmartViewModalProps = {
  title?: string;
  data: Record<string, any>;
  onClose: () => void;
};

export default function SmartViewModal({ title, data, onClose }: SmartViewModalProps) {
  const renderValue = (value: any): React.ReactNode => {
    if (Array.isArray(value)) {
      return (
        <ul className={styles.list}>
          {value.map((item, i) => (
            <li key={i}>{typeof item === "object" ? renderValue(item) : String(item)}</li>
          ))}
        </ul>
      );
    }
    if (typeof value === "object" && value !== null) {
      return (
        <div className={styles.object}>
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className={styles.field}>
              <strong>{k}:</strong> {renderValue(v)}
            </div>
          ))}
        </div>
      );
    }
    return String(value);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title || "View Details"}</h2>
          <button onClick={onClose} className={styles.closeBtn}>×</button>
        </div>

        <div className={styles.content}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className={styles.field}>
              <strong>{key}:</strong> {renderValue(value)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
