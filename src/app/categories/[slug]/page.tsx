"use client";

import {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} from "@/features/dashboard/category/categoryApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { notFound } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import CategoryDescription from "@/components/Category/CategoryDescription";
import CategoryToolCard from "@/components/Category/CategoryToolCard";
import FaqSection from "@/components/Category/FaqSection";

export default function CategorySlugPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);

  // Step 1: Fetch all categories
  const { data: allCategories, isLoading: catLoading, isError: catError } =
    useGetAllCategoriesQuery();

  if (catLoading) return <Loader />;
  if (catError || !allCategories?.result?.list) return notFound();

  // Step 2: Find category by slug
  const category =
    allCategories.result.list.find(
      (cat: any) => cat.categoryName?.toLowerCase() === decodedSlug.toLowerCase()
    ) ?? null;

  if (!category) return notFound();

  const categoryId = category._id;

  // Step 3: Fetch category details
  const { data: categoryDetail, isLoading: detailLoading, isError: detailError } =
    useGetCategoryByIdQuery(categoryId ? { categoryId } : skipToken);

  // Show 404 if category details fail
  if (detailError) return notFound();

  // Extract info if data is available
  const categoryInfo = categoryDetail?.result?.list?.category;
  const tools = categoryDetail?.result?.list?.tools || [];
  const faqs = categoryInfo?.faqs || [];

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Always show category description immediately */}
      <CategoryDescription
        title={category.categoryName}
        description={category.categoryDescription}
      />

      {/* Show loader for tools & FAQs while category details are loading */}
      {detailLoading ? (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      ) : (
        <>
          {/* Tools Section */}
          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool: any) => (
                <CategoryToolCard key={tool._id} tool={tool} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No tools found in this category.</p>
          )}

          {/* FAQ Section */}
          {faqs.length > 0 && <FaqSection faqs={faqs} />}
        </>
      )}
    </div>
  );
}
