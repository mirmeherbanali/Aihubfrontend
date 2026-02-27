"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../components/ui/style/latestNews.module.scss";
import { useGetAllBlogsQuery } from "@/features/blog/blogApi";
import { slugify } from "@/utils/useEncodeUrl";
import { useBlogStore } from "@/store/useCategoryStore";

const LatestNews = () => {
  const { data, isLoading } = useGetAllBlogsQuery();
  const setAuthorName = useBlogStore((s: any) => s.setAuthorName);

  /* ===========================
     HEAVY LOGIC → useMemo
  ============================ */
  const categoryBlogPairs = useMemo(() => {
    if (!data?.result?.list) return [];

    const blogs = data.result.list.filter((b: any) => b.status === "Published");

    // latest 4 by date
    const sortedBlogs = [...blogs]
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 4);

    const uniquePairs: any[] = [];
    const usedCategories = new Set();

    for (const item of sortedBlogs) {
      const categories = item.categories?.length
        ? item.categories
        : [{ categoryName: "Uncategorized" }];

      for (const cat of categories) {
        const key = cat.categoryName.toLowerCase();

        if (!usedCategories.has(key)) {
          uniquePairs.push({ cat, item });
          usedCategories.add(key);
          break;
        }
      }

      if (uniquePairs.length === 4) break;
    }

    // fallback if < 4
    if (uniquePairs.length < 4) {
      for (const item of sortedBlogs) {
        if (uniquePairs.length === 4) break;

        const exists = uniquePairs.some((p) => p.item._id === item._id);
        if (exists) continue;

        const cat = item.categories?.[0] || {
          categoryName: "Uncategorized",
        };

        uniquePairs.push({ cat, item });
      }
    }

    return uniquePairs;
  }, [data]);

  const handlePointerDown = (authorName?: string) => {
    if (!authorName) return;
    setAuthorName(slugify(authorName));
  };

  /* ===========================
     SKELETON UI
  ============================ */
  if (isLoading) {
    return (
      <section className={styles.newsSection}>
        <h2>Latest News on AI</h2>
        <div className={styles.newsGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.newsSection}>
      <h2>Latest News on AI</h2>

      <div className={styles.newsGrid}>
        {categoryBlogPairs.map(({ cat, item }: any) => (
          <Link
            key={`${item._id}-${cat.categoryName}`}
            href={`/blog/${slugify(cat.categoryName)}/${item.slug}`}
            className={styles.card}
            onPointerDown={() => handlePointerDown(item.author?.authorName)}
          >
            {/* IMAGE */}
            <div className={styles.imageWrapper}>
              <Image
                src={item.featuredImage?.url || "/blog-placeholder.jpg"}
                alt={item.blogTitle}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className={styles.image}
                priority
              />
            </div>

            {/* CONTENT */}
            <div className={styles.cardContent}>
              <h3>{item.blogTitle}</h3>
              <p>{item.metaDescription?.slice(0, 90)}…</p>

              <div className={styles.meta}>
                <span className={styles.author}>{item.author?.authorName}</span>
                <span className={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/blog" className={styles.viewBtn}>
        View All <span>›</span>
      </Link>
    </section>
  );
};

export default LatestNews;
