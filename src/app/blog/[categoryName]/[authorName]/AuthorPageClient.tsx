"use client";

import { useState, useMemo } from "react";
import RadioPagination from "@/components/ui/common/RadioPagination";
import { useGetAllBlogsQuery } from "@/features/blog/blogApi";
import styles from "@/components/ui/style/Blog.module.scss";
import Link from "next/link";

const BLOGS_PER_PAGE = 6;

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

export default function AuthorPageClient({
  authorName,
  categoryName,
}: {
  authorName: string;
  categoryName: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllBlogsQuery();

  const blogs =
    data?.result?.list?.filter((b: any) => b.status === "Published") || [];

  /* ✅ AUTHOR + CATEGORY FILTER (MATCH SERVER LOGIC) */
  const authorBlogs = useMemo(() => {
    return blogs.filter(
      (blog: any) =>
        blog.author?.authorName === authorName &&
        blog.categories?.some(
          (cat: any) => cat.categoryName === categoryName
        )
    );
  }, [blogs, authorName, categoryName]);

  const totalPages = Math.ceil(authorBlogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = authorBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  if (isLoading) {
    return <p style={{ textAlign: "center", padding: 40 }}>Loading blogs…</p>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.gridWrapper}>
        {paginatedBlogs.map((blog: any) => (
          <Link
            key={blog._id}
            href={`/blog/${encodeURIComponent(
              categoryName
            )}/${encodeURIComponent(authorName)}/${blog.slug}`}
            className={styles.blogCard}
          >
            <div className={styles.imageWrapper}>
              <img
                src={blog.featuredImage?.url || "/blog-placeholder.png"}
                alt={blog.blogTitle}
              />
            </div>

            {/* ✅ USE CATEGORY FROM ROUTE */}
            <span className={styles.category}>{categoryName}</span>

            <h3 className={styles.title}>{blog.blogTitle}</h3>

            <p className={styles.meta}>
              Published By <span>{authorName}</span>
            </p>

            <p className={styles.meta}>
              Published On <span>{formatDate(blog.publishedDate)}</span>
            </p>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <RadioPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
