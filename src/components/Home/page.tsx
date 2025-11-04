"use client";

import { useRouter } from "next/navigation";
import PageHero from "../Hero/PageHero";
import Categories from "./Categories";
import FeaturedTools from "./FeaturedTools";
import LatestNews from "./LatestNews";
import { useGetAllCategoriesQuery } from "@/features/dashboard/category/categoryApi";
import { useGetAllToolsQuery } from "@/features/tools/toolsApi";

export default function HomePage() {
  const router = useRouter();

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: toolsData } = useGetAllToolsQuery();

  const categories = categoriesData?.result?.list || [];
  const tools = toolsData?.result?.list?.list || [];

  // Navigate to dashboard
  const handleClick = () => {
    router.push("/dashboard?tab=1");
  };
console.log("categories",categories)
  return (
    <>
      <PageHero
        content="Discover the Best AI Tools <br /> for Every Need"
        subcontent="Explore 1000+ AI tools categorized by use case, industry, pricing, and popularity."
        queryPlaceholder="Search for Tools & Categories"
        onSearch={(query) => console.log("Searching:", query)}
        btnText="Add Your Tool"
        onBtnClick={handleClick}
      />

      <Categories
        categoryData={categories}
        onViewAll={(slug: string) =>
          router.push(`/categories/${encodeURIComponent(slug)}`)
        }
      />

      <LatestNews />

      <FeaturedTools
        toolData={tools}
        onToolClick={(tool, category) =>
          router.push(
            `/categories/${encodeURIComponent(category.categoryName)}/tooldetails/${encodeURIComponent(tool.toolName)}`
          )
        }
      />
    </>
  );
}
