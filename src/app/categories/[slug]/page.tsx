"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useGetAllCategoriesQuery, useGetCategoryByIdQuery } from "@/features/dashboard/category/categoryApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { notFound } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import CategoryDescription from "@/components/Category/CategoryDescription";
import CategoryToolCard from "@/components/Category/CategoryToolCard";
import FaqSection from "@/components/Category/FaqSection";
import RadioPagination from "@/components/ui/common/RadioPagination";
import styles from "../.././../components/ui/style/CategorySlug.module.scss";

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
  const categoryInfo = categoryDetail?.result?.list?.category;
  const tools = categoryDetail?.result?.list?.tools || [];
  const faqs = categoryInfo?.faqs || [];

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
  if (catLoading || detailLoading) return <Loader />;
  if (catError || detailError || !category) return notFound();

  return (
    <div className={styles.categoryPage}>
      <CategoryDescription title={category.categoryName} description={category.categoryDescription} />

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
