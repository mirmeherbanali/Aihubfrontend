"use client";

import React from "react";
import Link from "next/link";
import styles from "../../components/ui/style/latestNews.module.scss";
import { slugify } from "@/utils/useEncodeUrl";



export default  function LatestNewsServer({ blog }: { blog: any[] }) {

  // only published blogs
  const blogs =blog?.filter((b: any) => b.status === "Published");

  // latest 4
  const latestBlogs = blogs.slice(0, 4);
const sortedBlogs = [...latestBlogs].sort(
  (a: any, b: any) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
);
const uniqueCategoryPairs: any[] = [];
const usedCategories = new Set();

for (const item of sortedBlogs) {
  const categories = item.categories?.length
    ? item.categories
    : [{ categoryName: "Uncategorized" }];

  for (const cat of categories) {
    const key = cat.categoryName.toLowerCase();

    if (!usedCategories.has(key)) {
      uniqueCategoryPairs.push({ cat, item });
      usedCategories.add(key);
      break; // one category per blog
    }

    if (uniqueCategoryPairs.length === 4) break;
  }

  if (uniqueCategoryPairs.length === 4) break;
}
const categoryBlogPairs = [...uniqueCategoryPairs];

if (categoryBlogPairs.length < 4) {
  for (const item of sortedBlogs) {
    if (categoryBlogPairs.length === 4) break;

    const alreadyUsed = categoryBlogPairs.some(
      (pair) => pair.item._id === item._id
    );
    if (alreadyUsed) continue;

    const cat =
      item.categories?.[0] || { categoryName: "Uncategorized" };

    categoryBlogPairs.push({ cat, item });
  }
}



  return (
    <section className={styles.newsSection}>
      <h2>Latest News on AI</h2>
     <div className={styles.newsGrid}>
  {categoryBlogPairs.map(({ cat, item }: any) => (
    <Link
      key={`${item._id}-${cat.categoryName}`}
      href={`/blog/${slugify(
        cat.categoryName
      )}/${slugify(
        item.author?.authorName
      )}/${item.slug}`}
      className={styles.card}
    >
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img
          src={item.featuredImage?.url || "/blog-placeholder.jpg"}
          alt={item.blogTitle}
        />
      </div>

      {/* CONTENT */}
      <div className={styles.cardContent}>
        <h3>{item.blogTitle}</h3>

        <p>{item.metaDescription?.slice(0, 90)}...</p>

        <div className={styles.meta}>
          <span className={styles.author}>
            {item.author?.authorName}
          </span>

          <span className={styles.date}>
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>


      {/* SAME VIEW ALL BUTTON */}
      <Link href="/blog" className={styles.viewBtn}>
        View All <span>›</span>
      </Link>
    </section>
  );
};

