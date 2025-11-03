import styles from "../ui/style/CategoryToolCard.module.scss";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const CategoryToolCard = () => {
  return (
    <div className={styles.toolCard}>
      {/* --- HEADER --- */}
      <header className={styles.cardHeader}>
        {/* 1. Logo */}
        <div className={styles.logoContainer}>
          {/* You would place an <Image> component here */}
        </div>

        {/* 2. Tool Name */}
        <h2 className={styles.toolName}>Tool C</h2>

        {/* 3. Rating */}
        <div className={styles.rating}>
          <div className={styles.stars}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <FaRegStar />
          </div>
          <span className={styles.ratingCount}>3.5/5 (721)</span>
        </div>

        {/* 4. Price */}
        <div className={styles.priceBox}>
          <span className={styles.priceLabel}>Starting Price</span>
          <span className={styles.priceAmount}>$20</span>
        </div>
      </header>

      {/* --- DESCRIPTION --- */}
      <p className={styles.shortDescription}>Short Description Goes Here</p>

      {/* --- KEY FEATURES --- */}
      <section className={styles.features}>
        <h3 className={styles.featuresTitle}>Key Features</h3>
        <ul className={styles.featuresList}>
          <li>Key Feature 1</li>
          <li>Key Feature 2</li>
          <li>Key Feature 3</li>
          <li>Key Feature 4</li>
          <li>Key Feature 5</li>
        </ul>
      </section>
    </div>
  );
};

export default CategoryToolCard;
