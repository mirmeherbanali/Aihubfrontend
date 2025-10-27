"use client";
import React from "react";
import styles from "@/components/ui/style/ToolRightSidebar.module.scss";

const ToolRightSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Tool C Alternatives</h2>

      <div className={styles.cardList}>
        {[1, 2, 3, 4, 5].map((i, index) => (
          <div key={index} className={styles.altCard}>
            <div className={styles.cardImage}></div>
            <div className={styles.cardText}>
              {index === 4 ? (
                <>
                  <span className={styles.visitText}>Visit</span>
                  <span className={styles.cardTitle}>Tool A</span>
                </>
              ) : (
                <span className={styles.cardTitle}>Tool A</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className={styles.viewAllBtn}>View All &gt;</button>
    </aside>
  );
};

export default ToolRightSidebar;
