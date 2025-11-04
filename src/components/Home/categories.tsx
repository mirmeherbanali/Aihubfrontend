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
  onCategoryClick: (slug: string) => void;
  onViewAllClick: () => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categoryData,
  onCategoryClick,
  onViewAllClick,
}) => {
  console.log("categoryData", categoryData);

  return (
    <section className={styles.categoriesSection}>
      <h1 className={styles.heading}>Top Categories</h1>

      <div className={styles.grid}>
        {categoryData.map((cat) => (
          <div
            key={cat._id}
            className={styles.card}
            onClick={() => onCategoryClick(cat.categoryName)} // 👈 only category click
          >
            <div className={styles.icon}>{cat.icon || "📌"}</div>
            <p>{cat.categoryName}</p>
          </div>
        ))}
      </div>

      <div className={styles.viewAllWrapper}>
        <button
          type="button"
          className={styles.viewAllBtn}
          onClick={() => onViewAllClick()} // 👈 only view all click
        >
          View All <span>›</span>
        </button>
      </div>
    </section>
  );
};

export default Categories;
