"use client";

import React from "react";
import styles from "@/components/ui/style/ToolMainContent.module.scss";
import { FaPlay } from "react-icons/fa6";
import ReviewSection from "./ReviewSection";

interface ToolMainContentProps {
  tool: any; // Replace 'any' with your Tool type if available
}

const ToolMainContent: React.FC<ToolMainContentProps> = ({ tool }) => {
  if (!tool) return null; // Safety check for progressive loading

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
              <div className={styles.mainScreenshot}>
                <img
                  src={tool.screenshots[0]}
                  alt="Main Screenshot"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={styles.sideScreenshots}>
                {tool.screenshots.map((shot: string, idx: number) => (
                  <button
                    key={idx}
                    className={idx === 0 ? styles.active : ""}
                    onClick={() => {
                      // Optional: Implement screenshot switching logic here
                    }}
                  >
                    Screenshot {idx + 1}
                  </button>
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
            <h3>Tags</h3>
            <div className={styles.tagsGrid}>
  <span className={styles.tag}>{tool.tags.join(", ")}</span>
</div>


          </div>
        )}
      </div>

      <ReviewSection />
    </>
  );
};

export default ToolMainContent;
