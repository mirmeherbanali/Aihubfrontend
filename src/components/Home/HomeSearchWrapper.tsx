"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/Hero/PageHero";
import Link from "next/link";
import { slugify } from "@/utils/useEncodeUrl";
import { useCategoryStore } from "@/store/useCategoryStore";
import styles from "../ui/style/Home.module.scss";

interface Props {
  categories: any[];
  tools: any[];
}

export default function HomeSearchWrapper({ categories, tools }: Props) {
  const router = useRouter();
  const setSlug = useCategoryStore((s: any) => s.setSlug);
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // 🔎 Filter tools
  const filteredTools = query
    ? tools.filter((tool: any) =>
        tool.toolName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // 🔎 Filter categories
  const filteredCategories = query
    ? categories.filter((cat: any) =>
        cat.categoryName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handlePointerDown = (categoryName: string) => {
    setSlug(slugify(categoryName));
  };

  return (
    <div className={styles.searchWrapper}>
      <PageHero
        content="Discover the Best AI Tools <br /> for Every Need"
        subcontent="Explore 1000+ AI tools categorized by use case."
        queryPlaceholder="Search for Tools & Categories"
        liveSearch
        onSearch={(val) => setQuery(val)}
        btnText="Add Your Tool"
        onBtnClick={() => router.push("/tool")}
      />

      {/* ================= SUGGESTION BOX ================= */}
      {query && (filteredTools.length > 0 || filteredCategories.length > 0) && (
        <div className={styles.suggestionBox}>
          {/* ================= TOOLS ================= */}
          {filteredTools.slice(0, 6).map((tool: any) => {
            const categoryId = tool?.category?.[0]?._id;
            const category = categories.find((c) => c._id === categoryId);

            if (!category) return null;

            const toolSlug = slugify(tool.toolName);
            return (
              <Link
                key={tool._id}
                href={`/product/${toolSlug}`}
                className={styles.suggestionItem}
                onPointerDown={() => handlePointerDown(category.categoryName)}
              >
                <img src={tool.logo || "/placeholder.png"} alt={tool.toolName} />
                <div>
                  <h4>{tool.toolName}</h4>
                </div>
              </Link>
            );
          })}

          {/* ================= CATEGORIES ================= */}
          {filteredCategories.slice(0, 4).map((cat: any) => {
            const slug = slugify(cat.categoryName);
            return (
              <Link
                key={cat._id}
                href={`/category/${slug}`}
                className={styles.suggestionItem}
                onClick={() => setQuery("")}
              >
                <img src={cat.icon || "/placeholder.png"} alt={cat.categoryName} />
                <div>
                  <h4>{cat.categoryName}</h4>
                  <span style={{ fontSize: "12px", opacity: 0.6 }}>Category</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
