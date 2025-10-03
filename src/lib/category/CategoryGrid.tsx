import React from "react";
import styles from "../../components/ui/style/CategoryGrid.module.scss";

interface CategoryGridProps {
  title: string;
  items: string[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ title, items }) => {
  return (
    <section className={styles.categoryGrid}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <button key={index} className={styles.gridItem}>
            {item}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
