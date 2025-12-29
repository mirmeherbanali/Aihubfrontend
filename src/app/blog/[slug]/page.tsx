"use client";

import { useGetAllBlogsQuery } from "@/features/blog/blogApi";
import styles from "../../../components/ui/style/BlogDetails.module.scss";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";

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

  if (isLoading) return <Loader />;
  if (!blog) return <p className={styles.center}>Blog not found.</p>;
  console.log("chk", blog);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className={styles.header}>
        <div className={styles.categoryRow}>
          {blog.categories?.length ? (
            blog.categories.map((cat: any) => (
              <Link
                key={cat._id}
                href={`/blog?category=${cat.categorySlug}`}
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
            <span>
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
            <Link
              key={item._id}
              href={`/blog/${item.slug}`}
              className={styles.sideCard}
            >
              {item.featuredImage?.url && (
                <div className={styles.sideImage}>
                  <img src={item.featuredImage.url} alt={item.title} />
                </div>
              )}

              {item.categories?.length ? (
                item.categories.map((cat: any) => (
                  <span key={cat._id} className={styles.badge}>
                    {cat.categoryName}
                  </span>
                ))
              ) : (
                <span className={styles.badge}>Uncategorized</span>
              )}

              <h4>{item.title}</h4>

              <small>{new Date(item.updatedAt).toLocaleDateString()}</small>
            </Link>
          ))}

          {/* ================= TOP CATEGORIES ================= */}
          <h3 className={styles.sidebarTitle}>Top Categories</h3>

          <div className={styles.categoryWrap}>
            {blog.categories?.length ? (
              blog.categories.map((cat: any) => (
                <Link
                  key={cat._id}
                  href={`/blog?category=${cat.categorySlug}`}
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
          {latestArticles.map((item: any) => (
            <Link
              key={item._id}
              href={`/blog/${item.slug}`}
              className={styles.relatedCard}
            >
              {item.featuredImage?.url && (
                <div className={styles.relatedImage}>
                  <img src={item.featuredImage.url} alt={item.title} />
                </div>
              )}

              <div className={styles.relatedBody}>
                {item.categories?.length ? (
                  item.categories.map((cat: any) => (
                    <span key={cat._id} className={styles.badge}>
                      {cat.categoryName}
                    </span>
                  ))
                ) : (
                  <span className={styles.badge}>Uncategorized</span>
                )}

                <h3>{item.title}</h3>

                <p>
                  By <b>{item.author?.authorName} </b>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
