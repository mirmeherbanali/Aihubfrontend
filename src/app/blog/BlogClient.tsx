"use client";

import { useState, useMemo } from "react";
import PageHero from "@/components/Hero/PageHero";
import RadioPagination from "@/components/ui/common/RadioPagination";
import { useGetAllBlogsQuery } from "@/features/blog/blogApi";
import styles from "../../components/ui/style/Blog.module.scss";
import Link from "next/link";
import { slugify } from "@/utils/useEncodeUrl";
import { useBlogStore } from "@/store/useCategoryStore";

const formatDate = (date?: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllBlogsQuery();

  const blogs =
    data?.result?.list?.filter((b: any) => b.status === "Published") || [];

  const blogsPerPage = 6;

  /* FILTER */
  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return blogs;
    return blogs.filter((b: any) =>
      b.blogTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  /* SEARCH HIGHLIGHT */
  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const setAuthorName = useBlogStore((s: any) => s.setAuthorName);

  const handlePointerDown = (authorNameParam?: string) => {

    if (!authorNameParam) {
      return;
    }

    setAuthorName(slugify(authorNameParam));

  };



  if (isLoading) {
    return <p style={{ textAlign: "center", padding: 40 }}>Loading blogs…</p>;
  }

  
    

  return (
    <>
      {/* HERO */}
      <PageHero
        content="Explore <span style='color:#ffd700'>Blogs</span>"
        subcontent="Latest insights, tutorials, and updates from the AI world."
        queryPlaceholder="Search Blogs"
        onSearch={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        liveSearch
      />

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
              onPointerDown={() =>
              handlePointerDown(blog.author?.authorName)
            }
            >
              {/* IMAGE */}
              <div className={styles.imageWrapper}>
                <img
                  src={blog.featuredImage?.url || "/blog-placeholder.png"}
                  alt={blog.featuredImage?.altText || blog.blogTitle}
                />
              </div>

              {/* CATEGORY */}
              <span className={styles.category}>
                {cat.categoryName}
              </span>

              {/* TITLE */}
              <h3
                className={styles.title}
                dangerouslySetInnerHTML={{
                  __html: highlightMatch(blog.blogTitle),
                }}
              />

              {/* META */}
              <p className={styles.meta}>
                Published By <span>{blog.author?.authorName}</span>
              </p>

              <p className={styles.meta}>
                Published On <span>{formatDate(blog.publishedDate)}</span>
              </p>
            </Link>
          ))
        )}
      </div>

      {/* PAGINATION */}
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
