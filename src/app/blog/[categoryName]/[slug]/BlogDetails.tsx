import styles from "@/components/ui/style/BlogDetails.module.scss";
import Link from "next/link";
import { slugify } from "@/utils/useEncodeUrl";

type Props = {
  blog: any;
  allBlogs: any[];
  categoryName: string;
};

const normalize = (str?: string) =>
  str?.trim().toLowerCase().replace(/\s+/g, "-") || "";

export default function BlogDetails({ blog, allBlogs, categoryName }: Props) {
  const blogCategoryNames =
    blog.categories?.map((cat: any) => normalize(cat.categoryName)) || [];

  const latestArticles = allBlogs
    .filter((b: any) => {
      if (normalize(b.slug) === normalize(blog.slug)) return false;

      const categories =
        b.categories?.map((cat: any) => normalize(cat.categoryName)) || [];

      return categories.some((cat: any) => blogCategoryNames.includes(cat));
    })
    .slice(0, 3);

  const relatedArticles = allBlogs
    .filter((b: any) => {
      if (normalize(b.slug) === normalize(blog.slug)) return false;

      const categories =
        b.categories?.map((cat: any) => normalize(cat.categoryName)) || [];

      return categories.some((cat: any) => blogCategoryNames.includes(cat));
    })
    .slice(0, 4);

  const processedContent = blog.content.replace(
    /<img[^>]*>/g,
    (match: string) => {
      const srcMatch = match.match(/src="([^"]*)"/);
      const src = srcMatch ? srcMatch[1] : "";

      const altMatch = match.match(/alt="([^"]*)"/);
      const alt = altMatch ? altMatch[1] : blog.blogTitle;

      const titleMatch = match.match(/title="([^"]*)"/);
      const title = titleMatch ? titleMatch[1] : alt;

      if (!src) return "";

      return `<img src="${src}" title="${title}" alt="${alt}" />`;
    },
  );

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className={styles.header}>
        <div className={styles.categoryRow}>
          {blog.categories?.length ? (
            blog.categories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/blog/${slugify(cat.categoryName)}`}
                className={styles.category}
              >
                {cat.categoryName}
              </Link>
            ))
          ) : (
            <span className={styles.category}>Uncategorized</span>
          )}
        </div>

        <h1 className={styles.title}>{blog.blogTitle}</h1>

        <div className={styles.metaRow}>
          <div className={styles.author}>
            <div className={styles.avatar}>{blog.author?.authorName}</div>

            <span className={styles.authorLink}>
              Published by <b>{blog.author?.authorName}</b>
            </span>
          </div>

          <span>
            Updated on <b>{new Date(blog.updatedAt).toLocaleDateString()}</b>
          </span>
        </div>
      </header>

      {/* ================= FEATURED IMAGE ================= */}
      {blog.featuredImage?.url && (
        <section className={styles.featuredSection}>
          <div className={styles.featuredImage}>
            <img
              src={blog.featuredImage.url}
              alt={blog.featuredImage?.altText || blog.blogTitle}
              title={blog.featuredImage?.titleText || blog.blogTitle}
            />
          </div>
        </section>
      )}

      {/* ================= CONTENT + SIDEBAR ================= */}
      <section className={styles.layout}>
        <article className={styles.content}>
          <div
            dangerouslySetInnerHTML={{
              __html: processedContent,
            }}
          />
        </article>

        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>
            Latest Articles in{" "}
            {blog.categories?.[0]?.categoryName || "Category"}
          </h2>

          {latestArticles.map((item: any) => (
            <Link
              key={item._id}
              href={`/blog/${slugify(
                item.categories?.[0]?.categoryName,
              )}/${slugify(item.slug)}`}
              className={styles.sideCard}
            >
              {item.featuredImage?.url && (
                <div className={styles.sideImage}>
                  <img
                    src={item.featuredImage.url}
                    alt={item.featuredImage?.altText || item.blogTitle}
                    title={item.featuredImage?.titleText || blog.blogTitle}
                  />
                </div>
              )}

              <div className={styles.sideBody}>
                <h3>{item.blogTitle}</h3>
                <small>
                  Published by <b>{item.author?.authorName}</b> |{" "}
                  {new Date(item.updatedAt).toLocaleDateString()}
                </small>
              </div>
            </Link>
          ))}
        </aside>
      </section>

      {/* ================= RELATED ARTICLES ================= */}
      <section className={styles.related}>
        <h2>Related Articles</h2>

        <div className={styles.relatedGrid}>
          {relatedArticles.map((item: any) => (
            <Link
              key={item._id}
              href={`/blog/${slugify(
                item.categories?.[0]?.categoryName,
              )}/${slugify(item.slug)}`}
              className={styles.relatedCard}
            >
              {item.featuredImage?.url && (
                <div className={styles.relatedImage}>
                  <img
                    src={item.featuredImage.url}
                    alt={item.featuredImage?.altText || item.blogTitle}
                    title={item.featuredImage?.titleText || blog.blogTitle}
                  />
                </div>
              )}

              <div className={styles.relatedBody}>
                <h3>{item.blogTitle}</h3>
                <p>
                  Published by <b>{item.author?.authorName}</b> |{" "}
                  {new Date(item.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
