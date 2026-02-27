import { Metadata } from "next";
import Script from "next/script";
import { getAllBlogs } from "@/features/serverApi/serverApi";
import BlogDetails from "./BlogDetails";

export const revalidate = 3600;

type Props = {
  params: {
    categoryName: string;
    slug: string;
  };
};

const normalize = (str?: string) =>
  str?.trim().toLowerCase().replace(/\s+/g, "-") || "";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/* ===========================
   METADATA (NORMAL)
=========================== */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blogs = await getAllBlogs();

  const blog = blogs.find(
    (b: any) =>
      b.status === "Published" && normalize(b.slug) === normalize(params.slug),
  );

  if (!blog) {
    return {
      title: "Blog Not Found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${params.categoryName}/${params.slug}`;

  return {
    title: blog.blogTitle,
    description: blog.metaDescription || blog.blogTitle,
    alternates: { canonical: canonicalUrl },
  };
}

/* ===========================
   PAGE BODY
=========================== */
export default async function Page({ params }: Props) {
  const blogs = await getAllBlogs();

  const blog = blogs.find(
    (b: any) =>
      b.status === "Published" && normalize(b.slug) === normalize(params.slug),
  );

  if (!blog) {
    return <p style={{ padding: "40px" }}>Blog not found</p>;
  }

  // Remove wrapper if DB stores full script
  const cleanJson = blog.jsonLdSchema
    ?.replace('<script type="application/ld+json">', "")
    ?.replace("</script>", "")
    ?.trim();

  return (
    <>
      {cleanJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: cleanJson,
          }}
        />
      )}

      <BlogDetails
        blog={blog}
        allBlogs={blogs}
        categoryName={params.categoryName}
      />
    </>
  );
}
