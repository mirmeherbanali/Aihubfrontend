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

  // Filter only published blogs
  const blogs = data?.result?.list?.filter((b: any) => b.status === "Published") || [];

  // Find the current blog
  const blog = blogs.find((b: any) => b.slug === slug);

  // Latest articles excluding the current blog
  const latestArticles = blogs.filter((b: any) => b.slug !== slug).slice(0, 3);

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading blog…</p>;
  if (!blog) return <p style={{ textAlign: "center" }}>Blog not found.</p>;

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className={styles.header}>
        <span className={styles.category}>{blog.category?.name || "Uncategorized"}</span>
        <h1 className={styles.title}>{blog.title}</h1>

        <div className={styles.metaRow}>
          <div className={styles.author}>
            <div className={styles.authorAvatar}>
              {blog.author?.name?.[0] || "A"}
            </div>
            <span>
              Published By <b>{blog.author?.name || "Unknown"}</b>
            </span>
          </div>
          <span>
            Last Updated On <b>{new Date(blog.updatedAt).toLocaleDateString()}</b>
          </span>
        </div>
      </div>

      {/* ================= FULL WIDTH FEATURED IMAGE ================= */}
      {blog.featuredImage && (
        <div className={styles.featuredImageFull}>
          <div className={styles.featuredImageInner}>
            <img src={blog.featuredImage?.url}  alt={blog.title} className={styles.featuredImageInner}/>
            <small>Dimension: 1280 × 630</small>
          </div>
        </div>
      )}

      {/* ================= CONTENT + SIDEBAR ================= */}
      <section className={styles.blogLayout}>
        {/* LEFT CONTENT */}
        <article className={styles.mainContent}>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Latest Articles</h3>
          <div className={styles.sidebarBlock}>
            {latestArticles.map((item: any) => (
              <div key={item._id} className={styles.latestCard}>
                {item.featuredImage && (
                  <div className={styles.latestImage}>
                    <img src={item.featuredImage} alt={item.title} />
                  </div>
                )}
                <span className={styles.latestCategory}>{item.category?.name || "Uncategorized"}</span>
                <h4 className={styles.latestTitle}>{item.title}</h4>
                <p className={styles.latestMeta}>Published By {item.author?.name || "Unknown"}</p>
                <p className={styles.latestMeta}>{new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          <h3 className={styles.sidebarTitle}>Top Categories</h3>
          <div className={styles.sidebarBlock}>
            <div className={styles.categories}>
           {  blog?.categories?.map((cat: any) => (
                <span key={cat._id}>{cat.categoryName}</span>
              )) || <span>No Categories</span>}
            </div>
          </div>
        </aside>
      </section>

      {/* ================= RELATED ARTICLES ================= */}
      <section className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>Related Articles</h2>
        <div className={styles.relatedGrid}>
          {latestArticles.map((item: any) => (
            <article key={item._id} className={styles.relatedCard}>
              {item.featuredImage && (
                <div className={styles.relatedImage}>
                  <img src={item.featuredImage} alt={item.title} />
                </div>
              )}
              <span className={styles.relatedCategory}>{item.category?.name || "Uncategorized"}</span>
              <h3 className={styles.relatedPostTitle}>{item.title}</h3>
              <p className={styles.relatedMeta}>
                Published By <b>{item.author?.name || "Unknown"}</b>
              </p>
              <p className={styles.relatedMeta}>
                Published On {new Date(item.updatedAt).toLocaleDateString()}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
