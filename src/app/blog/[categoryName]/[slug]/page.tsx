import { Metadata } from "next";
import { getAllBlogs } from "@/features/serverApi/serverApi";
import BlogDetailsClient from "./BlogDetailsClient";

type Props = {
  params: { categoryName: string; slug: string };
};

const normalize = (str?: string) =>
  str?.trim().toLowerCase().replace(/\s+/g, "-") || "";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  
  const data = await getAllBlogs();

  const blogs = data?.filter((b: any) => b.status === "Published") || [];

  const blog = blogs.find(
    (b: any) => normalize(b.slug) === normalize(params.slug),
  );

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const url = `https://app.recuip.com/blog/${params.categoryName}/${params.slug}`;

  return {
    title: blog.blogTitle,
    description: blog.metaDescription || blog.blogTitle,
    authors: [{ name: blog.author?.authorName || "Recuip" }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: blog.blogTitle,
      description: blog.metaDescription || blog.blogTitle,
      images: [
        {
          url: blog.featuredImage?.url || "https://app.recuip.com/og-image.png",
        },
      ],
      siteName: "Recuip",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.blogTitle,
      description: blog.metaDescription || blog.blogTitle,
      images: [
        blog.featuredImage?.url || "https://app.recuip.com/og-image.png",
      ],
    },
    robots: { index: true, follow: true },
  };
}


export default function Page({ params }: Props) {
  return <BlogDetailsClient params={params} />;
}
