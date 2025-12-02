"use client";

import React, { useState } from "react";
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
  const [loadingItem, setLoadingItem] = useState<string | null>(null);

  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const handleClick = async (item: any) => {
    if (loadingItem) return;

    setLoadingItem(item._id);
    onSelect?.(item);

    try {
      await router.push(`/categories/${item.categoryName.toLowerCase()}`);
    } catch (e) {
      console.error(e);
      setLoadingItem(null);
    }
  };

  return (
    <section className={styles.categorySection}>
      <h2 className={styles.heading}>{title}</h2>

      <div className={styles.grid}>
        {items?.map((item) => {
          const isLoading = loadingItem === item._id;

          return (
            <button
              key={item._id}
              className={`${styles.card} ${isLoading ? styles.loading : ""}`}
              onClick={() => handleClick(item)}
            >
              {isLoading ? (
                <div className={styles.loader}>
                  <span></span><span></span><span></span>
                </div>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(item.categoryName),
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
