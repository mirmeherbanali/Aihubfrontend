"use client";

import React, { useState, useMemo } from "react";
import styles from "../../ui/style/ToolCardHeader.module.scss";
import {
  FaStar,
  FaStarHalf,
  FaRegStar,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, ReviewInput } from "@/lib/validators/reviewValidator";
import { reviewFields } from "@/lib/review/fields/formFields";
import DynamicForm from "@/components/ui/DynamicForm";
import {
  useAddReviewMutation
} from "@/features/review/reviewApi";
import { FormField } from "@/types/form.types";
import { useRatingData } from "@/utils/useRatingData";
import StarRating from "@/components/ui/common/StarRating";

interface ToolCardHeaderProps {
  tool: any;
  category: any;
  userType?: string;
  userId?: string;
  reviewsData?:any;
  isReviewsLoading?:boolean;

}

const ToolCardHeader: React.FC<ToolCardHeaderProps> = ({
  tool,
  category,
  userType,
  userId,
  reviewsData,
  isReviewsLoading
}) => {
  const [showReview, setShowReview] = useState(false);
  const [addReview, { isLoading }] = useAddReviewMutation();
  const reviewForm = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    mode: "onBlur",
  });
  const { rating, fullStars, halfStar, emptyStars, reviewCount } = useRatingData(reviewsData, tool);

  const handleReviewSubmit = async (data: ReviewInput) => {
    try {
      const response = await addReview({
        toolId: tool._id,
        userId: userId ?? "",
        ...data,
      }).unwrap();

      console.log("✅ Review Added:", response);
      reviewForm.reset();
      setShowReview(false);
    } catch (error) {
      console.error("❌ Review Error:", error);
    }
  };

  if (!tool || !category) return null;



  return (
    <>
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
            {isReviewsLoading ? (
              <div className={styles.loadingText}>Loading...</div>
            ) : (
              <> 
               <StarRating rating={rating} size="sm"  />


                <div className={styles.ratingText}>{rating.toFixed(1)}/5</div>
                <div className={styles.reviewCount}>({reviewCount})</div>
              </>
            )}
          </div>

          {/* ✅ Only show Review button if userType === "Reviewer" */}
          {userType === "Reviewer" && (
            <button
              className={styles.visitBtn}
              onClick={() => setShowReview(true)}
            >
              Review <FaArrowUpRightFromSquare />
            </button>
          )}
        </div>
      </div>

      {/* ✅ Review Modal Popup */}
      {showReview && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <DynamicForm
              fields={reviewFields() as unknown as FormField<ReviewInput>[]}
              control={reviewForm.control}
              handleSubmit={reviewForm.handleSubmit}
              onSubmit={handleReviewSubmit}
              buttonText={isLoading ? "Submitting..." : "Submit"}
            />
            <button
              className={styles.closeModalBtn}
              onClick={() => setShowReview(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ToolCardHeader;
