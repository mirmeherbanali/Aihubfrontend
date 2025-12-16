"use client";

import React, { useState } from "react";
import styles from "@/components/ui/style/ToolMainContent.module.scss";
import { FaPlay } from "react-icons/fa6";
import ReviewSection from "./ReviewSection";

interface ToolMainContentProps {
  tool: any;
  category:any,
  reviewsData?: any;
  isReviewsLoading?: boolean;
}

const ToolMainContent: React.FC<ToolMainContentProps> = ({ tool, reviewsData,category, isReviewsLoading }) => {
  if (!tool) return null;

  // TRACK ACTIVE SCREENSHOT
  const [activeScreenshot, setActiveScreenshot] = useState(tool.screenshots?.[0] || "");

  return (
    <>
      <div className={styles.mainContent}>
        {/* Description */}
        <div className={styles.descriptionBox}>
          <h2>{tool.toolName || "Tool Name"} Description</h2>
          <p>{tool.description || "No description available."}</p>
        </div>

        {/* Features */}
        {tool.features?.length > 0 && (
          <div className={styles.featuresBox}>
            <h3>Key Features</h3>
            <ul>
              {tool.features.map((feature: string, idx: number) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Screenshots */}
        {tool.screenshots?.length > 0 && (
          <div className={styles.screenshotsBox}>
            <h3>Screenshots</h3>

            <div className={styles.screenshotGrid}>
              {/* MAIN SCREENSHOT */}
              <div className={styles.mainScreenshot}>
                <img
                  src={activeScreenshot}
                  alt="Main Screenshot"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* SIDE THUMBNAILS */}
              <div className={styles.sideScreenshots}>
                {tool.screenshots.map((shot: string, idx: number) => (
                  <a
                    key={idx}
                    onClick={() => setActiveScreenshot(shot)}
                    className={`${styles.thumbnailLink} ${activeScreenshot === shot ? styles.active : ""}`}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={shot}
                      alt={`Screenshot ${idx + 1}`}
                      className={styles.thumbnailImage}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Video */}
        {tool.demoVideoUrl && (
          <div className={styles.videoBox}>
            <h3>Video</h3>
            <div className={styles.videoPlayer}>
              <a
                href={tool.demoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.playIconWrapper}
              >
                <FaPlay className={styles.playIcon} />
              </a>
            </div>
          </div>
        )}

        {/* Tags */}
        {tool.tags?.length > 0 && (
          <div className={styles.tagsBox}>
            <h3>Category</h3>
            <div className={styles.tagsGrid}>
              
              <span className={styles.tag}>{category.categoryName}</span>

              {/* <span className={styles.tag}>{tool.tags.join(", ")}</span> */}
            </div>
          </div>
        )}
      </div>

      <ReviewSection tool={tool} reviewsData={reviewsData} isReviewsLoading={isReviewsLoading} />
    </>
  );
};

export default ToolMainContent;
