"use client";

import React, { useState, useMemo } from "react";
import PageHero from "../Hero/PageHero";
import CategoryGrid from "./CategoryGrid";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import styles from "../ui/style/CategoryPage.module.scss";
import RadioPagination from "../ui/common/RadioPagination";

const ITEMS_PER_PAGE = 12;

export default function CategoryClient() {
  const { data, isLoading, isError, refetch } =
    useGetAllCategoriesQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const categories = data?.result?.list || [];

  /* ================= SEARCH (CLIENT SIDE) ================= */
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories.filter((item: any) =>
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  /* ================= PAGINATION (CLIENT SIDE) ================= */
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      {/* ================= HERO ================= */}
      <PageHero
        content="Explore <span style='color:#ffd700'>AI Tools</span> by Category"
        subcontent="Find the perfect AI tool for your industry, use case, or role."
        queryPlaceholder="Search for Tools & Categories"
        liveSearch
        onSearch={(q) => {
          setSearchQuery(q);
          setCurrentPage(1); // reset page on search
        }}
      />

      {/* ================= CONTENT ================= */}
      <section className={styles.categorySection}>
        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
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
              items={paginatedCategories}
              onSelect={(item) => setSelectedCategory(item)}
              title=""
            />

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <div className={styles.paginationWrapper}>
                <RadioPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
