"use client";

import React from "react";
import styles from "@/components/ui/style/ToolRightSidebar.module.scss";
import Link from "next/link";
import { slugify } from "@/utils/useEncodeUrl";
interface ToolRightSidebarProps {
  tool: any;
  category: any; 
  slug:string;
  onViewAll: () => void;
}

const ToolRightSidebar: React.FC<ToolRightSidebarProps> = ({ tool, category,slug, onViewAll }) => {
  if (!tool || !category?.tools) return null;

  return (
    
    <aside className={styles.sidebar}>
       <div className={styles.pricingCard}>
        <h3 className={styles.pricingTitle}>Pricing</h3>
        <div className={styles.priceBox}>
          <span className={styles.priceLabel}>Starting Price</span>
          <span className={styles.priceValue}>
            ${tool.startingPrice || "0"}
          </span>
        </div>
      </div>
      
      <h2 className={styles.title}>{tool.toolName} Alternatives</h2>

      <div className={styles.cardList}>
        {category.tools.map((altTool: any) => (
          <Link
            key={altTool._id}
            href={`/categories/${slug}/tooldetails/${slugify(
              altTool.toolName
            )}`}
            className={styles.altCard}
          >
            <div className={styles.cardImage}>
              <img
                src={altTool.logo || "https://via.placeholder.com/50"}
                alt={altTool.toolName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className={styles.cardText}>
              <span className={styles.cardTitle}>
                {altTool.toolName}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {category.tools.length > 0 && (
        <button className={styles.viewAllBtn} onClick={onViewAll}>
          View All &gt;
        </button>
      )}
    </aside>
  );
};

export default ToolRightSidebar;
