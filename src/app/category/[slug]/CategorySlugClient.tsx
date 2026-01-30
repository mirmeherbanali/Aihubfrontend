"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useGetAllCategoriesQuery, useGetCategoryByIdQuery } from "@/features/dashboard/category/categoryApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import CategoryDescription from "@/components/Category/CategoryDescription";
import CategoryToolCard from "@/components/Category/CategoryToolCard";
import FaqSection from "@/components/Category/FaqSection";
import RadioPagination from "@/components/ui/common/RadioPagination";
import styles from "@/components/ui/style/CategorySlug.module.scss";
import Loader from "@/components/Loader/Loader";
import { unslugify } from "@/utils/useEncodeUrl";

export default function CategorySlugClient({ slug }: { slug: string }) {
  const decodedSlug = unslugify(slug);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 6;

  // Fetch all categories
  const {
    data: allCategories,
    isLoading: catLoading,
    isError: catError,
  } = useGetAllCategoriesQuery();

  const category = allCategories?.result?.list?.find(
    (cat: any) => cat?.slug?.toLowerCase() === slug.toLowerCase()
  );

  const categoryId = category?._id;

  // Fetch category details
  const {
    data: categoryDetail,
    isLoading: detailLoading,
    isError: detailError,
  } = useGetCategoryByIdQuery(categoryId ? { categoryId } : skipToken);

  const listPayload = categoryDetail?.result?.list;
  const normalized = Array.isArray(listPayload)
    ? listPayload[0] ?? {}
    : listPayload ?? {};

  const categoryInfo = (normalized as any).category ?? normalized;

  const tools = ((normalized as any).tools ?? []).filter(
    (item: any) => item.status === "Approved"
  );

  const faqs = categoryInfo?.faqs ?? [];
  const totalPages = Math.ceil(tools.length / toolsPerPage);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * toolsPerPage;
    return tools.slice(startIndex, startIndex + toolsPerPage);
  }, [tools, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Loading
  if (catLoading || detailLoading) return <Loader />;

  // Error states
  if (catError || detailError) {
    return <p className={styles.noTools}>Something went wrong loading this category.</p>;
  }

  // Category not found
  if (!category) {
    return <p className={styles.noTools}>Category not found.</p>;
  }

  return (
    <div className={styles.categoryPage}>
      <CategoryDescription
        title={category.categoryName}
        description={categoryInfo?.categoryDescription || ""}
      />

      {paginatedTools.length > 0 ? (
        <div className={styles.toolsGrid}>
          {paginatedTools.map((tool: any) => (
            <CategoryToolCard key={tool._id} tool={tool} />
          ))}
        </div>
      ) : (
        <p className={styles.noTools}>No tools found in this category.</p>
      )}

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <RadioPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}

      {faqs.length > 0 && <FaqSection faqs={faqs} />}
    </div>
  );
}
