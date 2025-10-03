"use client";

import Categories from "@/lib/home/categories";
import styles from "../components/ui/style/home.module.scss";
import LatestNews from "@/lib/home/LatestNews";
import FeaturedTools from "@/lib/home/FeaturedTools";
import PageHero from "@/lib/hero/PageHero";

export default function Page() {
  return (
    <>
      <PageHero
        content="Discover the Best AI Tools <br /> for Every Need"
        subcontent="Explore 1000+ AI tools categorized by use case, industry, pricing, and popularity."
        queryPlaceholder="Search for Tools & Categories"
        onSearch={(query) => console.log("Searching:", query)}
        btnText="Add Your Tool"
        onBtnClick={() => console.log("CTA clicked")}
      />

      <Categories />
      <LatestNews />
      <FeaturedTools />
    </>
  );
}
