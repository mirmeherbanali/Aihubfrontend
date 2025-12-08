"use client";

import React, { useState, useMemo } from "react";
import PageHero from "../Hero/PageHero";
import CategoryGrid from "./CategoryGrid";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import styles from "../ui/style/CategoryPage.module.scss";

export default function CategoryPage() {
  const { data, isLoading, isError, refetch } = useGetAllCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = data?.result?.list || [];

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories.filter((item: any) =>
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  return (
    <>
      <PageHero
        content="Explore <span style='color:#ffd700'>AI Tools</span> by Category"
        subcontent="Find the perfect AI tool for your industry, use case, or role."
        queryPlaceholder="Search for Tools & Categories"
        onSearch={(q) => setSearchQuery(q)}
        liveSearch
      />

      <section className={styles.categorySection}>
        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))}
          </div>
        ) : isError ? (
          <div className={styles.error}>
            Failed to load categories.
            <button onClick={() => refetch()}>Retry</button>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className={styles.empty}>No matching categories found.</div>
        ) : (
          <>
            <h2 className={styles.heading}>All Categories</h2>

            <CategoryGrid
              items={filteredCategories}
              onSelect={(item) => setSelectedCategory(item)}
            />
          </>
        )}
      </section>
    </>
  );
}
