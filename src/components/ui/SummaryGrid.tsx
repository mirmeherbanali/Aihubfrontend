"use client";

import React from "react";
import styles from "./style/ToolsPage.module.scss";

interface SummaryItem {
  title: string;
  value: string | number;
  className?: string;
  style?: React.CSSProperties;
}

interface SummaryGridProps {
  items: SummaryItem[];
  className?: string;
  style?: React.CSSProperties;
}

const SummaryGrid: React.FC<SummaryGridProps> = ({
  items,
  className,
  style,
}) => {
  return (
    <div className={`${styles.summaryRow} ${className || ""}`} style={style}>
      {items?.map((item, index) => (
        <div
          key={index}
          className={`${styles.summaryCard} ${item.className || ""}`}
          style={item.style}
        >
          <h3>{item.title}</h3>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryGrid;
