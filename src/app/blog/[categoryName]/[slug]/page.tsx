import { Metadata } from "next";
import { getAllBlogs } from "@/features/serverApi/serverApi";
import BlogDetailsClient from "./BlogDetailsClient";

type Props = {
  params: {
    categoryName: string;
    slug: string;
  };
};

const normalize = (str?: string) =>
  str?.trim().toLowerCase().replace(/\s+/g, "-") || "";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const data = await getAllBlogs();

  const blog = data
    ?.filter((b: any) => b.status === "Published")
    ?.find(
      (b: any) =>
        normalize(b.slug) === normalize(params.slug)
    );

  if (!blog) {
    return {
      title: "Blog Not Found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${params.categoryName}/${params.slug}`;
  const image =
    blog.featuredImage?.url ||
    `${SITE_URL}/og-image.png`;

  return {
    metadataBase: new URL(SITE_URL), // ✅ IMPORTANT
    title: blog.blogTitle,
    description:
      blog.metaDescription || blog.blogTitle,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: blog.blogTitle,
      description:
        blog.metaDescription || blog.blogTitle,
      images: [{ url: image }],
      siteName: "Recuip",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.blogTitle,
      description:
        blog.metaDescription || blog.blogTitle,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

/* ===========================
   PAGE (BODY ONLY)
=========================== */
export default function Page({ params }: Props) {
  return <BlogDetailsClient params={params} />;
}