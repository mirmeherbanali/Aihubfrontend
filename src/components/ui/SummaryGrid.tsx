"use client";

import React from "react";
import styles from "./style/ToolsPageForDash.module.scss";
import { FaTools, FaClock, FaCheckCircle } from "react-icons/fa";

interface SummaryItem {
  title: string;
  value: string | number;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

interface SummaryGridProps {
  items: SummaryItem[];
  className?: string;
  style?: React.CSSProperties;
}

const iconMap = {
  0: <FaTools />,
  1: <FaClock />,
  2: <FaCheckCircle />,
};

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
          {/* Left Text Section */}
          <div>
            <p className={styles.summaryTitle}>{item.title}</p>
            <p className={styles.summaryValue}>{item.value}</p>
          </div>

          {/* Right Icon */}
          <div className={styles.summaryIcon}>
            {item.icon || iconMap[index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryGrid;
