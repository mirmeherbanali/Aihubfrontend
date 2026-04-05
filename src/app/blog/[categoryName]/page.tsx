import { Metadata } from "next";

import PageHero from "@/components/Hero/PageHero";
import styles from "@/components/ui/style/Blog.module.scss";
import Link from "next/link";
import { getAllBlogs } from "@/features/serverApi/serverApi";
import { getPaginationRange } from "@/components/shared/utilPagination";
import CategoryPageClient from "./CategoryPageClient";
import { slugify, unslugify } from "@/utils/useEncodeUrl";

const BLOGS_PER_PAGE = 6;
const formatDate = (date?: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
export async function generateMetadata({
  params,
}: {
  params: { categoryName: string };
}): Promise<Metadata> {
  const categoryName = unslugify(params.categoryName);
  const url = `https://app.recuip.com/blog/${params.categoryName}`;

  return {
    title: `${categoryName} Blogs`,
    description: `Browse the best blogs on ${categoryName} in one place.`,
    authors: [{ name: "Recuip" }],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${categoryName} Blogs`,
      description: `Browse the best blogs on ${categoryName} in one place.`,
      images: ["https://app.recuip.com/og-image.png"],
      siteName: "Recuip",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Blogs`,
      description: `Browse the best blogs on ${categoryName} in one place.`,
      images: ["https://app.recuip.com/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { categoryName: string };
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const categoryName = unslugify(params.categoryName);

  const data = await getAllBlogs();

  // ✅ only published blogs
  const blogs = data.filter((b: any) => b.status === "Published");

  // ✅ category filter
  const categoryBlogs = blogs.filter((blog: any) =>
    blog.categories?.some(
      (cat: any) => cat.categoryName?.toLowerCase() === categoryName,
    ),
  );

  const totalPages = Math.ceil(categoryBlogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = categoryBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE,
  );

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.categoryTitle}>{categoryName}</h1>
      {/* ================= SERVER FALLBACK (NO JS) ================= */}
      <div className={styles.homeServer}>
        {/* SERVER BLOG GRID */}
        <div className={styles.gridWrapper}>
          {paginatedBlogs?.map((blog: any) => (
            <Link
              key={blog?._id}
              href={`/blog/${slugify(categoryName)}/${blog.slug}`}
              className={styles.blogCard}
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
          ))}
        </div>

        {/* SERVER PAGINATION */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {/* PREVIOUS */}
            <Link
              href={`/blog/${slugify(categoryName)}?page=${Math.max(1, page - 1)}`}
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
                  href={`/blog/${slugify(categoryName)}?page=${item}`}
                  className={page === item ? styles.activePage : ""}
                >
                  {item}
                </Link>
              ),
            )}

            {/* NEXT */}
            <Link
              href={`/blog/${slugify(categoryName)}?page=${Math.min(totalPages, page + 1)}`}
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
        <CategoryPageClient categoryName={categoryName} />
      </div>
    </div>
  );
}
