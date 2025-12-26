"use client";

import { useState, useMemo } from "react";
import PageHero from "@/components/Hero/PageHero";
import RadioPagination from "@/components/ui/common/RadioPagination";
import styles from "../../components/ui/style/Blog.module.scss";
import { useRouter } from "next/navigation";
import { useGetAllBlogsQuery } from "@/features/blog/blogApi";

const formatDate = (date?: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function BlogPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllBlogsQuery();

  // Filter only published blogs
  const blogs = data?.result?.list?.filter((b: any) => b.status === "Published") || []
  const blogsPerPage = 6;

  /* ================= FILTER ================= */
  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return blogs;
    return blogs.filter((b: any) =>
      b.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  /* ================= HIGHLIGHT ================= */
  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading blogs…</p>;

  return (
    <>
      {/* PAGE HERO */}
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

      {/* BLOG CARDS */}
      <section className={styles.gridWrapper}>
        {paginatedBlogs.map((blog: any) => (
          <article
            key={blog._id}
            className={styles.blogCard}
            onClick={() => router.push(`/blog/${blog.slug}`)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={blog.featuredImage?.url || "/blog-placeholder.png"}
                alt={blog.featuredImage?.altText || blog.blogTitle}
              />
            </div>

            <span className={styles.category}>
              {blog.categories?.[0]?.categoryName || "-"}
            </span>

            <h3
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: highlightMatch(blog.blogTitle),
              }}
            />

            <p className={styles.meta}>
              Published By <span>{blog.author?.authorName || "-"}</span>
            </p>

            <p className={styles.meta}>
              Published On <span>{formatDate(blog.publishedDate)}</span>
            </p>
          </article>
        ))}
      </section>

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
