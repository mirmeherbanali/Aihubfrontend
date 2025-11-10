"use client";

import { useRouter, useParams } from "next/navigation";
import styles from "../ui/style/CategoryToolCard.module.scss";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import StarRating from "../ui/common/StarRating";

const CategoryToolCard = ({ tool }: { tool: any }) => {
  const router = useRouter();
  const { slug } = useParams(); // get category slug from URL

  // Handle click → navigate to tool details page
  const handleClick = () => {
    const encodedToolName = encodeURIComponent(tool.toolName);
    router.push(`/categories/${slug}/tooldetails/${encodedToolName}`);
  };

  return (
    <div
      className={`${styles.toolCard} cursor-pointer transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg`}
      onClick={handleClick}
      title={`View details for ${tool.toolName}`}
    >
      {/* --- HEADER --- */}
      <header className={styles.cardHeader}>
        {/* 1. Logo */}
        <div className={styles.logoContainer}>
          {tool.logo ? (
            <img src={tool.logo} alt={tool.toolName} className={styles.logo} />
          ) : (
            <div className={styles.placeholderLogo}>{tool.toolName[0]}</div>
          )}
        </div>

        {/* 2. Tool Name */}
        <h2 className={styles.toolName}>{tool.toolName}</h2>

        {/* 3. Rating (Static for now) */}
        <StarRating  rating={tool?.reviewSummary?.avgRating} showValue totalReviews={tool?.reviewSummary?.totalReviews}

        />
        {/* <div className={styles.rating}>
          <div className={styles.stars}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <FaRegStar />
          </div>
          <span className={styles.ratingCount}>3.5/5 (721)</span>
        </div> */}

        {/* 4. Price */}
        <div className={styles.priceBox}>
          <span className={styles.priceLabel}>Pricing</span>
          <span className={styles.priceAmount}>
            {tool.pricingType || "N/A"}
          </span>
        </div>
      </header>

      {/* --- DESCRIPTION --- */}
      <p className={styles.shortDescription}>{tool.description}</p>

      {/* --- FEATURES --- */}
      {tool.features?.length > 0 && (
        <section className={styles.features}>
          <h3 className={styles.featuresTitle}>Key Features</h3>
          <ul className={styles.featuresList}>
            {tool.features.slice(0, 5).map((feature: string, idx: number) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default CategoryToolCard;
