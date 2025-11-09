// src/utils/useRatingData.ts
"use client";

import { useMemo } from "react";

/**
 * 🔹 A reusable hook to extract review list, average rating, star breakdown, and review count.
 * Use this in any component that needs dynamic rating display.
 */
export const useRatingData = (reviewsData?: any, tool?: any) => {
  // ✅ Extract list safely
  const reviewsList = useMemo(() => {
    const candidate = reviewsData?.result?.list ?? reviewsData?.result;
    return Array.isArray(candidate) ? candidate : [];
  }, [reviewsData]);

  // ✅ Calculate average rating safely
  const averageRating = useMemo(() => {
    if (!reviewsList.length) {
      return typeof tool?.rating === "number" ? tool.rating : 0;
    }
    const total = reviewsList.reduce((sum: number, item: any) => {
      const r = Number(item?.rating ?? 0);
      return sum + (isNaN(r) ? 0 : r);
    }, 0);
    return total / reviewsList.length;
  }, [reviewsList, tool]);

  // ✅ Derived values for stars and counts
  const rating = averageRating || 0;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const reviewCount = reviewsList.length;

  return {
    reviewsList,
    averageRating,
    rating,
    fullStars,
    halfStar,
    emptyStars,
    reviewCount,
  };
};
