"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/Hero/PageHero";
import Categories from "./categories";
import FeaturedTools from "./FeaturedTools";
import styles from "../ui/style/Home.module.scss";
import LatestNews from "./LatestNews";

interface Props {
  categories: any[];
  tools: any[];
  blog: any[];
}

export default function HomeClient({ categories, tools, blog }: Props) {
  const router = useRouter();
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleSuggestionClick = (tool: any) => {
    setLoadingToolId(tool._id);
    router.push(`/product/${encodeURIComponent(tool.toolName)}`);
    setQuery("");
  };

  const filteredTools = query
    ? tools.filter((tool: any) =>
        tool.toolName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <PageHero
        content="Discover the Best AI Tools <br /> for Every Need"
        subcontent="Explore 1000+ AI tools categorized by use case."
        queryPlaceholder="Search for Tools & Categories"
        liveSearch
        onSearch={(val) => setQuery(val)}
        btnText="Add Your Tool"
        onBtnClick={() => router.push("/tool")}
      />

      {query && filteredTools.length > 0 && (
        <div className={styles.suggestionBox}>
          {filteredTools.slice(0, 6).map((tool: any) => (
            <div
              key={tool._id}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(tool)}
            >
              <img
                src={tool.logo || "/placeholder.png"}
                alt={tool.toolName}
              />
              <div>
                <h4>{tool.toolName}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      <Categories categoryData={categories} />
      <LatestNews blog={blog} />
      <FeaturedTools toolData={tools} allCategories={categories} />
    </>
  );
}