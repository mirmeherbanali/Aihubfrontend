"use client";

import { useRouter } from "next/navigation";
import PageHero from "../Hero/PageHero";
import Categories from "./categories";
import FeaturedTools from "./FeaturedTools";
import LatestNews from "./LatestNews";

export default function HomePage() {
  const router = useRouter();

  // Dummy navigation to Dashboard
  const handleClick = () => {
    console.log("CTA clicked");
    router.push("/dashboard?tab=1");
  };

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

      <Categories />
      <LatestNews />
      <FeaturedTools />
    </>
  );
}
