"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "../ui/style/CategoryToolCard.module.scss";
import { FaArrowRight, FaBookmark, FaBolt, FaSpinner } from "react-icons/fa";
import StarRating from "../ui/common/StarRating";

const CategoryToolCard = ({ tool }: { tool: any }) => {
  const { slug } = useParams() as { slug: string };
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const encodedToolName = encodeURIComponent(tool.toolName);
  const finalURL = `/categories/${slug}/tooldetails/${encodedToolName}`;

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const truncateWords = (text = "", limit = 20) => {
    const words = text.trim().split(/\s+/);
    return words.length <= limit
      ? text
      : words.slice(0, limit).join(" ") + " ...";
  };

  return (
    <Link
      href={finalURL}
      className={styles.cardLinkWrapper}
      onClick={() => setButtonLoading(true)}
    >
      <div
        className={`${styles.modernCard} ${styles.glassEffect}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={`View details for ${tool.toolName}`}
      >
        {/* Header  */}
        <div className={styles.gradientHeader}>
          <div className={styles.logoContainer}>
            {tool.logo ? (
              <img
                src={tool.logo}
                alt={tool.toolName}
                className={styles.logo}
              />
            ) : (
              <div className={styles.placeholderLogo}>{tool.toolName[0]}</div>
            )}
          </div>

          <div className={styles.headerContent}>
            <h2 className={styles.toolName}>{tool.toolName}</h2>
            <StarRating
              rating={tool?.reviewSummary?.avgRating}
              showValue
              totalReviews={tool?.reviewSummary?.totalReviews}
            />
          </div>

          {/* <button
            className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarked : ""}`}
            onClick={toggleBookmark}
          >
            <FaBookmark />
          </button> */}
          <div className={styles.gradientPrice}>
            <div className={styles.priceTag}>
              <span className={styles.priceLabel}>Starting Price</span>
              <span className={styles.priceAmount}>
                ${tool.startingPrice || "0"}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.cardContent}>
          <p className={styles.shortDescription}>
            {truncateWords(tool.description, 20)}
          </p>

          {tool.features?.length > 0 && (
            <section className={styles.features}>
              <h3 className={styles.featuresTitle}>Key Features</h3>
              <ul className={styles.featuresList}>
                {tool.features
                  .slice(0, 3)
                  .map((feature: string, idx: number) => (
                    <li key={idx}>
                      <FaBolt className={styles.featureIcon} />
                      {truncateWords(feature, 10)}
                    </li>
                  ))}
              </ul>
            </section>
          )}

          <div className={styles.cardFooter}>
            <button className={styles.ctaButton} disabled={buttonLoading}>
              {buttonLoading ? (
                <>
                  <FaSpinner className={styles.buttonSpinner} />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Explore</span>
                  <FaArrowRight className={styles.arrowIcon} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryToolCard;
