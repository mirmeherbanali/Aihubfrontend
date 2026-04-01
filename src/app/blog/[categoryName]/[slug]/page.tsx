"use client";

import { useEffect, useState } from "react";
import BlogDetails from "./BlogDetails";
// import { getBlogById } from "@/features/serverApi/serverApi";
import { useGetBlogByIdQuery } from "@/features/blog/blogApi";

import { useBlogStore } from "@/store/useCategoryStore";

type Props = {
  params: {
    categoryName: string;
    slug: string;
  };
};

export default function Page({ params }: Props) {
  const blogId = useBlogStore((s: any) => s.blogId);
    const setAuthorName = useBlogStore((s: any) => s.setAuthorName);
    const setBlogId = useBlogStore((s: any) => s.setBlogId);
    const finalId = blogId || params.slug;
  // const{data,isLoading} = useGetBlogByIdQuery({id:blogId,categoryName:params?.categoryName})
  const { data, isLoading } = useGetBlogByIdQuery(
  {
    id: finalId,
    categoryName: params.categoryName,
  },
  {
    skip: !finalId, // ✅ important
  }
);
if (isLoading) {
  return <p style={{ padding: 40 }}>Loading blog...</p>;
}

  if (!data?.result?.list?.blog) {
    return <p style={{ padding: 40 }}>Blog not found</p>;
  }
  const { blog, relatedArticles, latestArticle } = data?.result?.list;

  return (
    <BlogDetails

      blog={blog}
      relatedArticles={relatedArticles}
      latestArticles={latestArticle}
      setAuthorName={setAuthorName}
      setBlogId={setBlogId}
    />
  );
}