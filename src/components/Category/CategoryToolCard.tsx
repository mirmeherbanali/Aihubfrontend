"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import styles from "../ui/style/CategoryToolCard.module.scss";
import { FaArrowRight, FaBookmark, FaBolt, FaSpinner } from "react-icons/fa";
import StarRating from "../ui/common/StarRating";

const CategoryToolCard = ({ tool }: { tool: any }) => {
  const router = useRouter();
  const { slug } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      const encodedToolName = encodeURIComponent(tool.toolName);
      await router.push(`/categories/${slug}/tooldetails/${encodedToolName}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setIsLoading(false);
    }
  };

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setButtonLoading(true);
    
    try {
      const encodedToolName = encodeURIComponent(tool.toolName);
      await router.push(`/categories/${slug}/tooldetails/${encodedToolName}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setButtonLoading(false);
    }
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div
      className={`${styles.modernCard} ${styles.glassEffect} ${
        isLoading ? styles.loading : ''
      } cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`View details for ${tool.toolName}`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinnerContainer}>
            <FaSpinner className={styles.spinner} />
            <span className={styles.loadingText}>Loading...</span>
          </div>
        </div>
      )}

      {/* Header with gradient */}
      <div className={styles.gradientHeader}>
        <div className={styles.logoContainer}>
          {tool.logo ? (
            <img src={tool.logo} alt={tool.toolName} className={styles.logo} />
          ) : (
            <div className={styles.placeholderLogo}>{tool.toolName[0]}</div>
          )}
        </div>
        
        <div className={styles.headerContent}>
          <h2 className={styles.toolName}>{tool.toolName}</h2>
          <div className={styles.ratingContainer}>
            <StarRating 
              rating={tool?.reviewSummary?.avgRating} 
              showValue 
              totalReviews={tool?.reviewSummary?.totalReviews}
            />
          </div>
        </div>

        <button 
          className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarked : ''}`}
          onClick={toggleBookmark}
          disabled={isLoading}
        >
          <FaBookmark />
        </button>
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <p className={styles.shortDescription}>{tool.description}</p>
        
        {tool.features?.length > 0 && (
          <section className={styles.features}>
            <h3 className={styles.featuresTitle}>Key Features</h3>
            <ul className={styles.featuresList}>
              {tool.features.slice(0, 3).map((feature: string, idx: number) => (
                <li key={idx}>
                  <FaBolt className={styles.featureIcon} />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className={styles.cardFooter}>
          <div className={styles.priceTag}>
            <span className={styles.priceLabel}>Starting at</span>
            <span className={styles.priceAmount}>
              {tool.pricingType || "Free"}
            </span>
          </div>
          
          <button 
            className={`${styles.ctaButton} ${isHovered ? styles.hovered : ''} ${
              buttonLoading ? styles.loading : ''
            }`}
            onClick={handleButtonClick}
            disabled={isLoading || buttonLoading}
          >
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
  );
};

export default CategoryToolCard;