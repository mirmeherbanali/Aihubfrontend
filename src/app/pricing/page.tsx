
import React from "react";
import styles from '../../components/ui/style/Price.module.scss';

const Price: React.FC = () => {
  return (
    <section className={styles.pageWrapper}>
      <div className={styles.pricingDesign1}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reculp Pricing</h1>
          <p className={styles.subtitle}>
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className={styles.pricingContainer}>
          {/* Listing */}
          <div className={`${styles.pricingCard} ${styles.listingCard}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Listing</h3>
              <div className={styles.price}>
                <span className={styles.priceAmount}>$49</span>
                <span className={styles.priceDescription}>
                  One-Time Price
                </span>
              </div>
            </div>

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>1 Tool Listing</li>
              <li className={styles.featureItem}>User Reviews</li>
              <li className={styles.featureItem}>Profile Management</li>
              <li className={styles.featureItem}>5 Categories</li>
              <li className={styles.featureItem}>
                Buyer Intent Exposure
              </li>
            </ul>

            <button className={styles.ctaButton}>Get Started</button>
          </div>

          {/* Premium */}
          <div className={`${styles.pricingCard} ${styles.premiumCard}`}>
            <div className={styles.badge}>Most Popular</div>

            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Lead Generation</h3>

              <div className={styles.price}>
                <span className={styles.priceAmount}>$49</span>
                <span className={styles.priceDescription}>Monthly</span>
              </div>

              <div className={styles.annualPrice}>
                <span className={styles.annualAmount}>$299</span>
                <span className={styles.annualText}>
                  Annual (Save 49%)
                </span>
              </div>
            </div>

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>All Listing Features</li>
              <li className={styles.featureItem}>Analytics</li>
              <li className={styles.featureItem}>Remarketing</li>
              <li className={styles.featureItem}>Sponsored Placement</li>
              <li className={styles.featureItem}>Homepage Feature</li>
              <li className={styles.featureItem}>Priority Support</li>
            </ul>

            <button className={styles.ctaButtonPremium}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Price;
