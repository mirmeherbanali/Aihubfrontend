"use client";

import { useGetAllCategoriesQuery, useGetCategoryByIdQuery } from "@/features/dashboard/category/categoryApi";
import { notFound } from "next/navigation";
import styles from "@/components/ui/style/CategoryPage.module.scss";

export default function CategorySlugPage({ params }: { params: { slug: string } }) {
  // Decode URL slug
  const decodedSlug = decodeURIComponent(params.slug);

  // Fetch all categories to find the one that matches slug
  const { data: allCategories, isLoading: catLoading, isError: catError } = useGetAllCategoriesQuery();

  if (catLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading category...</p>
      </div>
    );
  }

  if (catError || !allCategories?.result?.list) return notFound();

  // Find category by slug or name (depending on your logic)
  const category = allCategories.result.list.find(
    (cat: any) =>
      cat.categoryName?.toLowerCase() === decodedSlug.toLowerCase()
  );

  if (!category) return notFound();

  // Fetch category details + tools by categoryId
  const {
    data: categoryDetail,
    isLoading: detailLoading,
    isError: detailError
  } = useGetCategoryByIdQuery({ categoryId: category._id! });

  if (detailLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading tools...</p>
      </div>
    );
  }

  if (detailError || !categoryDetail?.result?.list?.category) return notFound();

  const tools = categoryDetail.result.list.tools || [];
  const categoryInfo = categoryDetail.result.list.category;

  return (
    <div className={styles.categoryDetailPage}>
      <h1 className="text-4xl font-bold mb-2">{categoryInfo.categoryName}</h1>
      <p className="text-gray-600 mb-6">{categoryInfo.categoryDescription}</p>

      {tools.length > 0 ? (
        <div className={styles.toolsGrid}>
          {tools.map((tool: any) => (
            <div key={tool._id} className={styles.toolCard}>
              <h3 className="font-semibold">{tool.toolName}</h3>
              <p className="text-gray-500 mb-2">{tool.description}</p>
              <p className="text-sm text-gray-400">
                Type: {tool.pricingType} | Status: {tool.status}
              </p>
              {tool.websiteUrl && (
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm mt-2 inline-block"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No tools found in this category.</p>
      )}
    </div>
  );
}
