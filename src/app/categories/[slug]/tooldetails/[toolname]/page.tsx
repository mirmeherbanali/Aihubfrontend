"use client";

import React from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import styles from "@/components/ui/style/ToolPageDetails.module.scss";
// Components
import ToolCardHeader from "@/components/Category/details/ToolCardHeader";
import ToolMainContent from "@/components/Category/details/ToolMainContent";
import ToolRightSidebar from "@/components/Category/details/ToolRightSidebar";

// API hooks
import { useGetAllCategoriesQuery, useGetCategoryByIdQuery } from "@/features/dashboard/category/categoryApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

const ToolDetailsPage = () => {
  const { slug, toolname } = useParams();
  const decodedSlug = decodeURIComponent(slug as string);
  const decodedToolName = decodeURIComponent(toolname as string);
  const router = useRouter();

  // --- Step 1: Fetch all categories
  const { data: allCategories, isLoading: catLoading, isError: catError } = useGetAllCategoriesQuery();
  if (catLoading) return <Loader />;
  if (catError || !allCategories?.result?.list) return notFound();

  // --- Step 2: Find category by slug
  const category = allCategories.result.list.find(
    (cat: any) => cat.categoryName?.toLowerCase() === decodedSlug.toLowerCase()
  );
  if (!category) return notFound();

  const categoryId = category._id;

  // --- Step 3: Fetch category details (tools etc.)
  const { data: categoryDetail, isLoading: detailLoading, isError: detailError } =
    useGetCategoryByIdQuery(categoryId ? { categoryId } : skipToken);

  if (detailLoading) return <Loader />;
  if (detailError || !categoryDetail?.result?.list?.tools) return notFound();

  const tools = categoryDetail.result.list.tools;

  // --- Step 4: Find the current tool
  const tool = tools.find(
    (t: any) => t.toolName?.toLowerCase() === decodedToolName.toLowerCase()
  );
  if (!tool) return notFound();

  // --- Step 5: Compute alternative tools (exclude current tool)
  const alternativeTools = tools
    .filter((t: any) => String(t._id) !== String(tool._id))
    .slice(0, 4); // show max 4
  console.log("Current Tool:", tool);
  console.log("Alternative Tools:", alternativeTools);

  // --- Step 6: Handle view all click
  const handleViewAll = () => {
    router.push(`/categories/${encodeURIComponent(category.categoryName)}`);
  };

  // --- Render the page
  return (
       <div className={styles.toolPage}>
      <header className={styles.headerSection}>
        <ToolCardHeader tool={tool} category={category} />
      </header>

      <div className={styles.pageLayout}>
        <main className={styles.mainSection}>
          <ToolMainContent tool={tool} />
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
