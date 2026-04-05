"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../components/ui/style/latestNews.module.scss";
import { useGetFourBlogsQuery } from "@/features/blog/blogApi";
import { slugify } from "@/utils/useEncodeUrl";
import moment from "moment";
import { useBlogStore } from "@/store/useCategoryStore";

const LatestNews = () => {
  const { data, isLoading } = useGetFourBlogsQuery();
  const setAuthorName = useBlogStore((s: any) => s.setAuthorName);
  const setBlogId = useBlogStore((s: any) => s.setBlogId);


  const blogs = data?.result?.list || [];

  const handlePointerDown = (authorName?: string,blogId?:string) => {
    if (!authorName) return;
    setBlogId(blogId)
    setAuthorName(slugify(authorName));
  };

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
        {blogs.map((item: any) => {
          const category = item.categories?.[0];

          return (
            <Link
              key={item._id}
              href={`/blog/${slugify(category?.categoryName || "general")}/${item.slug}`}
              className={styles.card}
              onPointerDown={() => handlePointerDown(item.author?.authorName,item._id)}
            >
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

              <div className={styles.cardContent}>
                <h3>{item.blogTitle}</h3>
                <p>{item.metaDescription?.slice(0, 90)}…</p>

                <div className={styles.meta}>
                  <span className={styles.author}>
                    {item.author?.authorName}
                  </span>
                  <span className={styles.date}>
                    {moment(item.createdAt).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Link href="/blog" className={styles.viewBtn}>
        View All <span>›</span>
      </Link>
    </section>
  );
};
export default LatestNews;
