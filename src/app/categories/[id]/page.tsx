import React from "react";
import styles from "../../../components/ui/style/ToolDetails.module.scss";

const ToolDetails = () => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}></div>
          <div>
            <h1 className={styles.title}>Tool C</h1>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.rating}>
            <div className={styles.stars}>⭐⭐⭐⭐☆</div>
            <p>3.5/5 (721)</p>
          </div>
          <button className={styles.visitBtn}>Visit</button>
        </div>
      </div>

      {/* Description */}
      <section className={styles.section}>
        <h2>Tool C Details & Reviews</h2>
        <div className={styles.descBox}>
          <h3>Tool C Description</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non
            tortor sodales, tempor orci et, facilisis odio. Suspendisse varius,
            nibh finibus tincidunt lobortis, sapien nunc maximus eros, vulputate
            tempor lectus elit sed elit.
          </p>
        </div>
      </section>

      {/* Side Info */}
      <aside className={styles.sidebar}>
        <div className={styles.pricingBox}>
          <h4>Pricing</h4>
          <div className={styles.priceInner}>
            <p>Starting Price</p>
            <h3>$20</h3>
          </div>
        </div>

        <div className={styles.altBox}>
          <h4>Tool C Alternatives</h4>
          <div className={styles.altList}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.altItem}>
                <img alt="tool" />
                <span>Tool A</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Features */}
      <section className={styles.section}>
        <h3>Key Features</h3>
        <ul>
          <li>Key Feature 1</li>
          <li>Key Feature 2</li>
          <li>Key Feature 3</li>
          <li>Key Feature 4</li>
          <li>Key Feature 5</li>
        </ul>
      </section>

      {/* Screenshots */}
      <section className={styles.section}>
        <h3>Screenshots</h3>
        <div className={styles.screenshots}>
          <div className={styles.mainShot}>Screenshot 1</div>
          <div className={styles.sideShots}>
            <div>Screenshot 2</div>
            <div>Screenshot 3</div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={styles.section}>
        <h3>Reviews</h3>
        <div className={styles.reviewSummary}>
          <div className={styles.ratingBox}>
            <div className={styles.stars}>⭐⭐⭐⭐☆</div>
            <p>3.5/5 (721)</p>
            <button className={styles.reviewBtn}>Write a Review</button>
          </div>
          <div className={styles.barGraph}>
            <div>
              <span>★★★★★</span>
              <div className={styles.bar}></div>
            </div>
            <div>
              <span>★★★★☆</span>
              <div className={styles.bar}></div>
            </div>
          </div>
        </div>

        <div className={styles.reviewList}>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.avatar}>C</div>
              <div className={styles.reviewContent}>
                <div className={styles.reviewHeader}>
                  <h4>Reviewer Name</h4>
                  <span>12/27/2025</span>
                </div>
                <p>Reviewer Role — Company Name</p>
                <div>⭐⭐⭐⭐☆ 4/5</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  non tortor sodales, tempor orci et, facilisis odio.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolDetails;
