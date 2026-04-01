const API = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories() {
  const res = await fetch(`${API}/api/category/getAllCategories`, {
    method: "POST",
    next: { revalidate: 3600 }, // 🔥 cache for 1 hour
  });

  const data = await res.json();
  return data?.result?.list || [];
}

export async function getTools() {
  const res = await fetch(`${API}/api/tool/getAllTools`, {
    method: "POST",
    next: { revalidate: 3600 }, // 🔥 cache for 1 hour
  });

  const data = await res.json();
  return (data?.result?.list || []).filter(
    (item: { status: string }) => item.status === "Approved"
  );
}


export async function getAllBlogs() {
  const res = await fetch(`${API}/api/blog/getAllBlogs`, {
    method: "POST",
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  return data?.result?.list || [];
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