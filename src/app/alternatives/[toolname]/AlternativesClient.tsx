"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} from "@/features/dashboard/category/categoryApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import CategoryDescription from "@/components/Category/CategoryDescription";
import CategoryToolCard from "@/components/Category/CategoryToolCard";
import FaqSection from "@/components/Category/FaqSection";
import RadioPagination from "@/components/ui/common/RadioPagination";
import styles from "@/components/ui/style/CategorySlug.module.scss";
import Loader from "@/components/Loader/Loader";
import { unslugify } from "@/utils/useEncodeUrl";
import { useCategoryStore } from "@/store/useCategoryStore";

export default function AlternativesClient({ toolname }: { toolname: string }) {
  const slug = useCategoryStore((s: any) => s.slug);
  const decodedSlug = unslugify(slug);
  const decodedTool = unslugify(toolname);

  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 6;

  const { data: allCategories, isLoading: catLoading, isError: catError } =
    useGetAllCategoriesQuery();

  const category = allCategories?.result?.list?.find(
    (cat: any) => cat.categoryName?.toLowerCase() === decodedSlug
  );

  const categoryId = category?._id;

  const { data: categoryDetail, isLoading: detailLoading, isError: detailError } =
    useGetCategoryByIdQuery(categoryId ? { categoryId } : skipToken);

  const listPayload = categoryDetail?.result?.list;
  const normalized = Array.isArray(listPayload)
    ? listPayload[0] ?? {}
    : listPayload ?? {};

  const categoryInfo = (normalized as any).category ?? normalized;

  const tools = ((normalized as any).tools ?? []).filter(
    (item: any) =>
      item.status === "Approved" &&
      item.toolName?.toLowerCase() !== decodedTool.toLowerCase()
  );

  const faqs = categoryInfo?.faqs ?? [];
  const totalPages = Math.ceil(tools.length / toolsPerPage);

  const paginatedTools = useMemo(() => {
    const start = (currentPage - 1) * toolsPerPage;
    return tools.slice(start, start + toolsPerPage);
  }, [tools, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (catLoading || detailLoading) return <Loader />;

  if (catError || detailError || !category) {
    return <p className={styles.noTools}>Alternatives not found.</p>;
  }

  return (
    <div className={styles.categoryPage}>
      <CategoryDescription
        title={`${decodedTool} Alternatives`}
        description={`Explore top alternatives to ${decodedTool}. Compare features, pricing, and reviews to find the best replacement.`}
      />

      {paginatedTools.length > 0 ? (
        <div className={styles.toolsGrid}>
          {paginatedTools.map((tool: any) => (
            <CategoryToolCard key={tool._id} tool={tool} />
          ))}
        </div>
      ) : (
        <p className={styles.noTools}>No alternatives found.</p>
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
