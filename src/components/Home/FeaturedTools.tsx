"use client";

import React from "react";
import Link from "next/link";
import styles from "../../components/ui/style/featuredTools.module.scss";
import { slugify } from "@/utils/useEncodeUrl";
import { useCategoryStore } from "@/store/useCategoryStore";

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
}

const FeaturedTools: React.FC<FeaturedToolsProps> = ({
  toolData,
  allCategories,
}) => {
    const setSlug = useCategoryStore((s: any) => s.setSlug);

  const handlePointerDown = (categoryName: string) => {
    setSlug(slugify(categoryName)); // ✅ store category slug before navigation
  };

  return (
    <section className={styles.featuredTools}>
      <h2>Featured Tools</h2>

      <div className={styles.grid}>
        {toolData?.slice(0, 8)?.map((tool) => {
          const categoryId = tool?.category?.[0]?._id;
          const category = allCategories.find((c) => c._id === categoryId);

          if (!category) return null;

          const link = `/product/${slugify(tool.toolName)}`;
          setSlug(slugify(
            category.categoryName
          ));
          return (
            <Link key={tool._id} href={link} className={styles.card}  
            onPointerDown={() =>
                handlePointerDown(category.categoryName)
              } >
              <div className={styles.row}>
                <img
                  src={tool.logo || "/placeholder.png"}
                  alt={tool.toolName}
                  className={styles.logo}
                />

                <div className={styles.textBox}>
                  <h3 className={styles.toolName}>{tool.toolName}</h3>
                  <p className={styles.desc}>
                    {tool.description && tool.description.length > 60
                      ? tool.description.slice(0, 60) + "..."
                      : tool.description || "No description available"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedTools;
