import React from "react";
import styles from "../../components/ui/style/latestNews.module.scss";

const LatestNews = () => {
  const news = [
    { id: 1, title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
    { id: 2, title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
    { id: 3, title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" }
  ];

  return (
    <section className={styles.newsSection}>
      <h2>Latest News on AI</h2>

      <div className={styles.newsGrid}>
        {news.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.image}></div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      <button className={styles.viewBtn}>
        View All <span>›</span>
      </button>
    </section>
  );
};

export default LatestNews;
