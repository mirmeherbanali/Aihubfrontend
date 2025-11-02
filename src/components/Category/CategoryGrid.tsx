"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../components/ui/style/CategoryGrid.module.scss";


interface CategoryGridProps {
  title: string;
  items: any[];
  onSelect?: (item: any) => void;
  searchQuery?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  title,
  items,
  onSelect,
  searchQuery = "",
}) => {
  const router = useRouter();

  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const handleClick = (item: any) => {
    onSelect?.(item);
    const slug =
      item.categoryName
        .toLowerCase()
    router.push(`/categories/${slug}`); // 👈 navigate dynamically
  };

  return (
    <section className={styles.categoryGrid}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <button
            key={index}
            className={styles.gridItem}
            onClick={() => handleClick(item)}
            dangerouslySetInnerHTML={{
              __html: highlightMatch(item.categoryName),
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
