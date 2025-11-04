"use client";
import React from "react";
import styles from "../../ui/style/ToolCardHeader.module.scss";
import {
  FaStar,
  FaStarHalf,
  FaRegStar,
  FaArrowUpRightFromSquare
} from "react-icons/fa6";

const ToolCardHeader = () => {
  return (
    <div className={styles.toolCard}>
      <div className={styles.toolLeft}>
        <img
          src="https://via.placeholder.com/80"
          alt="Tool Logo"
          className={styles.toolLogo}
        />
        <div className={styles.toolInfo}>
          <h3 className={styles.toolName}>Tool C</h3>
        </div>
      </div>

      <div className={styles.toolRight}>
        <div className={styles.ratingSection}>
          <div className={styles.stars}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
            <FaRegStar />
          </div>
          <div className={styles.ratingText}>3.5/5</div>
          <div className={styles.reviewCount}>(721)</div>
        </div>

        <button className={styles.visitBtn}>
          Visit <FaArrowUpRightFromSquare />
        </button>
      </div>
    </div>
  );
};

export default ToolCardHeader;
