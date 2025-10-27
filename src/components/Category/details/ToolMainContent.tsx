"use client";
import React from "react";
import styles from "@/components/ui/style/ToolMainContent.module.scss";
import { FaPlay } from "react-icons/fa6";
import ReviewSection from "./ReviewSection";

const ToolMainContent = () => {
  return (
    <>
      <div className={styles.mainContent}>
        {/* Description */}
        <div className={styles.descriptionBox}>
          <h2>Tool C Description</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non
            tortor sodales, tempor orci et, facilisis odio. Suspendisse varius,
            nibh finibus tincidunt lobortis, sapien nunc maximus eros.
          </p>
          <p>
            Curabitur pellentesque sed urna vitae cursus. Donec molestie orci
            molestie massa condimentum, non interdum lacus elementum.
          </p>
        </div>

        {/* Features */}
        <div className={styles.featuresBox}>
          <h3>Key Features</h3>
          <ul>
            <li>Key Feature 1</li>
            <li>Key Feature 2</li>
            <li>Key Feature 3</li>
            <li>Key Feature 4</li>
            <li>Key Feature 5</li>
          </ul>
        </div>

        {/* Screenshots */}
        <div className={styles.screenshotsBox}>
          <h3>Screenshots</h3>
          <div className={styles.screenshotGrid}>
            <div className={styles.mainScreenshot}>Screenshot 1</div>
            <div className={styles.sideScreenshots}>
              <button className={styles.active}>Screenshot 1</button>
              <button>Screenshot 2</button>
              <button>Screenshot 3</button>
            </div>
          </div>
        </div>

        {/* Video */}
        <div className={styles.videoBox}>
          <h3>Video</h3>
          <div className={styles.videoPlayer}>
            <FaPlay className={styles.playIcon} />
          </div>
        </div>
      </div>

      <ReviewSection />
    </>
  );
};

export default ToolMainContent;
