"use client";

import React from "react";
import Link from "next/link";
import styles from "../../components/ui/style/latestNews.module.scss";
import { useGetAllBlogsQuery } from "@/features/blog/blogApi";

const LatestNews = () => {
  const { data, isLoading } = useGetAllBlogsQuery();

  // ✅ only published blogs
  const blogs =
    data?.result?.list?.filter((b: any) => b.status === "Published") || [];

  // ✅ take latest 4 blogs
  const latestBlogs = blogs.slice(0, 4);

  if (isLoading) return null;

  return (
    <section className={styles.newsSection}>
      <h2>Latest Blogs</h2>

      <div className={styles.newsGrid}>
        {latestBlogs.map((item: any) => (
          <Link
            key={item._id}
            href={`/blog/${item.slug}`}
            className={styles.card}
          >
            {/* ===== UPPER PART ===== */}
            <div className={styles.upperPart}>
              <div className={styles.upperPartFace}>
                {item.blogTitle}
              </div>

              <div className={styles.upperPartBack}>
                {item.metaDescription}
              </div>
            </div>

            {/* ===== LOWER PART ===== */}
            <div className={styles.lowerPart}>
              <div className={styles.lowerPartFace}>
                {item.author}
              </div>

              <div className={styles.lowerPartBack}>
                {new Date(item.createdAt).toLocaleDateString()}
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
