// "use client";

// import { useEffect, useState } from "react";
// import BlogDetails from "./BlogDetails";
// // import { getBlogById } from "@/features/serverApi/serverApi";
// import { useGetBlogByIdQuery } from "@/features/blog/blogApi";

// import { useBlogStore } from "@/store/useCategoryStore";

// type Props = {
//   params: {
//     categoryName: string;
//     slug: string;
//   };
// };

// export default function Page({ params }: Props) {
//   const blogId = useBlogStore((s: any) => s.blogId);
//     const setAuthorName = useBlogStore((s: any) => s.setAuthorName);
//     const setBlogId = useBlogStore((s: any) => s.setBlogId);
//     const finalId = blogId || params.slug;
//   // const{data,isLoading} = useGetBlogByIdQuery({id:blogId,categoryName:params?.categoryName})
//   const { data, isLoading } = useGetBlogByIdQuery(
//   {
//     id: finalId,
//     categoryName: params.categoryName,
//   },
//   {
//     skip: !finalId, // ✅ important
//   }
// );
// if (isLoading) {
//   return <p style={{ padding: 40 }}>Loading blog...</p>;
// }

//   if (!data?.result?.list?.blog) {
//     return <p style={{ padding: 40 }}>Blog not found</p>;
//   }
//   const { blog, relatedArticles, latestArticle } = data?.result?.list;

//   return (
//     <BlogDetails

//       blog={blog}
//       relatedArticles={relatedArticles}
//       latestArticles={latestArticle}
//       setAuthorName={setAuthorName}
//       setBlogId={setBlogId}
//     />
//   );
// }


// // "use client";

// // import { useBlogStore } from "@/store/useCategoryStore";
// // import { useGetBlogByIdQuery } from "@/features/blog/blogApi";
// // import BlogDetails from "./BlogDetails";
// // import { Metadata } from "next";
// // import { getAllBlogs } from "@/features/serverApi/serverApi";

// // /* ===========================
// //    SEO HELPERS
// // =========================== */
// // const normalize = (str?: string) =>
// //   str?.trim().toLowerCase().replace(/\s+/g, "-") || "";

// // const SITE_URL = process.env.NEXT_PUBLIC_API_URL || "https://recuip.com";

// // /* ===========================
// //    METADATA (SERVER SIDE)
// // =========================== */
// // export async function generateMetadata({ params }: any): Promise<Metadata> {
// //   try {
// //     const blogs = await getAllBlogs();

// //     const blog = blogs.find(
// //       (b: any) =>
// //         b.status === "Published" &&
// //         normalize(b.slug) === normalize(params.slug)
// //     );

// //     if (!blog) {
// //       return {
// //         title: "Blog Not Found",
// //         robots: { index: false, follow: false },
// //       };
// //     }

// //     const canonicalUrl = `${SITE_URL}/blog/${params.categoryName}/${params.slug}`;

// //     return {
// //       title: blog.blogTitle,
// //       description: blog.metaDescription || blog.blogTitle,
// //       alternates: { canonical: canonicalUrl },

// //       openGraph: {
// //         title: blog.blogTitle,
// //         description: blog.metaDescription || blog.blogTitle,
// //         url: canonicalUrl,
// //         siteName: "Recuip",
// //         images: [
// //           {
// //             url: blog.featuredImage?.url,
// //             width: 1200,
// //             height: 630,
// //             alt: blog.blogTitle,
// //           },
// //         ],
// //       },

// //       twitter: {
// //         card: "summary_large_image",
// //         title: blog.blogTitle,
// //         description: blog.metaDescription || blog.blogTitle,
// //         images: [blog.featuredImage?.url],
// //       },

// //       robots: { index: true, follow: true },
// //     };
// //   } catch (error) {
// //     return {
// //       title: "Blog",
// //       description: "Blog page",
// //     };
// //   }
// // }

// // /* ===========================
// //    PAGE COMPONENT (CLIENT)
// // =========================== */
// // type Props = {
// //   params: {
// //     categoryName: string;
// //     slug: string;
// //   };
// // };

// // export default function Page({ params }: Props) {
// //   const blogId = useBlogStore((s: any) => s.blogId);
// //   const setAuthorName = useBlogStore((s: any) => s.setAuthorName);
// //   const setBlogId = useBlogStore((s: any) => s.setBlogId);

// //   const finalId = blogId || params.slug;

// //   const { data, isLoading } = useGetBlogByIdQuery(
// //     {
// //       id: finalId,
// //       categoryName: params.categoryName,
// //     },
// //     {
// //       skip: !finalId,
// //     }
// //   );

// //   if (isLoading) {
// //     return <p style={{ padding: 40 }}>Loading blog...</p>;
// //   }

// //   if (!data?.result?.list?.blog) {
// //     return <p style={{ padding: 40 }}>Blog not found</p>;
// //   }

// //   const { blog, relatedArticles, latestArticle } = data.result.list;

// //   return (
// //     <BlogDetails
// //       blog={blog}
// //       relatedArticles={relatedArticles}
// //       latestArticles={latestArticle}
// //       setAuthorName={setAuthorName}
// //       setBlogId={setBlogId}
// //     />
// //   );
// // }