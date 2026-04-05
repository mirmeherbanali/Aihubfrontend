"use client";

import { useBlogStore } from "@/store/useCategoryStore";
import BlogDetails from "./BlogDetails";

type Props = {
  blog: any;
  relatedArticles: any[];
  latestArticles: any[];
};

export default function BlogDetailsClient({
  blog,
  relatedArticles,
  latestArticles,
}: Props) {
  const setAuthorName = useBlogStore((s: any) => s.setAuthorName);
  const setBlogId = useBlogStore((s: any) => s.setBlogId);

  return (
    <BlogDetails
      blog={blog}
      relatedArticles={relatedArticles}
      latestArticles={latestArticles}
      setAuthorName={setAuthorName}
      setBlogId={setBlogId}
    />
  );
}
