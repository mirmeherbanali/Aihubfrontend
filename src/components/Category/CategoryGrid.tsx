import React from "react";
import styles from "../../components/ui/style/CategoryGrid.module.scss";
import { useRouter } from "next/navigation";

interface CategoryGridProps {
  title: string;
  items: string[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ title, items }) => {
  const router = useRouter();

  return (
    <section className={styles.categoryGrid}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <button
            onClick={() => {
              router.push(`/categories/${item}`);
            }}
            key={index}
            className={styles.gridItem}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
