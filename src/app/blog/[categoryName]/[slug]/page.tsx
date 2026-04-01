import { Metadata } from "next";
import { getBlogBySlug } from "@/features/serverApi/serverApi";
import BlogDetailsClient from "./BlogDetailsClient";
import { ENV } from "@/env";

type Props = {
  params: {
    categoryName: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getBlogBySlug(params.slug, params.categoryName);

  const blog = data?.blog;

  if (!blog) {
    return {
      title: "Blog Not Found | Allisted",
    };
  }

  const title = `${blog.blogTitle} | Allisted`;
  const description = blog.excerpt || blog.blogTitle;
  const ogImage = blog.featuredImage?.url || "/blog-placeholder.png";
  const url = `${ENV.APP_URL}/blog/${params.categoryName}/${params.slug}`;

  return {
    title,
    description,
    authors: [{ name: blog.author?.authorName || "Recuip" }],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    other: {
      "twitter:url": url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Recuip",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.blogTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const data = await getBlogBySlug(params.slug, params.categoryName);

  if (!data?.blog) {
    return <p style={{ padding: 40 }}>Blog not found</p>;
  }

  const { blog, relatedArticles, latestArticle } = data;

  return (
    <BlogDetailsClient
      blog={blog}
      relatedArticles={relatedArticles}
      latestArticles={latestArticle}
    />
  );
}