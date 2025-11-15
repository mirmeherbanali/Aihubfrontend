"use client";

import React from "react";
import styles from "./style/ToolsPage.module.scss";

export interface GridItem {
  id: number | string;
  title: string;
  image?: string | File;
  placeholder?: React.ReactNode;
}

interface GridCardsProps<T extends GridItem = GridItem> {
  data: T[];
  activeIndex?: number | null;
  onSelect?: (item: T, index: number) => void;
  onAdd?: () => void;
  addLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const GridCards = <T extends GridItem>({
  data,
  activeIndex,
  onSelect,
  onAdd,
  addLabel = "Add New",
  className,
  style,
}: GridCardsProps<T>) => {
  return (
    <div className={`${styles.toolsGrid} ${className || ""}`} style={style}>
      {data.map((item, i) => (
        <div
          key={item.id}
          className={`${styles.toolCard} ${
            activeIndex === i ? styles.activeCard : ""
          }`}
          onClick={() => onSelect && onSelect(item, i)}
        >
          {item.image ? (
            <img
              src={
                typeof item.image === "string"
                  ? item.image
                  : URL.createObjectURL(item.image)
              }
              alt={item.title}
              className={styles.toolImage}
            />
          ) : (
            <div className={styles.placeholder}>
              {item.placeholder || "🧩"}
            </div>
          )}
          <p className={styles.toolName}>{item.title}</p>
        </div>
      ))}

      {onAdd && (
        <div className={styles.addCard} onClick={onAdd}>
          <span>＋</span>
          <p>{addLabel}</p>
        </div>
      )}
    </div>
  );
};

export default GridCards;
