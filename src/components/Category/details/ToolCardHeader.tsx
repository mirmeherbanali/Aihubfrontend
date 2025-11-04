"use client";

import React from "react";
import styles from "../../ui/style/ToolCardHeader.module.scss";
import {
  FaStar,
  FaStarHalf,
  FaRegStar,
  FaArrowUpRightFromSquare
} from "react-icons/fa6";

interface ToolCardHeaderProps {
  tool: any;      // You can replace 'any' with your tool type
  category: any;  // You can replace 'any' with your category type
}

const ToolCardHeader: React.FC<ToolCardHeaderProps> = ({ tool, category }) => {
  if (!tool || !category) return null; // Safety check for progressive loading

  console.log("tool",tool)
  // Example: dynamically compute star rating
  const rating = tool.rating || 3.5; // default if no rating
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={styles.toolCard}>
      <div className={styles.toolLeft}>
        <img
          src={tool.logo || "https://via.placeholder.com/80"}
          alt={tool.toolName || "Tool Logo"}
          className={styles.toolLogo}
        />
        <div className={styles.toolInfo}>
          <h3 className={styles.toolName}>{tool.toolName || "Tool Name"}</h3>
          <p className={styles.categoryName}>{category.categoryName}</p>
        </div>
      </div>

      <div className={styles.toolRight}>
        <div className={styles.ratingSection}>
          <div className={styles.stars}>
            {Array(fullStars).fill(null).map((_, i) => (
              <FaStar key={"full-" + i} />
            ))}
            {halfStar && <FaStarHalf />}
            {Array(emptyStars).fill(null).map((_, i) => (
              <FaRegStar key={"empty-" + i} />
            ))}
          </div>
          <div className={styles.ratingText}>{rating.toFixed(1)}/5</div>
          <div className={styles.reviewCount}>({tool.reviewCount || 0})</div>
        </div>

        <a
          href={tool.website || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.visitBtn}
        >
          Visit <FaArrowUpRightFromSquare />
        </a>
      </div>
    </div>
  );
};

export default ToolCardHeader;
