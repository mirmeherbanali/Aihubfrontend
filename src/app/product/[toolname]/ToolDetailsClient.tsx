"use client";

import React, { useMemo } from "react";
import styles from "@/components/ui/style/ToolPageDetails.module.scss";

import ToolCardHeader from "@/components/Category/details/ToolCardHeader";
import ToolMainContent from "@/components/Category/details/ToolMainContent";
import ToolRightSidebar from "@/components/Category/details/ToolRightSidebar";

import {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} from "@/features/dashboard/category/categoryApi";
import { useGetToolReviewsQuery } from "@/features/review/reviewApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { getUserId, getUserType } from "@/utils/authStorage";
import Loader from "@/components/Loader/Loader";
import { unslugify } from "@/utils/useEncodeUrl";
import { useCategoryStore } from "@/store/useCategoryStore";

export default function ToolDetailsClient({ toolname }: { toolname: string }) {
  const userId = getUserId();
  const userType = getUserType();
  const slug = useCategoryStore((s: any) => s.slug);
  const decoded = useMemo(
    () => ({
      slug: unslugify(slug as string),
      toolName: unslugify(toolname as string),
    }),
    [slug, toolname]
  );

  const { data: allCategories, isLoading: catLoading, isError: catError } =
    useGetAllCategoriesQuery();

  const { category, categoryId } = useMemo(() => {
    const found = allCategories?.result?.list?.find(
      (c: any) => c.categoryName?.toLowerCase() === decoded.slug
    );
    return {
      category: found,
      categoryId: found?._id,
    };
  }, [allCategories, decoded.slug]);

  const { data: categoryDetail, isLoading: detailLoading, isError: detailError } =
    useGetCategoryByIdQuery(categoryId ? { categoryId } : skipToken);

  const { tool, alternativeTools } = useMemo(() => {
    const tools = categoryDetail?.result?.list?.tools || [];
    const normalizeText = (str = "") =>
  str
    .toLowerCase()
    .replace(/['’]/g, "")        // remove apostrophes
    .replace(/[^a-z0-9\s]/g, "") // remove special chars
    .replace(/\s+/g, " ")        // normalize spaces
    .trim();

const foundTool = tools.find((t: any) => {
  const normalizedToolName = normalizeText(t.toolName);
  const normalizedDecoded = normalizeText(decoded.toolName);

  const match = normalizedToolName === normalizedDecoded;
  return match;
});
    const alt = foundTool
      ? tools.filter((t: any) => String(t._id) !== String(foundTool._id)).slice(0, 4)
      : [];

    return { tool: foundTool, alternativeTools: alt };
  }, [categoryDetail, decoded.toolName]);

  const { data: reviewsData, isLoading: isReviewsLoading } =
    useGetToolReviewsQuery(tool?._id ? { toolId: tool?._id } : skipToken);

  if (catLoading || detailLoading) return <Loader />;

  if (catError || detailError || !category || !tool) {
    return <p style={{ padding: 40 }}>Tool not found.</p>;
  }

  return (
    <div className={styles.toolPage}>
      <header className={styles.headerSection}>
        <ToolCardHeader
          tool={tool}
          category={category}
          userId={userId ?? ""}
          userType={userType ?? ""}
        />
      </header>

      <div className={styles.pageLayout}>
        <main className={styles.mainSection}>
          <ToolMainContent
            tool={tool}
            reviewsData={reviewsData}
            category={category}
            isReviewsLoading={isReviewsLoading}
          />
        </main>

        {alternativeTools.length > 0 && (
          <aside className={styles.sidebarSection}>
            <ToolRightSidebar
              tool={tool}
              category={{ ...category, tools: alternativeTools }}
              slug={slug ?? ""}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
