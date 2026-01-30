"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../components/ui/style/CategoryGrid.module.scss";
import { slugify } from "@/utils/useEncodeUrl";

interface CategoryGridProps {
  title?: string;
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
  const [loadingItem, setLoadingItem] = useState<string | null>(null);

  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const handleClick = (item: any) => {
    setLoadingItem(item._id);
    onSelect?.(item);
  };

  return (
    <section className={styles.categorySection}>
      {title && <h2 className={styles.heading}>{title}</h2>}

      <div className={styles.grid}>
        {items?.map((item) => {
          const isLoading = loadingItem === item._id;

          return (
            <Link
              key={item._id}
              href={`/category/${slugify(item?.categoryName)}`}
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
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
