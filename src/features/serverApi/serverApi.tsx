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
