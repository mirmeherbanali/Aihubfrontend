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

  // 🔍 Filter categories dynamically as user types
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories.filter((item: any) =>
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const handleSelectCategory = (item: any) => {
    setSelectedCategory(item);
    console.log("Selected Category:", item);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <PageHero
        content="Explore <span style='color:#ffd700'>AI Tools</span> by Category"
        subcontent="Find the perfect AI tool for your industry, use case, or role."
        queryPlaceholder="Search for Tools & Categories"
        onSearch={handleSearch}
        liveSearch // 👈 enables real-time search
      />

      <section className={styles.categorySection}>
        {isLoading ? (
          <div className={styles.loader}>Loading categories...</div>
        ) : isError ? (
          <div className={styles.error}>
            Failed to load categories.
            <button onClick={() => refetch()}>Retry</button>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className={styles.empty}>No matching categories found.</div>
        ) : (
        
            <CategoryGrid
              title="All Categories"
              items={filteredCategories}
              onSelect={handleSelectCategory}
              searchQuery={searchQuery} // 👈 pass search query for highlighting
            />

            
        )}
      </section>
    </>
  );
}
