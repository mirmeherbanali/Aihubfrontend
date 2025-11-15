"use client";

import React from "react";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";
import styles from "../style/StarRating.module.scss";

interface StarRatingProps {
  /** Rating value (e.g., 3.5 or 4) */
  rating?: number;

  /** Optional size of stars */
  size?: "sm" | "md" | "lg";

  /** Show numeric value (like 3/5) */
  showValue?: boolean;
  totalReviews?: number;

  /** Custom class for styling */
  className?: string;

  /** Custom colors */
  colorFilled?: string;
  colorEmpty?: string;
  colorHalf?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  size = "md",
  showValue = false,
  totalReviews = 0,
  className = "",
  colorFilled = "#f5c518",
  colorEmpty = "#d1d5db",
  colorHalf = "#f5c518",
}) => {
  // ✅ Ensure rating stays between 0 and 5
  const safeRating = Math.min(Math.max(rating, 0), 5);

  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0));

  // ✅ Rounded display value (for “3/5”, “4/5”)
  const roundedDisplay = Math.round(safeRating);


  return (
    <div
      className={`${styles.stars} ${styles[size]} ${className}`}
      title={`Exact rating: ${safeRating.toFixed(1)}/5`}
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar
          key={`full-${i}`}
          style={{ color: colorFilled }}
          className={styles.starIcon}
        />
      ))}

      {halfStar && (
        <FaStarHalf
          style={{ color: colorHalf }}
          className={styles.starIcon}
        />
      )}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar
          key={`empty-${i}`}
          style={{ color: colorEmpty }}
          className={styles.starIcon}
        />
      ))}

      {showValue && (
        <span className={styles.value}>
          {roundedDisplay}/5
        </span>
      )}
      {totalReviews > 0 && (
  <span className={styles.value}>
    ({totalReviews})
  </span>
)}

    </div>
  );
};

export default StarRating;
