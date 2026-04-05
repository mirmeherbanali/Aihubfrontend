import { ENV } from "@/env";
const API = ENV.API_URL;

export async function getCategories() {
  try {
    const res = await fetch(`${API}/api/category/getAllCategories`, {
      method: "POST",
      next: { revalidate: 3600 }, // 🔥 cache for 1 hour
    });
    const data = await res.json();
    return data?.result?.list || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}

export async function getTools() {
  try {
    const res = await fetch(`${API}/api/tool/getAllTools`, {
      method: "POST",
      next: { revalidate: 3600 }, // 🔥 cache for 1 hour
    });
    const data = await res.json();
    return (data?.result?.list || []).filter(
      (item: { status: string }) => item.status === "Approved"
    );
  } catch (err) {
    console.error("Error fetching tools:", err);
    return [];
  }
}

export async function getAllBlogs() {
  try {
    const res = await fetch(`${API}/api/blog/getAllBlogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit: 100 }), // ✅ Get more blogs for SSR
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Fetch failed for blogs: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data?.result?.list || [];
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
}

export async function getFourBlogsUnique() {
  try {
    const res = await fetch(`${API}/api/blog/getAllBlogsUnique`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Fetch failed for unique blogs: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data?.result?.list || [];
  } catch (error) {
    console.error("Error in getFourBlogsUnique:", error);
    return [];
  }
}

export async function getBlogById({
  id,
  categoryName,
}: {
  id: string;
  categoryName: string;
}) {
  try {
    const res = await fetch(`${API}/api/blog/getBlogById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ MUST
      },
      body: JSON.stringify({
        id, // ✅ correct key
        categoryName,
      }),
    });

    if (!res.ok) throw new Error("Failed to fetch blog");

    const data = await res.json();

    console.log("API RESPONSE:", data); // 🔍 check this

    return data?.result?.list || null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function getBlogBySlug(slug: string, categoryName: string) {
  try {
    const res = await fetch(`${API}/api/blog/getBlogBySlug`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, categoryName }),
      next: { revalidate: 60 }, // cache for 1 minute
    });

    if (!res.ok) throw new Error("Failed to fetch blog by slug");

    const data = await res.json();
    return data?.result?.list || null;
  } catch (error) {
    console.error("Error in getBlogBySlug:", error);
    return null;
  }
}