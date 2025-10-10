import React from "react";
import styles from "../../components/ui/style/categoryCard.module.scss";
import { FaImage, FaVideo, FaMicrophone, FaPenNib } from "react-icons/fa";

const Categories = () => {
  const categories = [
    { icon: <FaImage />, title: "Image Generation" },
    { icon: <FaVideo />, title: "Video Generation" },
    { icon: <FaMicrophone />, title: "Audio Generation" },
    { icon: <FaPenNib />, title: "Content Writing" }
  ];

  return (
    <section className={styles.categoriesSection}>
      <h1 className={styles.heading}>Top Categories</h1>
      <div className={styles.grid}>
        {categories.map((cat, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>{cat.icon}</div>
            <p>{cat.title}</p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className={styles.viewAllWrapper}>
        <button className={styles.viewAllBtn}>
          View All <span>›</span>
        </button>
      </div>
    </section>
  );
};

export default Categories;
