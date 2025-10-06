"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "../../../components/ui/style/RatingPage.module.scss";

export default function RatingPage() {
  const [selectedTool, setSelectedTool] = useState("Tool C");
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");

  const tools = ["Tool A", "Tool B", "Tool C"];

  return (
    <DashboardLayout>
      <div className={styles.ratingContainer}>
        <h2 className={styles.title}>Tools You Have Rated & Reviewed</h2>

        {/* Tool Cards */}
        <div className={styles.toolsGrid}>
          {tools.map((tool) => (
            <div
              key={tool}
              className={`${styles.toolCard} ${
                selectedTool === tool ? styles.active : ""
              }`}
              onClick={() => setSelectedTool(tool)}
            >
              <div className={styles.imagePlaceholder}></div>
              <p>{tool}</p>
              <button className={styles.deleteIcon}>🗑️</button>
            </div>
          ))}
        </div>

        {/* Selected Tool Section */}
        <div className={styles.reviewSection}>
          <h3>{selectedTool}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          {/* Star Rating */}
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`${styles.star} ${
                  rating >= num ? styles.filled : ""
                }`}
                onClick={() => setRating(num)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Review Textarea */}
          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {/* Update Button */}
          <button className={styles.updateBtn}>Update →</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
