import styles from "../../../components/ui/style/BlogDetails.module.scss"
type Props = {
  params: {
    slug: string;
  };
};

export default function BlogDetailsPage({ params }: Props) {
  const { slug } = params;

  return (
  <>
      {/* ================= HEADER ================= */}
      <div className={styles.header}>
        <span className={styles.category}>Category Name</span>

        <h1 className={styles.title}>Blog Post Title</h1>

        <div className={styles.metaRow}>
          <div className={styles.author}>
            <div className={styles.authorAvatar}>C</div>
            <span>
              Published By <b>Author Name</b>
            </span>
          </div>

          <span>
            Last Updated On <b>December 19, 2025</b>
          </span>
        </div>
      </div>

      {/* ================= FULL WIDTH FEATURED IMAGE ================= */}
      <div className={styles.featuredImageFull}>
        <div className={styles.featuredImageInner}>
          <div>{`{Featured Image}`}</div>
          <small>Dimension: 1280 × 630</small>
        </div>
      </div>

      {/* ================= CONTENT + SIDEBAR ================= */}
      <section className={styles.blogLayout}>
        {/* LEFT CONTENT */}
        <article className={styles.mainContent}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            sed elit id justo accumsan rutrum. Sed semper libero turpis, ut
            porttitor massa vehicula vel.
          </p>

          <p>
            Suspendisse nec dictum felis. Sed dapibus magna sit amet mollis
            accumsan. Curabitur euismod lacus eu consequat facilisis.
          </p>

          <h2>Integer varius ac arcu nec viverra</h2>

          <p>
            Vestibulum posuere ipsum tincidunt vestibulum congue. Curabitur
            luctus ipsum eu arcu mattis tristique.
          </p>

          <h3>Vestibulum posuere ipsum tincidunt</h3>

          <p>
            Cras eget magna dignissim, semper nulla a, porttitor risus.
            Vivamus libero lectus, consequat vel sapien.
          </p>
        </article>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Latest Articles</h3>

          <div className={styles.sidebarBlock}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.latestCard}>
                <div className={styles.latestImage}>{`{Featured Image}`}</div>
                <span className={styles.latestCategory}>Category Name</span>
                <h4 className={styles.latestTitle}>Blog Post Title</h4>
                <p className={styles.latestMeta}>
                  Published By Author Name
                </p>
                <p className={styles.latestMeta}>
                  December 19, 2025
                </p>
              </div>
            ))}
          </div>

          <h3 className={styles.sidebarTitle}>Top Categories</h3>

          <div className={styles.sidebarBlock}>
            <div className={styles.categories}>
              <span>Category 1</span>
              <span>Category 2</span>
              <span>Category 3</span>
              <span>Category 4</span>
            </div>
          </div>
        </aside>
      </section>
      {/* ================= RELATED ARTICLES ================= */}
<section className={styles.relatedSection}>
  <h2 className={styles.relatedTitle}>Related Articles</h2>

  <div className={styles.relatedGrid}>
    {[1, 2, 3].map((i) => (
      <article key={i} className={styles.relatedCard}>
        <div className={styles.relatedImage}>{`{Featured Image}`}</div>

        <span className={styles.relatedCategory}>Category Name</span>

        <h3 className={styles.relatedPostTitle}>Blog Post Title</h3>

        <p className={styles.relatedMeta}>
          Published By <b>Author Name</b>
        </p>
        <p className={styles.relatedMeta}>
          Published On December 19, 2025
        </p>
      </article>
    ))}
  </div>
</section>

    </>
  );
}
