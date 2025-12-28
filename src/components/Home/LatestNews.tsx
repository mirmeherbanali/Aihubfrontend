"use client";

import React from "react";
import Link from "next/link";
import styles from "../../components/ui/style/latestNews.module.scss";
import { useGetAllBlogsQuery } from "@/features/blog/blogApi";

const LatestNews = () => {
  const { data, isLoading } = useGetAllBlogsQuery();

  // only published blogs
  const blogs =
    data?.result?.list?.filter((b: any) => b.status === "Published") || [];

  // latest 4
  const latestBlogs = blogs.slice(0, 4);

  if (isLoading) return null;

  return (
    <section className={styles.newsSection}>
      <h2>Latest News on AI</h2>
      <div className={styles.newsGrid}>
        {latestBlogs.map((item: any) => (
          <Link
            key={item._id}
            href={`/blog/${item.slug}`}
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

              <p>
                {item.metaDescription?.slice(0, 90)}...
              </p>

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

export default LatestNews;
