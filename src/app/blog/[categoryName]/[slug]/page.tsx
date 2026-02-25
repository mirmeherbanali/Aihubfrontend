import { Metadata } from "next";
import { getAllBlogs } from "@/features/serverApi/serverApi";
import BlogDetailsClient from "./BlogDetailsClient";

type Props = {
  params: { categoryName: string; slug: string };
};

const normalize = (str?: string) =>
  str?.trim().toLowerCase().replace(/\s+/g, "-") || "";

/* ================= SEO METADATA ================= */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const data = await getAllBlogs();

  const blog = data?.find(
    (b: any) =>
      b.status === "Published" &&
      normalize(b.slug) === normalize(params.slug)
  );

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const url = `https://app.recuip.com/blog/${params.categoryName}/${params.slug}`;

  return {
    title: blog.blogTitle,
    description: blog.metaDescription || blog.blogTitle,
    alternates: { canonical: url },

    openGraph: {
      type: "article",
      url,
      title: blog.blogTitle,
      description: blog.metaDescription || blog.blogTitle,
      images: [
        {
          url:
            blog.featuredImage?.url ||
            "https://app.recuip.com/og-image.png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.blogTitle,
      description: blog.metaDescription || blog.blogTitle,
      images: [
        blog.featuredImage?.url ||
          "https://app.recuip.com/og-image.png",
      ],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ================= PAGE ================= */
export default function Page({ params }: Props) {
  return <BlogDetailsClient params={params} />;
}