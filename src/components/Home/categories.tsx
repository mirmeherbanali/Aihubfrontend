"use client";

import React from "react";
import styles from "../../components/ui/style/categoryCard.module.scss";

interface Category {
  _id: string;
  categoryName: string;
  icon?: JSX.Element;
}

interface CategoriesProps {
  categoryData: Category[];
  onViewAll: (slug: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categoryData, onViewAll }) => {
  console.log("categoryData",categoryData)
  return (
    <section className={styles.categoriesSection}>
      <h1 className={styles.heading}>Top Categories</h1>
      <div className={styles.grid}>
        {categoryData.map((cat) => (
          <div
            key={cat._id}
            className={styles.card}
            onClick={() => onViewAll(cat.categoryName)}
          >
            <div className={styles.icon}>{cat.icon || "📌"}</div>
            <p>{cat.categoryName}</p>
          </div>
        ))}
      </div>

      <div className={styles.viewAllWrapper}>
        <button
          className={styles.viewAllBtn}
          onClick={() =>
            categoryData.length > 0 && onViewAll(categoryData[0].categoryName)
          }
        >
          View All <span>›</span>
        </button>
      </div>
    </section>
  );
};

export default Categories;
