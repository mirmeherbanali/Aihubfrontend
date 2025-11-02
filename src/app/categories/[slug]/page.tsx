"use client";

import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import { notFound } from "next/navigation";
import styles from "@/components/ui/style/CategoryPage.module.scss";

export default function CategorySlugPage({ params }: { params: { slug: string } }) {
  const { data, isLoading, isError } = useGetAllCategoriesQuery();
  const decodedSlug = decodeURIComponent(params.slug); // decode URL

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading category...</p>
      </div>
    );
  }

  if (isError || !data?.result?.list) return notFound();

  // Find category by name
  const category = data.result.list.find(
    (cat: any) => cat.categoryName?.toLowerCase() === decodedSlug.toLowerCase()
  );

  if (!category) return notFound(); // 404 if not found

  const tools = category.tools || []; // tools array

  return (
    <div className={styles.categoryDetailPage}>
      <h1 className="text-4xl font-bold mb-2">{category.categoryName}</h1>
      <p className="text-gray-600 mb-6">{category.categoryDescription}</p>

      {tools.length > 0 ? (
        <div className={styles.toolsGrid}>
          {tools.map((tool: any, index: number) => (
            <div key={index} className={styles.toolCard}>
              <h3 className="font-semibold">{tool.name}</h3>
              <p className="text-gray-500">{tool.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tools found in this category.</p>
      )}
    </div>
  );
}
