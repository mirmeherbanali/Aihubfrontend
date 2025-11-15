"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./style/RatingInput.module.scss";

interface RatingInputProps {
  value?: number;
  onChange: (value: number) => void;
  label?: string;
}

const RatingInput: React.FC<RatingInputProps> = ({ value = 0, onChange, label }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className={styles.ratingWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={24}
            color={star <= (hover || value) ? "#facc15" : "#e4e4e7"}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(star)}
            className={styles.star}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingInput;
