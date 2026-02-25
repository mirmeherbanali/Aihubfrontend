"use client";

import React, { useState } from "react";
import styles from "@/components/ui/style/ReviewSection.module.scss";
import { useRatingData } from "@/utils/useRatingData";
import { formatReviewDate } from "@/utils/useFormatDate";
import StarRating from "@/components/ui/common/StarRating";
import RadioPagination from "@/components/ui/common/RadioPagination";

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
  const { reviewsList } = useRatingData(reviewsData, tool);

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviewsList.length / reviewsPerPage);

  // Paginate reviews
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviewsList.slice(startIndex, startIndex + reviewsPerPage);

  if (isReviewsLoading) return <div className={styles.loading}>Loading reviews...</div>;

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.reviewHeader}>Reviews</h2>

      {/* ⭐ Rating Summary Section */}
      <div className={styles.ratingSummary}>
        <div className={styles.leftSummary}>
          <span className={styles.avgRating}>{tool?.reviewSummary?.avgRating}</span>
          <StarRating rating={tool?.reviewSummary?.avgRating} size="lg" />
          <p className={styles.totalReviews}>
            {tool?.reviewSummary?.totalReviews} total reviews
          </p>
        </div>

        <div className={styles.rightBars}>
          {Object.entries(tool?.reviewSummary?.ratingBreakdown || {})
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([rating, count]) => {
              const totalReviews = tool?.reviewSummary?.totalReviews || 0;
              const percentage =
                totalReviews > 0 ? (Number(count) / totalReviews) * 100 : 0;

              return (
                <div className={styles.barItem} key={rating}>
                  <span className={styles.barLabel}>{rating} ★</span>
                  <div className={styles.bar}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className={styles.barCount}>{String(count ?? 0)}</span>
                </div>
              );
            })}
        </div>
      </div>

      {/* ✅ Paginated Review List */}
      <div className={styles.reviewList}>
        {currentReviews.length === 0 ? (
          <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>
        ) : (
          currentReviews.map((review: any, index: number) => {
            const { relative, formatted } = formatReviewDate(review?.createdAt);
            return (
              <div className={styles.reviewCard} key={index}>
                <div className={styles.avatar}>
                  {review?.userId?.email?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className={styles.reviewInfo}>
                  <div className={styles.reviewHeaderRow}>
                    <div>
                      <span>{review?.userId?.email || "Anonymous User"}</span>
                      <p>
                        {relative} • <span>{formatted}</span>
                      </p>
                    </div>
                  </div>

                  <StarRating rating={review.rating} size="sm" showValue />

                  {review.reviewText && (
                    <p className={styles.reviewText}>{review.reviewText}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
        
      {/* 🔘 Pagination */}
      {totalPages > 1 && (
        <RadioPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={setCurrentPage}
        />
      )}
      </div>

    </div>
  );
};

export default ReviewSection;
