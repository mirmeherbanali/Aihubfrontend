"use client";

import React, { useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import styles from "@/components/ui/style/ToolPageDetails.module.scss";

import ToolCardHeader from "@/components/Category/details/ToolCardHeader";
import ToolMainContent from "@/components/Category/details/ToolMainContent";
import ToolRightSidebar from "@/components/Category/details/ToolRightSidebar";

import { useGetAllCategoriesQuery, useGetCategoryByIdQuery } from "@/features/dashboard/category/categoryApi";
import { useGetToolReviewsQuery } from "@/features/review/reviewApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { getUserId, getUserType } from "@/utils/authStorage";

const ToolDetailsPage = () => {
  const { slug, toolname } = useParams();

  const userId = getUserId();
  const userType = getUserType();

  // Decode values
  const decoded = useMemo(
    () => ({
      slug: decodeURIComponent(slug as string),
      toolName: decodeURIComponent(toolname as string),
    }),
    [slug, toolname]
  );

  // Fetch categories
  const { data: allCategories, isLoading: catLoading, isError: catError } = useGetAllCategoriesQuery();

  // Find category + ID
  const { category, categoryId } = useMemo(() => {
    const found = allCategories?.result?.list?.find(
      (c: any) => c.categoryName?.toLowerCase() === decoded.slug.toLowerCase()
    );
    return {
      category: found,
      categoryId: found?._id,
    };
  }, [allCategories, decoded.slug]);

  // Fetch category details
  const { data: categoryDetail, isLoading: detailLoading, isError: detailError } =
    useGetCategoryByIdQuery(categoryId ? { categoryId } : skipToken);

  // Find tool + alternatives
  const { tool, alternativeTools } = useMemo(() => {
    const tools = categoryDetail?.result?.list?.tools || [];

    const foundTool = tools.find(
      (t: any) => t.toolName?.toLowerCase() === decoded.toolName.toLowerCase()
    );

    const alt = foundTool
      ? tools.filter((t: any) => String(t._id) !== String(foundTool._id)).slice(0, 4)
      : [];

    return { tool: foundTool, alternativeTools: alt };
  }, [categoryDetail, decoded.toolName]);

  // Fetch reviews with correct hook usage
  const { data: reviewsData, isLoading: isReviewsLoading } = useGetToolReviewsQuery(
    tool?._id ? { toolId: tool?._id } : skipToken
  );

  // Loading & Errors
  if (catLoading || detailLoading) return <Loader />;

  if (catError || !category || detailError || !tool) return notFound();

  const handleViewAll = () => {
    window.open(`/categories/${encodeURIComponent(category.categoryName)}`, "_blank");
  };

  return (
    <div className={styles.toolPage}>
      <header className={styles.headerSection}>
        <ToolCardHeader tool={tool} category={category} userId={userId ?? ""} userType={userType ?? ""} />
      </header>

      <div className={styles.pageLayout}>
        <main className={styles.mainSection}>
          <ToolMainContent tool={tool} reviewsData={reviewsData} isReviewsLoading={isReviewsLoading} />
        </main>

        <aside className={styles.sidebarSection}>
          <ToolRightSidebar
            tool={tool}
            category={{ ...category, tools: alternativeTools }}
            onViewAll={handleViewAll}
          />
        </aside>
      </div>
    </div>
  );
};

export default ToolDetailsPage;
