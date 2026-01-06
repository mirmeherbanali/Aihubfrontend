"use client";

import { useGetAllBlogsQuery } from "@/features/blog/blogApi";
import styles from "@/components/ui/style/BlogDetails.module.scss";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import { useMemo } from "react";

type Props = {
  params: {
    slug: string;
    categoryName: string; // for display only
    authorName: string;   // for display only
  };
};

// normalize string for URLs
const normalize = (str?: string) =>
  str?.trim().toLowerCase().replace(/\s+/g, "-") || "";

export default function BlogDetailsPage({ params }: Props) {
  const { slug,categoryName,authorName } = params;
  const { data, isLoading } = useGetAllBlogsQuery();

  const blogs = useMemo(() => {
    return (
      data?.result?.list
        ?.filter((b: any) => b.status === "Published")
        .sort(
          (a: any, b: any) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ) || []
    );
  }, [data]);

  const blog = blogs.find((b: any) => normalize(b.slug) === normalize(slug));

  if (isLoading) return <Loader />;
  if (!blog) return <p className={styles.center}>Blog not found.</p>;

  // Get normalized categories of current blog
  const blogCategoryNames = blog.categories?.map((cat: any) =>
    normalize(cat.categoryName)
  );

  // Latest articles: any author, same categories, exclude current blog
  const latestArticles = blogs
    .filter((b: any) => {
      if (normalize(b.slug) === normalize(slug)) return false;
      const categories = b.categories?.map((cat: any) => normalize(cat.categoryName)) || [];
      return categories.some((cat: any) => blogCategoryNames.includes(cat));
    })
    .slice(0, 3);

  // Related articles: same categories, prioritize same author
  const relatedArticles = [
    ...blogs.filter((b: any) => {
      if (normalize(b.slug) === normalize(slug)) return false;
      const categories = b.categories?.map((cat: any) => normalize(cat.categoryName)) || [];
      return categories.some((cat: any) => blogCategoryNames.includes(cat)) &&
        normalize(b.author?.authorName) === normalize(blog.author?.authorName);
    }),
    ...blogs.filter((b: any) => {
      if (normalize(b.slug) === normalize(slug)) return false;
      const categories = b.categories?.map((cat: any) => normalize(cat.categoryName)) || [];
      return categories.some((cat: any) => blogCategoryNames.includes(cat)) &&
        normalize(b.author?.authorName) !== normalize(blog.author?.authorName);
    })
  ].slice(0, 4);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className={styles.header}>
        <div className={styles.categoryRow}>
          {blog.categories?.length ? (
            blog.categories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/blog/${normalize(cat.categoryName)}`}
                className={styles.category}
              >
                {cat.categoryName}
              </Link>
            ))
          ) : (
            <span className={styles.category}>Uncategorized</span>
          )}
        </div>

        <h1 className={styles.title}>{blog.title}</h1>

        <div className={styles.metaRow}>
          <div className={styles.author}>
            <div className={styles.avatar}>{blog.author?.authorName}</div>
            <Link
  href={`/blog/${categoryName}/${authorName}`}
  className={styles.authorLink}
>
  Published by <b>{blog.author?.authorName}</b>
</Link>

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
          <h3 className={styles.sidebarTitle}>
            Latest Articles in {blog.categories?.[0]?.categoryName || "Category"}
          </h3>

          {latestArticles.map((item: any) => (
            <Link
              key={item._id}
              href={`/blog/${normalize(item.categories?.[0]?.categoryName)}/${normalize(item.author?.authorName)}/${normalize(item.slug)}`}
              className={styles.sideCard}
            >
              {item.featuredImage?.url && (
                <div className={styles.sideImage}>
                  <img src={item.featuredImage.url} alt={item.title} />
                </div>
              )}

              <div className={styles.sideBody}>
                <h4>{item.title}</h4>
             <small>
  <Link
    href={`/blog/${encodeURIComponent(item.categories?.[0]?.categoryName)}/${encodeURIComponent(
      item.author?.authorName
    )}`}
    className={styles.authorLink}
  >
    Published by <b>{item.author?.authorName}</b>
  </Link>{" "}
  | {new Date(item.updatedAt).toLocaleDateString()}
</small>

              </div>
            </Link>
          ))}

          <h3 className={styles.sidebarTitle}>Top Categories</h3>
          <div className={styles.categoryWrap}>
            {blog.categories?.length ? (
              blog.categories.map((cat: any) => (
                <Link
                  key={cat._id}
                  href={`/blog/${normalize(cat.categoryName)}`}
                  className={styles.categoryTag}
                >
                  {cat.categoryName}
                </Link>
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
          {relatedArticles.map((item: any) => (
            <Link
              key={item._id}
              href={`/blog/${normalize(item.categories?.[0]?.categoryName)}/${normalize(item.author?.authorName)}/${normalize(item.slug)}`}
              className={styles.relatedCard}
            >
              {item.featuredImage?.url && (
                <div className={styles.relatedImage}>
                  <img src={item.featuredImage.url} alt={item.title} />
                </div>
              )}

              <div className={styles.relatedBody}>
                <h3>{item.title}</h3>
             <p>
  <Link
    href={`/blog/${encodeURIComponent(item.categories?.[0]?.categoryName)}/${encodeURIComponent(
      item.author?.authorName
    )}`}
    className={styles.authorLink}
  >
    Published by <b>{item.author?.authorName}</b>
  </Link>{" "}
  | {new Date(item.updatedAt).toLocaleDateString()}
</p>

              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
