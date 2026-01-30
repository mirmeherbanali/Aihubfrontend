import CategoryPage from "@/components/Category/page";
import React from "react";

const page = ({ searchParams }: { searchParams: { page?: string } }) => {
  return <CategoryPage searchParams={searchParams} />;
};

export default page;
