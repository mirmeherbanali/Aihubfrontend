"use client";

import { useState, useMemo } from "react";
import PageHero from "@/components/Hero/PageHero";
import RadioPagination from "@/components/ui/common/RadioPagination";
import { useGetAllBlogsQuery } from "@/features/blog/blogApi";
import styles from "@/components/ui/style/Blog.module.scss";
import Link from "next/link";
import { slugify } from "@/utils/useEncodeUrl";
import { useBlogStore } from "@/store/useCategoryStore";

const BLOGS_PER_PAGE = 6;

const formatDate = (date?: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function CategoryPageClient({
  categoryName,
}: {
  categoryName: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllBlogsQuery();

  const blogs =
    data?.result?.list?.filter((b: any) => b.status === "Published") || [];

  /* CATEGORY FILTER */
  const categoryBlogs = useMemo(() => {
    return blogs.filter((blog: any) =>
      blog.categories?.some(
        (cat: any) => cat.categoryName?.toLowerCase() === categoryName,
      ),
    );
  }, [blogs, categoryName]);

  /* PAGINATION */
  const totalPages = Math.ceil(categoryBlogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = categoryBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE,
  );
  const setAuthorName = useBlogStore((s: any) => s.setAuthorName);
  const handlePointerDown = (authorName?: string) => {
    if (!authorName) return;

    setAuthorName(slugify(authorName));
  };

  if (isLoading) {
    return <p style={{ textAlign: "center", padding: 40 }}>Loading blogs…</p>;
  }

  return (
    <>
      {/* BLOG GRID */}
      <div className={styles.gridWrapper}>
        {paginatedBlogs?.flatMap((blog: any) =>
          (blog.categories?.length
            ? blog?.categories
            : [{ categoryName: "Uncategorized" }]
          )?.map((cat: any) => (
            <Link
              key={`${blog?._id}-${cat?.categoryName}`}
              href={`/blog/${slugify(cat.categoryName)}/${blog.slug}`}
              className={styles.blogCard}
              onPointerDown={() => handlePointerDown(blog.author?.authorName)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={blog.featuredImage?.url || "/blog-placeholder.png"}
                  alt={blog.blogTitle}
                />
              </div>

              <span className={styles.category}>{categoryName}</span>

              <h3 className={styles.title}>{blog.blogTitle}</h3>

              <p className={styles.meta}>
                Published By <span>{blog.author?.authorName}</span>
              </p>
              <p className={styles.meta}>
                Published On <span>{formatDate(blog.publishedDate)}</span>
              </p>
            </Link>
          )),
        )}
      </div>

      {/* CLIENT PAGINATION */}
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
  );
}
