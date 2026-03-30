import { Metadata } from "next";
import PageHero from "@/components/Hero/PageHero";
import BlogClient from "./BlogClient";
import styles from "@/components/ui/style/Blog.module.scss";
import Link from "next/link";
import { getAllBlogs } from "@/features/serverApi/serverApi";
import { getPaginationRange } from "@/components/shared/utilPagination";
import { slugify } from "@/utils/useEncodeUrl";
const BLOGS_PER_PAGE = 6;
const formatDate = (date?: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
export const metadata: Metadata = {
  title: "Latest AI Blogs & Tutorials | Allisted",
  description:
    "Explore the latest AI tools, tutorials, and insights from industry experts.",
  alternates: {
    canonical: "https://app.recuip.com/blog",
  },
  openGraph: {
    title: "Latest AI Blogs & Tutorials",
    description: "Explore the latest AI tools, tutorials, and insights.",
    url: "https://app.recuip.com/blog",
    siteName: "Allisted",
    images: [
      {
        url: "https://app.recuip.com/og-blog.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest AI Blogs & Tutorials",
    description: "Explore the latest AI tools, tutorials, and insights.",
    images: ["https://app.recuip.com/og-blog.png"],
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;

  const data = await getAllBlogs();

  // ✅ only published blogs
  const blogs = data.filter((b: any) => b.status === "Published");

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = blogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE,
  );

  return (
    <>
      {/* ================= SERVER FALLBACK (NO JS) ================= */}
      <div className={styles.homeServer}>
        <PageHero
          content="Explore <span style='color:#ffd700'>Blogs</span>"
          subcontent="Latest insights, tutorials, and updates from the AI world."
          queryPlaceholder="Search Blogs"
        />

        {/* SERVER BLOG GRID */}
        <div className={styles.gridWrapper}>
          {paginatedBlogs?.flatMap((blog: any) =>
            (blog.categories?.length
              ? blog?.categories
              : [{ categoryName: "Uncategorized" }]
            )?.map((cat: any) => (
              <Link
                key={`${blog._id}-${cat.categoryName}`}
                href={`/blog/${slugify(cat.categoryName)}/${slugify(blog.author?.authorName || "")}/${blog.slug}`}
                className={styles.blogCard}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={blog.featuredImage?.url || "/blog-placeholder.png"}
                    alt={blog.blogTitle}
                  />
                </div>

                <span className={styles.category}>{cat.categoryName}</span>

                {/* TITLE */}
                <h3 className={styles.title}>{blog.blogTitle}</h3>

                {/* META */}
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

        {/* SERVER PAGINATION */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {/* PREVIOUS */}
            <Link
              href={`/blog?page=${Math.max(1, page - 1)}`}
              className={page === 1 ? styles.disabled : ""}
              aria-disabled={page === 1}
            >
              &lt;
            </Link>

            {/* PAGE NUMBERS */}
            {getPaginationRange(page, totalPages).map((item, i) =>
              item === "..." ? (
                <span key={i} className={styles.ellipsis}>
                  …
                </span>
              ) : (
                <Link
                  key={i}
                  href={`/blog?page=${item}`}
                  className={page === item ? styles.activePage : ""}
                >
                  {item}
                </Link>
              ),
            )}

            {/* NEXT */}
            <Link
              href={`/blog?page=${Math.min(totalPages, page + 1)}`}
              className={page === totalPages ? styles.disabled : ""}
              aria-disabled={page === totalPages}
            >
              &gt;
            </Link>
          </div>
        )}
      </div>

      {/* ================= CLIENT UI (JS ENABLED) ================= */}
      <div className={styles.homeClient}>
        <BlogClient />
      </div>
    </>
  );
}
