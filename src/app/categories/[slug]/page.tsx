"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useGetAllCategoriesQuery, useGetCategoryByIdQuery } from "@/features/dashboard/category/categoryApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { notFound } from "next/navigation";
import CategoryDescription from "@/components/Category/CategoryDescription";
import CategoryToolCard from "@/components/Category/CategoryToolCard";
import FaqSection from "@/components/Category/FaqSection";
import RadioPagination from "@/components/ui/common/RadioPagination";
import styles from "../.././../components/ui/style/CategorySlug.module.scss";
import Loading from "@/app/loading";

export default function CategorySlugPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const [currentPage, setCurrentPage] = useState(1);

  const toolsPerPage = 6;

  // fetch 1
  const { data: allCategories, isLoading: catLoading, isError: catError } =
    useGetAllCategoriesQuery();

  // ✔ Ensure hooks run before any return
  const category = allCategories?.result?.list?.find(
    (cat: any) => cat.categoryName?.toLowerCase() === decodedSlug.toLowerCase()
  );

  const categoryId = category?._id;

  // fetch 2
  const { data: categoryDetail, isLoading: detailLoading, isError: detailError } =
    useGetCategoryByIdQuery(categoryId ? { categoryId } : skipToken);

  // Now all logic is safe to run
  const listPayload = categoryDetail?.result?.list;
  const normalized = Array.isArray(listPayload) ? listPayload[0] ?? {} : (listPayload ?? {});
  const categoryInfo = (normalized as any).category ?? normalized;
  const tools = (normalized as any).tools ?? [];
  const faqs = categoryInfo?.faqs ?? [];

  const totalPages = Math.ceil(tools.length / toolsPerPage);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * toolsPerPage;
    const endIndex = startIndex + toolsPerPage;
    return tools.slice(startIndex, endIndex);
  }, [tools, currentPage, toolsPerPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // ⛔ Now place returns AFTER all hooks
  if (catLoading || detailLoading) return <Loading />;
  if (catError || detailError || !category) return notFound();

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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <RadioPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}

      {/* FAQ */}
      {faqs.length > 0 && <FaqSection faqs={faqs} />}
    </div>
  );
}
