"use client";

import { useState, useMemo } from "react";
import PageHero from "@/components/Hero/PageHero";
import RadioPagination from "@/components/ui/common/RadioPagination";
import styles from "../../components/ui/style/Blog.module.scss"

const blogs = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: `How AI Tools Improve Productivity ${i + 1}`,
  category: "AI Tools",
  author: "Mir Meherban Alli",
  date: "December 19, 2025",
  image: "/blog-placeholder.png",
}));

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return blogs;
    return blogs.filter((b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

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
        {paginatedBlogs.map((blog) => (
          <article key={blog.id} className={styles.blogCard}>
            <div className={styles.imageWrapper}>
              <img src={blog.image} alt={blog.title} />
            </div>

            <span className={styles.category}>{blog.category}</span>

            <h3
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: highlightMatch(blog.title),
              }}
            />

            <p className={styles.meta}>
              Published By <span>{blog.author}</span>
            </p>

            <p className={styles.meta}>
              Published On <span>{blog.date}</span>
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
