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

const SITE_URL = process.env.NEXT_PUBLIC_API_URL || "https://recuip.com";

/* ===========================
   METADATA (NORMAL)
=========================== */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blogs = await getAllBlogs();

  const blog = blogs.find(
    (b: any) =>
      b.status === "Published" &&
      normalize(b.slug) === normalize(params.slug)
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

    openGraph: {
      title: blog.blogTitle,
      description: blog.metaDescription || blog.blogTitle,
      url: canonicalUrl,
      siteName: "Recuip",
      images: [
        {
          url: blog.featuredImage?.url,
          width: 1200,
          height: 630,
          alt: blog.blogTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.blogTitle,
      description: blog.metaDescription || blog.blogTitle,
      images: [blog.featuredImage?.url],
    },

    robots: { index: true, follow: true },
  };
}

/* ===========================
   PAGE BODY
=========================== */
export default async function Page({ params }: Props) {
  const blogs = await getAllBlogs();

  const blog = blogs.find(
    (b: any) =>
      b.status === "Published" &&
      normalize(b.slug) === normalize(params.slug)
  );

  if (!blog) {
    return <p style={{ padding: "40px" }}>Blog not found</p>;
  }

  const cleanJson = blog.jsonLdSchema
    ?.replace('<script type="application/ld+json">', "")
    ?.replace("</script>", "")
    ?.trim();

 
  const blogUrl = `${SITE_URL}/blog/${params.categoryName}/${params.slug}`;

  const dynamicSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    headline: blog.blogTitle,
    description: blog.metaDescription || blog.blogTitle,
    image: blog.featuredImage?.url,
    author: {
      "@type": "Person",
      name: blog.author?.authorName || "Recuip Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Recuip",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt).toISOString(),
  };

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


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dynamicSchema),
        }}
      />

      <BlogDetails
        blog={blog}
        allBlogs={blogs}
        categoryName={params.categoryName}
      />
    </>
  );
}
