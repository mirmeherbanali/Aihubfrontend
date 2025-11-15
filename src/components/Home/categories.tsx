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
      {categoryData.slice(0, 4).map((cat) => (
  <div
    key={cat._id}
    className={styles.cardContainer}
    onClick={() => onCategoryClick(cat.categoryName)} // 👈 full card clickable
  >
    <div className={styles.cardEffect}>
      <div className={styles.cardInner}>
        
        <div className={styles.cardLiquid}></div>
        <div className={styles.cardShine}></div>
        <div className={styles.cardGlow}></div>

        <div className={styles.cardContent}>
          
          <div className={styles.cardBadge}>TRENDING</div>

          <div
            className={styles.cardImage}
            style={
              { "--bg-color": "#2979ff" } as React.CSSProperties
            }
          />

          <div className={styles.cardText}>
            <p className={styles.cardTitle}>{cat.categoryName}</p>
            <p className={styles.cardDescription}>
              Experience interactive hover effects
            </p>
          </div>

          {/* <div className={styles.cardFooter}>
            <div className={styles.cardPrice}>$143.99</div>

            <div className={styles.cardButton}>
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M5 12H19M12 5V19"
                  stroke="currentColor"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
          </div> */}

        </div>
      </div>
    </div>
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
