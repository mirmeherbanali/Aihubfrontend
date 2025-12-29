import styles from "../../components/ui/style/latestNews.module.scss";

export default function LatestNewsSkeleton() {
  return (
    <section className={styles.newsSection}>
      <h2>Latest News on AI</h2>

      <div className={styles.newsGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    </section>
  );
}
