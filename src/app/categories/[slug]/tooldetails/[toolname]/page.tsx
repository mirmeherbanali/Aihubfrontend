"use client";

import React, { useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import styles from "@/components/ui/style/ToolPageDetails.module.scss";
import ToolCardHeader from "@/components/Category/details/ToolCardHeader";
import ToolMainContent from "@/components/Category/details/ToolMainContent";
import ToolRightSidebar from "@/components/Category/details/ToolRightSidebar";
import { useGetAllCategoriesQuery, useGetCategoryByIdQuery } from "@/features/dashboard/category/categoryApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { getUserId, getUserType } from "@/utils/authStorage";
import { useGetToolReviewsQuery } from "@/features/review/reviewApi";

const ToolDetailsPage = () => {
  const { slug, toolname } = useParams();
  const userType = getUserType()
  const userId = getUserId()
  
  // Memoize decoded values
  const { decodedSlug, decodedToolName } = useMemo(() => ({
    decodedSlug: decodeURIComponent(slug as string),
    decodedToolName: decodeURIComponent(toolname as string)
  }), [slug, toolname]);

  // Fetch all categories
  const { data: allCategories, isLoading: catLoading, isError: catError } = useGetAllCategoriesQuery();

  // Find category and its ID
  const { category, categoryId } = useMemo(() => {
    const foundCategory = allCategories?.result?.list?.find(
      (cat: any) => cat.categoryName?.toLowerCase() === decodedSlug.toLowerCase()
    );
    return {
      category: foundCategory,
      categoryId: foundCategory?._id
    };
  }, [allCategories, decodedSlug]);

  // Fetch category details
  const { data: categoryDetail, isLoading: detailLoading, isError: detailError } =
    useGetCategoryByIdQuery(categoryId ? { categoryId } : skipToken);

  // Find the current tool and compute alternatives
  const { tool, alternativeTools } = useMemo(() => {
    const tools = categoryDetail?.result?.list?.tools || [];
    const foundTool = tools.find(
      (t: any) => t.toolName?.toLowerCase() === decodedToolName.toLowerCase()
    );
    
    const alternatives = foundTool ? tools
      .filter((t: any) => String(t._id) !== String(foundTool._id))
      .slice(0, 4) : [];

    return { tool: foundTool, alternativeTools: alternatives };
  }, [categoryDetail, decodedToolName]);

  // ✅ Call hook with object (matches injected endpoint signature)
    const { data: reviewsData, isLoading: isReviewsLoading } = useGetToolReviewsQuery(
      { toolId: tool?._id }
    )

  // Handle loading
  if (catLoading || detailLoading) return <Loader />;

  // Handle errors (after all hooks)
  if (catError || !allCategories?.result?.list) return notFound();
  if (!category) return notFound();
  if (detailError || !categoryDetail?.result?.list?.tools) return notFound();
  if (!tool) return notFound();

  const handleViewAll = () => {
    window.open(`/categories/${encodeURIComponent(category.categoryName)}`, "_blank");
  };

  return (
    <div className={styles.toolPage}>
      <header className={styles.headerSection}>
        <ToolCardHeader tool={tool} category={category} userType={userType??""} userId={userId??""}/>
      </header>
      <div className={styles.pageLayout}>
        <main className={styles.mainSection}>
          <ToolMainContent tool={tool}  reviewsData={reviewsData} isReviewsLoading={isReviewsLoading} />
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