import styles from "../components/ui/style/home.module.scss";

export default function Page() {
  return (
    <section className={styles.hero}>
      {/* Background Circles */}
      <div className={`${styles.circle} ${styles.circleBlue}`} />
      <div className={`${styles.circle} ${styles.circlePink}`} />
      <div className={`${styles.circle} ${styles.circleGreen}`} />

      {/* Watermark SVGs */}
      <img
        src="/icons/greenCircle.svg"
        alt="Red Circle"
        className={`${styles.watermark} ${styles.watermarkTopLeft}`}
      />
      <img
        src="/icons/redcircle.svg"
        alt="Green Circle"
        className={`${styles.watermark} ${styles.watermarkBottomLeft}`}
      />

      {/* Content */}
      <div className={styles.content}>
        <h1>
          Discover the Best AI Tools <br /> for Every Need
        </h1>
        <p>
          Explore 1000+ AI tools categorized by use case, industry, pricing, and
          popularity.
        </p>

        {/* Search */}
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search for Tools & Categories" />
          <button>Search</button>
        </div>

        {/* CTA */}
        <button className={styles.ctaBtn}>Add Your Tool</button>
      </div>
    </section>
  );
}
