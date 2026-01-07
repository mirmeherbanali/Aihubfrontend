import { MetadataRoute } from "next";
import {
  getAllBlogs,
  getCategories,
  getTools,
} from "@/features/serverApi/serverApi";

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://app.recuip.com";

  const [blogs, categories, tools] = await Promise.all([
    getAllBlogs(),
    getCategories(),
    getTools(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/categories`, lastModified: new Date() },
    { url: `${baseUrl}/pricing`, lastModified: new Date() },
  ];

  const blogPages: MetadataRoute.Sitemap = blogs
    ?.filter((blog: any) => blog?.slug)
    .map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.createdAt || Date.now()),
    }));

  const categoryPages: MetadataRoute.Sitemap = categories
    ?.filter((cat: any) => cat?.slug)
    .map((cat: any) => ({
      url: `${baseUrl}/categories/${cat.slug}`,
      lastModified: new Date(cat.updatedAt || cat.createdAt || Date.now()),
    }));

  const toolPages: MetadataRoute.Sitemap = tools
    ?.filter((tool: any) => tool?.toolName)
    .map((tool: any) => {
      const slug = tool.slug || generateSlug(tool.toolName);

      return {
        url: `${baseUrl}/tool/${slug}`,
        lastModified: new Date(tool.updatedAt || tool.createdAt || Date.now()),
      };
    });

  return [
    ...staticPages,
    ...blogPages,
    ...categoryPages,
    ...toolPages,
  ];
}
