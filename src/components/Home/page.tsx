"use client";

import { useRouter } from "next/navigation";
import PageHero from "../Hero/PageHero";
import Categories from "./categories";
import FeaturedTools from "./FeaturedTools";
import LatestNews from "./LatestNews";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import { useGetAllToolsQuery } from "@/features/tools/toolsApi";

export default function HomePage() {
  const router = useRouter();

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: toolsData } = useGetAllToolsQuery();

  const categories = categoriesData?.result?.list || [];
  const tools = (toolsData?.result?.list || [])?.filter(
  (item: { status: string; }) => item.status === "Approved"
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

  return (
    <>
      <PageHero
        content="Discover the Best AI Tools <br /> for Every Need"
        subcontent="Explore 1000+ AI tools categorized by use case, industry, pricing, and popularity."
        queryPlaceholder="Search for Tools & Categories"
        onSearch={(query) => console.log("Searching:", query)}
        btnText="Add Your Tool"
        onBtnClick={() => router.push("/tool")}
      />

      <Categories
        {...({ categoryData: categories, onCategoryClick: handleCategoryClick, onViewAllClick: handleViewAllClick } as any)}
      />

      <LatestNews />

      <FeaturedTools
        toolData={tools}
        allCategories={categories}
        {...({ onToolClick: handleToolClick } as any)}
      />
    </>
  );
}
