import React from "react";
import Link from "next/link";
import styles from "../../components/ui/style/latestNews.module.scss";

const LatestNews = () => {
  const news = [
    { id: 1, title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
    { id: 2, title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
    { id: 3, title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
    { id: 4, title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
  ];

  return (
    <section className={styles.newsSection}>
      <h2>Latest News on AI</h2>

      <div className={styles.newsGrid}>
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className={styles.card}
          >
            <div className={styles.upperPart}>
              <div className={styles.upperPartFace}>{item.title}</div>
              <div className={styles.upperPartBack}>
                Some Additional Information At The Back Side
              </div>
            </div>

            <div className={styles.lowerPart}>
              <div className={styles.lowerPartFace}>Face Side</div>
              <div className={styles.lowerPartBack}>Back Side</div>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/news" className={styles.viewBtn}>
        View All <span>›</span>
      </Link>
    </section>
  );
};

export default LatestNews;
