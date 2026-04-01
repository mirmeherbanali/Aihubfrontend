"use client";

import React from "react";
import styles from "../../components/ui/style/CategoryGrid.module.scss";

const CategoryGridSkeleton = () => {
  return (
    <section className={styles.categorySection}>
      <h2 className={styles.heading}>All Categories</h2>
      <div className={styles.grid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    </section>
  );
};

export default CategoryGridSkeleton;
