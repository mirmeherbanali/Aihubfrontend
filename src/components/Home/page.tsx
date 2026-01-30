import PageHero from "../Hero/PageHero";
import Categories from "./categories";
import FeaturedTools from "./FeaturedTools";
import { getAllBlogs, getCategories, getTools } from "@/features/serverApi/serverApi";
import HomeClient from "./HomeClient";
import styles from "../ui/style/Home.module.scss";
import LatestNewsServer from "./LatestNewsServer";
import { Suspense } from "react";
import LatestNewsSkeleton from "./LatestNewsSkeleton";

export default async function HomePage() {
  const [categories, tools, blog] = await Promise.all([
    getCategories(),
    getTools(),
    getAllBlogs(),
  ]);

  return (
    <>
      {/* ✅ SERVER FALLBACK (JS OFF) */}
      <div className={styles.homeServer}>
        <PageHero
          content="Discover the Best AI Tools <br /> for Every Need"
          subcontent="Explore 1000+ AI tools categorized by use case, industry, pricing, and popularity."
          queryPlaceholder="Search for Tools & Categories"
          btnText="Add Your Tool"
        />
        <Categories categoryData={categories} />
        
          <LatestNewsServer blog={blog} />
        <FeaturedTools toolData={tools} allCategories={categories} />
      </div>

      {/* ✅ CLIENT UI (JS ON) */}
      <div className={styles.homeClient}>
        <HomeClient />
      </div>
    </>
  );
}
