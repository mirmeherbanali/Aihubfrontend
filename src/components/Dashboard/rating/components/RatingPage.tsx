"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaStar } from "react-icons/fa";
import moment from "moment";

import styles from "../../../ui/style/RatingPage.module.scss";
import {
  useGetUserReviewsQuery,
  useUpdateReviewMutation,
} from "@/features/review/reviewApi";
import { getUserId } from "@/utils/authStorage";
import { reviewSchema, ReviewInput } from "@/lib/validators/reviewValidator";
import DynamicForm from "@/components/ui/DynamicForm";
import { FormField } from "@/types/form.types";
import { reviewFields } from "@/lib/review/fields/formFields";
import StarRating from "@/components/ui/common/StarRating";
import { formatReviewDate } from "@/utils/useFormatDate";

const RatingPage = () => {
  const userId = getUserId() ?? "";
  const { data: reviewsData, isLoading } = useGetUserReviewsQuery({ userId });
  const [updateReview, { isLoading: isSubmitLoading }] = useUpdateReviewMutation();

  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);

  const reviewForm = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    mode: "onBlur",
  });

  // ✅ Extract reviews safely
  const reviewsList = useMemo(() => {
    const candidate = reviewsData?.result?.list ?? reviewsData?.result;
    return Array.isArray(candidate) ? candidate : [];
  }, [reviewsData]);

  if (isLoading) return <div className={styles.loading}>Loading your reviews...</div>;
  if (!reviewsList.length)
    return <div className={styles.noReviews}>You haven’t reviewed any tools yet.</div>;
console.log("selectedToolId",selectedToolId)
  // ✅ Handle Review Update — only pass edit ID + tool ID separately
  const handleUpdate = async (data: ReviewInput) => {
    if (!editingReviewId || !selectedToolId) return;
    try {
      await updateReview({
      toolId: selectedToolId,
        userId: userId ?? "",
        ...data,
    }).unwrap()
      setEditingReviewId(null);
      setSelectedToolId(null);
      reviewForm.reset();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update review");
    }
  };

 return (
  <div className={styles.ratingContainer}>
    <h2 className={styles.title}>Tools You Have Rated & Reviewed</h2>

    {/* 🔹 Tools Grid */}
    <div className={styles.toolsGrid}>
      {reviewsList.map((review: any) => {
        const { relative, formatted } = formatReviewDate(review.createdAt);

        return (
          <div
            key={review._id}
            className={`${styles.toolCard} ${
              selectedToolId === review.toolId._id ? styles.active : ""
            }`}
            onClick={() => {
              setSelectedToolId(review.toolId._id);
              setRating(review.rating);
              setEditingReviewId(review._id);
              reviewForm.setValue("rating", review.rating);
              reviewForm.setValue("reviewText", review.reviewText || "");
            }}
          >
            {/* 🧩 Left: Logo + Tool Name */}
            <div className={styles.toolLeft}>
              <div className={styles.imagePlaceholder}>
                {review.toolId.logo ? (
                  <img src={review.toolId.logo} alt={review.toolId.toolName} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <p className={styles.toolName}>{review.toolId.toolName}</p>
            </div>

            {/* ⭐ Right: Rating + Date */}
            <div className={styles.toolRight}>
              <StarRating rating={review.rating} size="sm" />
              <p className={styles.reviewDate}>
                Reviewed {relative}, {formatted}
              </p>
            </div>

            {/* 🗑️ Delete Icon */}
            <button
              className={styles.deleteIcon}
              onClick={(e) => {
                e.stopPropagation();
                alert(`Delete review for ${review.toolId.toolName}`);
              }}
            >
              🗑️
            </button>
          </div>
        );
      })}
    </div>

    {/* 🔹 Review Editing Section */}
    {selectedToolId && (
      <div className={styles.reviewSection}>
        {reviewsList
          .filter((r: any) => r.toolId._id === selectedToolId)
          .map((r: any) => (
            <div key={r._id}>
              <DynamicForm
                fields={reviewFields() as unknown as FormField<ReviewInput>[]}
                control={reviewForm.control}
                handleSubmit={reviewForm.handleSubmit}
                onSubmit={handleUpdate}
                buttonText={isSubmitLoading ? "Updating..." : "Update"}
              />
            </div>
          ))}
      </div>
    )}
  </div>
);

};

export default RatingPage;
