"use client";

import React from "react";
import styles from "../../components/ui/style/featuredTools.module.scss";

interface Tool {
  _id: string;
  toolName: string;
  desc?: string;
  category: { _id: string; categoryName: string }[];
  imageUrl?: string;
}

interface FeaturedToolsProps {
  toolData: Tool[];
  onToolClick: (tool: Tool, category: { _id: string; categoryName: string }) => void;
}

const FeaturedTools: React.FC<FeaturedToolsProps> = ({ toolData, onToolClick }) => {
  return (
    <section className={styles.featuredTools}>
      <h2>Featured Tools</h2>

      <div className={styles.grid}>
        {toolData.map((tool) => {
          const category = tool.category?.[0];
          return (
            <div
              key={tool._id}
              className={styles.card}
              onClick={() => category && onToolClick(tool, category)}
            >
              <img
                src={tool.imageUrl || "/placeholder.png"}
                alt={tool.toolName}
              />
              <h3>{tool.toolName}</h3>
              <p>{tool.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedTools;
