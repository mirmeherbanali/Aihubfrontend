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

export default function CategorySlugPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 3; // ✅ Tools shown per page

  // Fetch all categories
  const { data: allCategories, isLoading: catLoading, isError: catError } = useGetAllCategoriesQuery();

  const category = allCategories?.result?.list?.find(
    (cat: any) => cat.categoryName?.toLowerCase() === decodedSlug.toLowerCase()
  );

  const categoryId = category?._id;

  // Fetch category details
  const { data: categoryDetail, isLoading: detailLoading, isError: detailError } = useGetCategoryByIdQuery(
    categoryId ? { categoryId } : skipToken
  );

  // Handle loading/error
  if (catLoading) return <Loader />;
  if (catError || !allCategories?.result?.list || !category || detailError) return notFound();

  const categoryInfo = categoryDetail?.result?.list?.category;
  const tools = categoryDetail?.result?.list?.tools || [];

  const faqs = categoryInfo?.faqs || [];
  // ✅ Pagination logic
  const totalPages = Math.ceil(tools.length / toolsPerPage);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * toolsPerPage;
    const endIndex = startIndex + toolsPerPage;
    return tools.slice(startIndex, endIndex);
  }, [tools, currentPage, toolsPerPage]);

  // ✅ Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Category Description */}
      <CategoryDescription
        title={category.categoryName}
        description={category.categoryDescription}
      />

      {detailLoading ? (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      ) : (
        <>
          {/* ✅ Dynamic Tools Section */}
          {paginatedTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTools.map((tool: any) => (
                <CategoryToolCard key={tool._id} tool={tool} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No tools found in this category.</p>
          )}

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-6">
              <RadioPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}

          {/* FAQ Section */}
          {faqs.length > 0 && <FaqSection faqs={faqs} />}
        </>
      )}
    </div>
  );
}
