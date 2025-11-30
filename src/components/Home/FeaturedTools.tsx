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
  desc?: string;
  category: Category[];
  logo?: string;
}

interface FeaturedToolsProps {
  toolData: Tool[];
  allCategories: Category[];
  onToolClick: (tool: Tool, category: Category) => void;
}

const FeaturedTools: React.FC<FeaturedToolsProps> = ({ toolData, allCategories, onToolClick }) => {
  return (
    <section className={styles.featuredTools}>
      <h2>Featured Tools</h2>

      <div className={styles.grid}>
        {toolData?.slice(0, 4)?.map((tool) => {
          // Find category using _id match
          const categoryId = tool?.category?.[0]?._id;
          const category = allCategories.find((c) => c._id === categoryId);
          // Debug logs
          console.log("🧠 Tool:", tool?.logo);

          return (
            <div
              key={tool._id}
              className={styles.card}
              onClick={() => category && onToolClick(tool, category)}
            >
              <img
                src={tool.logo || "/placeholder.png"}
                alt={tool.toolName}
              />
              <h3>{tool.toolName}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedTools;
