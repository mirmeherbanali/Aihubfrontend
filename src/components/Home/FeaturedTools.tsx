"use client";

import React from "react";
import styles from "../../components/ui/style/featuredTools.module.scss";

interface Category {
  _id: string;
  categoryName: string;
  slug?: string;
}

interface Tool {
  _id: string;
  toolName: string;
  description?: string;
  category: Category[];
  logo?: string;
}

interface FeaturedToolsProps {
  toolData: Tool[];
  allCategories: Category[];
  onToolClick: (tool: Tool, category: Category) => void;
}

const FeaturedTools: React.FC<FeaturedToolsProps> = ({
  toolData,
  allCategories,
  onToolClick,
}) => {
  return (
    <section className={styles.featuredTools}>
      <h2>Featured Tools</h2>

      <div className={styles.grid}>
        {toolData?.slice(0, 8)?.map((tool) => {
          const categoryId = tool?.category?.[0]?._id;
          const category = allCategories.find((c) => c._id === categoryId);

          return (
            <div
              key={tool._id}
              className={styles.card}
              onClick={() => category && onToolClick(tool, category)}
            >
              <div className={styles.row}>
                <img
                  src={tool.logo || "/placeholder.png"}
                  alt={tool.toolName}
                  className={styles.logo}
                />

                <div className={styles.textBox}>
                  <h3 className={styles.toolName}>{tool.toolName}</h3>
                  <p className={styles.desc}>
                    {tool.description?.length > 60
                      ? tool.description.slice(0, 60) + "..."
                      : tool.description || "No description available"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedTools;
