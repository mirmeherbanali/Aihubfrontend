"use client";

import React from "react";
import styles from "@/components/ui/style/ReviewSection.module.scss";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";
import { useRatingData } from "@/utils/useRatingData";
import { formatReviewDate } from "@/utils/useFormatDate";
import StarRating from "@/components/ui/common/StarRating";

interface ReviewSectionProps {
  tool: any;
  reviewsData: any;
  isReviewsLoading?: boolean;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  tool,
  reviewsData,
  isReviewsLoading,
}) => {
  const {
    reviewsList,
    averageRating,
    rating,
    fullStars,
    halfStar,
    emptyStars,
    reviewCount,
  } = useRatingData(reviewsData, tool);

  if (isReviewsLoading) {
    return <div className={styles.loading}>Loading reviews...</div>;
  }

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.reviewHeader}>Reviews</h2>

      {/* ⭐ Rating Summary Section (Dynamic) */}
      <div className={styles.ratingSummary}>
        <div className={styles.leftSummary}>
          <h1 className={styles.avgRating}>{rating.toFixed(1)}</h1>

          <StarRating  rating={rating} size="lg"  />

          <p className={styles.totalReviews}>{reviewCount} total reviews</p>
        </div>
      </div>

      {/* ✅ Dynamic Review List */}
      <div className={styles.reviewList}>
        {reviewsList.length === 0 ? (
          <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>
        ) : (
          reviewsList.map((review: any, index: number) => {
            const { relative, formatted } = formatReviewDate(review?.createdAt);

            return (
              <div className={styles.reviewCard} key={index}>
                <div className={styles.avatar}>
                  {review?.userId?.email?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className={styles.reviewInfo}>
                  <div className={styles.reviewHeaderRow}>
                    <div>
                      <h4>{review?.userId?.email || "Anonymous User"}</h4>
                      <p>
                        {relative} • <span>{formatted}</span>
                      </p>
                    </div>
                  </div>

                  <StarRating rating={review.rating} size="sm" showValue  />

                  {review.reviewText && (
                    <p className={styles.reviewText}>{review.reviewText}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
