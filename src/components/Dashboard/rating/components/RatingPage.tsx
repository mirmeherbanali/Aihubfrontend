"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "../../../ui/style/RatingPage.module.scss";

interface Tool {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

interface RatingPageProps {
  toolsList: Tool[];
}

const RatingPage: React.FC<RatingPageProps> = ({ toolsList }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(
    toolsList.length ? toolsList[0] : null
  );
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");

  return (
    <div className={styles.ratingContainer}>
      <h2 className={styles.title}>Tools You Have Rated & Reviewed</h2>

      {/* Tool Cards */}
      <div className={styles.toolsGrid}>
        {toolsList.map((tool) => (
          <div
            key={tool.id}
            className={`${styles.toolCard} ${
              selectedTool?.id === tool.id ? styles.active : ""
            }`}
            onClick={() => setSelectedTool(tool)}
          >
            <div className={styles.imagePlaceholder}>
              {tool.image ? (
                <img src={tool.image} alt={tool.name} />
              ) : (
                <span>No Image</span>
              )}
            </div>
            <p>{tool.name}</p>
            <button
              className={styles.deleteIcon}
              onClick={(e) => {
                e.stopPropagation();
                alert(`Deleted ${tool.name}`);
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Selected Tool Section */}
      {selectedTool && (
        <div className={styles.reviewSection}>
          <h3>{selectedTool.name}</h3>
          <p>
            {selectedTool.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>

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
          <button
            className={styles.updateBtn}
            onClick={() =>
              alert(
                `Updated ${selectedTool.name} with ${rating}⭐ rating and review: ${review}`
              )
            }
          >
            Update →
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingPage;
