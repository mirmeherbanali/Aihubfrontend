"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/Hero/PageHero";
import Categories from "./categories";
import FeaturedTools from "./FeaturedTools";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import { useGetAllToolsQuery } from "@/features/tools/toolsApi";
import styles from "../ui/style/Home.module.scss";

export default function HomeClient() {
  const router = useRouter();

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: toolsData } = useGetAllToolsQuery();
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null);

  const [query, setQuery] = useState("")

  if (!categoriesData || !toolsData) return null;

  const categories = categoriesData.result.list;
  const tools = toolsData.result.list.filter(
    (item: any) => item.status === "Approved"
  );

  const handleCategoryClick = (slug: string) => {
    router.push(`/categories/${encodeURIComponent(slug)}`);
  };

  const handleViewAllClick = () => {
    window.open("/categories");
  };

  const handleToolClick = (tool: any, category: any) => {
    const categorySlug = category.categoryName;
    router.push(
      `/categories/${encodeURIComponent(categorySlug)}/tooldetails/${encodeURIComponent(tool.toolName)}`
    );
  };

  const filteredTools = query
    ? tools.filter((tool: any) =>
        tool.toolName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSuggestionClick = (tool: any) => {
    const categoryId = tool.category?.[0]?._id;
    const category = categories.find((c: any) => c._id === categoryId);

    if (!category) return;
    // 🔥 show loading immediately
    setLoadingToolId(tool._id);
    router.push(
      `/categories/${encodeURIComponent(
        category.categoryName
      )}/tooldetails/${encodeURIComponent(tool.toolName)}`
    );
    setQuery("");
  };


  return (
    <>
      <PageHero
        content="Discover the Best AI Tools <br /> for Every Need"
        subcontent="Explore 1000+ AI tools categorized by use case, industry, pricing, and popularity."
        queryPlaceholder="Search for Tools & Categories"
        liveSearch
        onSearch={(val) => setQuery(val)}
        btnText="Add Your Tool"
        onBtnClick={() => router.push("/tool")}
      />
{/* 🔽 SEARCH SUGGESTIONS */}
      {query && filteredTools.length > 0 && (
        <div className={styles.suggestionBox}>
          {filteredTools.slice(0, 6).map((tool: any) => {
            const categoryId = tool.category?.[0]?._id;
            const category = categories.find(
              (c: any) => c._id === categoryId
            );

            return (
              <div
                key={tool._id}
                className={`${styles.suggestionItem} ${
  loadingToolId === tool._id ? styles.loading : ""
}`}
                onClick={() => handleSuggestionClick(tool)}
              >
                <div className={styles.left}>
                     {loadingToolId === tool._id ? (
      <div className={styles.spinner}></div>
    ) :(
                  <img
                    src={tool.logo || "/placeholder.png"}
                    alt={tool.toolName}
                  />
    )}
                </div>

                <div className={styles.right}>
                  <h4>{tool.toolName}</h4>
                  <span> {loadingToolId === tool._id ? "Opening tool..." : category?.categoryName}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Categories
        {...({ categoryData: categories, onCategoryClick: handleCategoryClick, onViewAllClick: handleViewAllClick } as any)}
      />


      <FeaturedTools
        toolData={tools}
        allCategories={categories}
        {...({ onToolClick: handleToolClick } as any)}
      />
    </>
  );
}