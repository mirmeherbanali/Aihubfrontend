"use client";

import React from "react";
import Link from "next/link";
import styles from "../../components/ui/style/categoryCard.module.scss";

import { FaImage, FaVideo, FaMusic, FaPenNib } from "react-icons/fa";

interface Category {
  _id: string;
  categoryName: string;
}

interface CategoriesProps {
  categoryData: Category[];
}

const iconList = [<FaImage />, <FaVideo />, <FaMusic />, <FaPenNib />];

const Categories: React.FC<CategoriesProps> = ({ categoryData }) => {
  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.heading}>Top Categories</h2>
      <div className={styles.categoryUnderline}></div>

      <div className={styles.grid}>
        {categoryData.slice(0, 4).map((cat, index) => (
          <Link
            key={cat._id}
            href={`/categories/${encodeURIComponent(cat.categoryName)}`}
            className={styles.cardContainer}
          >
            <div className={styles.cardBox}>
              <div className={styles.icon}>{iconList[index]}</div>
              <p className={styles.title}>{cat.categoryName}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.viewAllWrapper}>
        <Link href="/categories" className={styles.viewBtn}>
          View All <span>›</span>
        </Link>
      </div>
    </section>
  );
};

export default Categories;
