"use client";
import styles from "../ui/style/CategoryDescription.module.scss";

const CategoryDescription = ({ title, description }: { title: string; description: string }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </section>
  );
};

export default CategoryDescription;
