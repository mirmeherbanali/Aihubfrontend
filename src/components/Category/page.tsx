"use client";
import { IndustryTools, UseCaseTools, UserTypeTools } from "@/data/index";
import PageHero from "../Hero/PageHero";
import CategoryGrid from "./CategoryGrid";

export default function CategoryPage() {
  return (
    <>
      <PageHero
        content="Explore AI Tools by Category"
        subcontent="Find the perfect AI tool for your industry, use case, or role."
        queryPlaceholder="Search for Tools & Categories"
        onSearch={(query) => console.log("Searching:", query)}
      />
      <CategoryGrid title="AI Tools by Industry" items={IndustryTools} />
      <CategoryGrid title="AI Tools by User Type" items={UserTypeTools} />
      <CategoryGrid title="AI Tools by Use Case" items={UseCaseTools} />
    </>
  );
}
