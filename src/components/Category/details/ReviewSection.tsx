"use client";
import React from "react";
import styles from "@/components/ui/style/ReviewSection.module.scss";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewSection = () => {
  const reviews = [
    {
      name: "Reviewer Name",
      role: "Reviewer Role",
      company: "Reviewer Company Name",
      date: "12/27/2025",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non tortor sodales, tempor orci et, facilisis odio. Suspendisse varius, nibh finibus tincidunt lobortis, sapien nunc maximus eros, vulputate tempor lectus elit sed elit."
    },
    {
      name: "Reviewer Name",
      role: "Reviewer Role",
      company: "Reviewer Company Name",
      date: "12/27/2025",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non tortor sodales, tempor orci et, facilisis odio."
    },
    {
      name: "Reviewer Name",
      role: "Reviewer Role",
      company: "Reviewer Company Name",
      date: "12/27/2025",
      rating: 4,
      text: "Suspendisse varius, nibh finibus tincidunt lobortis, sapien nunc maximus eros, vulputate tempor lectus elit sed elit."
    }
  ];

  const ratingCounts = [290, 380, 30, 11, 10];
  const totalReviews = ratingCounts.reduce((a, b) => a + b, 0);
  const averageRating = (
    ratingCounts.reduce((a, b, i) => a + b * (5 - i), 0) / totalReviews
  ).toFixed(1);

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.reviewHeader}>Reviews</h2>

      {/* ⭐ New Rating Summary Section */}
      <div className={styles.ratingSummary}>
        <div className={styles.leftSummary}>
          <h1 className={styles.avgRating}>{averageRating}</h1>
          <div className={styles.avgStars}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={styles.starIcon} />
            ))}
          </div>
          <p className={styles.totalReviews}>{totalReviews} total ratings</p>
        </div>

        <div className={styles.rightBars}>
          {ratingCounts.map((count, i) => {
            const ratingValue = 5 - i;
            return (
              <div className={styles.barItem} key={i}>
                <span className={styles.barLabel}>{ratingValue} ★</span>
                <div className={styles.bar}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${(count / totalReviews) * 100}%` }}
                  ></div>
                </div>
                <span className={styles.barCount}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review List */}
      <div className={styles.reviewList}>
        {reviews.map((review, index) => (
          <div className={styles.reviewCard} key={index}>
            <div className={styles.avatar}>C</div>
            <div className={styles.reviewInfo}>
              <div className={styles.reviewHeaderRow}>
                <div>
                  <h4>{review.name}</h4>
                  <p>
                    {review.role} <br /> {review.company}
                  </p>
                </div>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>

              <div className={styles.ratingRow}>
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className={styles.starFilled} />
                ))}
                <FaRegStar className={styles.starEmpty} />
                <span className={styles.ratingValue}>4/5</span>
              </div>

              <p className={styles.reviewText}>{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button>{"<"}</button>
        {[1, 2, 3, 4, 5].map((num) => (
          <button key={num} className={num === 1 ? styles.active : ""}>
            {num}
          </button>
        ))}
        <button>{">"}</button>
      </div>
    </div>
  );
};

export default ReviewSection;
