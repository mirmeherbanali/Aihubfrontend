"use client";

import React from "react";
import styles from "../../components/ui/style/categoryCard.module.scss";

import { FaImage, FaVideo, FaMusic, FaPenNib } from "react-icons/fa";

interface Category {
  _id: string;
  categoryName: string;
}

interface CategoriesProps {
  categoryData: Category[];
  onCategoryClick: (slug: string) => void;
  onViewAllClick: () => void;
}

const iconList = [<FaImage />, <FaVideo />, <FaMusic />, <FaPenNib />];

const Categories: React.FC<CategoriesProps> = ({
  categoryData,
  onCategoryClick,
  onViewAllClick,
}) => {
  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.heading}>Top Categories</h2>
      <div className={styles.categoryUnderline}></div>
      <div className={styles.grid}>
        {categoryData.slice(0, 4).map((cat, index) => (
          <div
            key={cat._id}
            className={styles.cardContainer}
            onClick={() => onCategoryClick(cat.categoryName)}
          >
            <div className={styles.cardBox}>
              <div className={styles.icon}>{iconList[index]}</div>
              <p className={styles.title}>{cat.categoryName}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.viewAllWrapper}>
        <button onClick={onViewAllClick} className={styles.viewBtn}>
          View All <span>›</span>
        </button>
      </div>
    </section>
  );
};

export default Categories;
