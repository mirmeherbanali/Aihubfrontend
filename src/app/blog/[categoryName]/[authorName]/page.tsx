import styles from "@/components/ui/style/Blog.module.scss";
import Link from "next/link";
import { getAllBlogs } from "@/features/serverApi/serverApi";
import { getPaginationRange } from "@/components/shared/utilPagination";
import AuthorPageClient from "./AuthorPageClient";

const BLOGS_PER_PAGE = 6;

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: { categoryName: string; authorName: string };
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const categoryName = decodeURIComponent(params.categoryName);
  const authorName = decodeURIComponent(params.authorName);

  const data = await getAllBlogs();

  const blogs = data.filter((b: any) => b.status === "Published");

  const authorBlogs = blogs.filter(
    (blog: any) =>
      blog.author?.authorName === authorName &&
      blog.categories?.some(
        (cat: any) => cat.categoryName === categoryName
      )
  );

  const totalPages = Math.ceil(authorBlogs.length / BLOGS_PER_PAGE);

  const paginatedBlogs = authorBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE
  );

  return (
    <div className={styles.pageWrapper}>
      {/* ===== AUTHOR HEADER (IMAGE YOU SHARED) ===== */}
    <div className={styles.authorHeader}>
  {/* Avatar */}
  <div className={styles.authorAvatar}>
    <img
      src={authorBlogs[0]?.author?.authorImage || "/author-placeholder.png"}
      alt={authorName}
    />

    {/* Social links under avatar */}
    {authorBlogs[0]?.author?.socialLinks?.length > 0 && (
      <div className={styles.socialLinksUnderAvatar}>
        {authorBlogs[0].author?.socialLinks?.map((link: any, index: number) => (
          <Link
            key={index}
            href={link.url || "#"}
            className={styles.socialBtn}
            target="_blank"
          >
            {link.title || "Link"}
          </Link>
        ))}
      </div>
    )}
  </div>

  {/* Author info */}
  <div className={styles.authorInfo}>
    <h1 className={styles.authorName}>{authorBlogs[0]?.author?.authorName}</h1>

    <p className={styles.authorBio}>
      {authorBlogs[0]?.author?.authorBio || "No bio available."}
    </p>
  </div>
</div>


      {/* ===== SERVER BLOG GRID ===== */}
      <div className={styles.homeServer}>
        <div className={styles.gridWrapper}>
          {paginatedBlogs.map((blog: any) => (
            <Link
              key={blog._id}
              href={`/blog/${categoryName}/${authorName}/${blog.slug}`}
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
                Published By <span>{authorName}</span>
              </p>

              <p className={styles.meta}>
                Published On <span>{formatDate(blog.publishedDate)}</span>
              </p>
            </Link>
          ))}
        </div>

        {/* ===== SERVER PAGINATION ===== */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <Link
              href={`/blog/${categoryName}/${authorName}?page=${Math.max(
                1,
                page - 1
              )}`}
              className={page === 1 ? styles.disabled : ""}
            >
              &lt;
            </Link>

            {getPaginationRange(page, totalPages).map((item, i) =>
              item === "..." ? (
                <span key={i} className={styles.ellipsis}>…</span>
              ) : (
                <Link
                  key={i}
                  href={`/blog/${categoryName}/${authorName}?page=${item}`}
                  className={page === item ? styles.activePage : ""}
                >
                  {item}
                </Link>
              )
            )}

            <Link
              href={`/blog/${categoryName}/${authorName}?page=${Math.min(
                totalPages,
                page + 1
              )}`}
              className={page === totalPages ? styles.disabled : ""}
            >
              &gt;
            </Link>
          </div>
        )}
      </div>

      {/* ===== CLIENT VERSION ===== */}
      <div className={styles.homeClient}>
        <AuthorPageClient
          authorName={authorName}
          categoryName={categoryName}
        />
      </div>
    </div>
  );
}
