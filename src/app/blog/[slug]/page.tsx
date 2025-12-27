"use client";

import { useGetAllBlogsQuery } from "@/features/blog/blogApi";
import styles from "../../../components/ui/style/BlogDetails.module.scss";

type Props = {
  params: {
    slug: string;
  };
};

export default function BlogDetailsPage({ params }: Props) {
  const { slug } = params;
  const { data, isLoading } = useGetAllBlogsQuery();

  const blogs =
    data?.result?.list?.filter((b: any) => b.status === "Published") || [];

  const blog = blogs.find((b: any) => b.slug === slug);
  const latestArticles = blogs.filter((b: any) => b.slug !== slug).slice(0, 3);

  if (isLoading) return <p className={styles.center}>Loading…</p>;
  if (!blog) return <p className={styles.center}>Blog not found.</p>;

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className={styles.header}>
        <span className={styles.category}>
          {blog.category?.name || "Uncategorized"}
        </span>

        <h1 className={styles.title}>{blog.title}</h1>

        <div className={styles.metaRow}>
          <div className={styles.author}>
            <div className={styles.avatar}>{blog.author?.name?.[0] || "A"}</div>
            <span>
              Published by <b>{blog.author?.name || "Unknown"}</b>
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
            <img src={blog.featuredImage.url} alt={blog.title} />
          </div>
        </section>
      )}

      {/* ================= CONTENT + SIDEBAR ================= */}
      <section className={styles.layout}>
        <article className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Latest Articles</h3>

          {latestArticles.map((item: any) => (
            <div key={item._id} className={styles.sideCard}>
              {item.featuredImage?.url && (
                <div className={styles.sideImage}>
                  <img src={item.featuredImage.url} alt={item.title} />
                </div>
              )}

              <span className={styles.badge}>
                {item.category?.name || "Uncategorized"}
              </span>

              <h4>{item.title}</h4>

              <small>{new Date(item.updatedAt).toLocaleDateString()}</small>
            </div>
          ))}

          {/* TOP CATEGORIES */}
          <h3 className={styles.sidebarTitle}>Top Categories</h3>

          <div className={styles.categoryWrap}>
            {blog.categories?.length ? (
              blog.categories.map((cat: any) => (
                <span key={cat._id} className={styles.categoryTag}>
                  {cat.categoryName}
                </span>
              ))
            ) : (
              <span className={styles.emptyText}>No categories</span>
            )}
          </div>
        </aside>
      </section>

      {/* ================= RELATED ARTICLES ================= */}
      <section className={styles.related}>
        <h2>Related Articles</h2>

        <div className={styles.relatedGrid}>
          {latestArticles.map((item: any) => (
            <article key={item._id} className={styles.relatedCard}>
              {item.featuredImage?.url && (
                <div className={styles.relatedImage}>
                  <img src={item.featuredImage.url} alt={item.title} />
                </div>
              )}

              <div className={styles.relatedBody}>
                <span className={styles.badge}>
                  {item.category?.name || "Uncategorized"}
                </span>
                <h3>{item.title}</h3>
                <p>
                  By <b>{item.author?.name || "Unknown"}</b>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
