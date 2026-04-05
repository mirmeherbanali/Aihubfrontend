import React from "react";
import Link from "next/link";
import styles from "../../components/ui/style/latestNews.module.scss";
import { slugify } from "@/utils/useEncodeUrl";
import moment from "moment";

export default function LatestNewsServer({ blog }: { blog: any[] }) {
  return (
    <section className={styles.newsSection}>
      <h2>Latest News on AI</h2>

      <div className={styles.newsGrid}>
        {blog.map((item: any) => {
          const category = item.categories?.[0];

          return (
            <Link
              key={item._id}
              href={`/blog/${slugify(
                category?.categoryName || "general"
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
}