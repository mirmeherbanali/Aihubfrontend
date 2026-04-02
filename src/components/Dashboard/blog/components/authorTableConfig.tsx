// authorTableConfig.ts
import { slugify } from "@/utils/useEncodeUrl";
import moment from "moment";

export const AUTHOR_COLUMNS = [
  {
    key: "authorImage",
    label: "Image",
    render: (row: any) =>
      row.authorImage ? (
        <img
          src={row.authorImage}
          alt={row.authorName}
          width={40}
          height={40}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        "-"
      ),
  },
  {
    key: "authorName",
    label: "Author Name",
  },
  {
    key: "authorBio",
    label: "Bio",
    render: (row: any) =>
      row.authorBio?.length > 60
        ? row.authorBio.slice(0, 60) + "..."
        : row.authorBio || "-",
  },
  {
    key: "socialLinks",
    label: "Social Links",
    render: (row: any) =>
      Array.isArray(row.socialLinks) && row.socialLinks.length ? (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {row.socialLinks.map((link: string, i: number) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2563eb" }}
            >
              Link {i + 1}
            </a>
          ))}
        </div>
      ) : (
        "-"
      ),
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row: any) => (row.createdAt ? moment(row.createdAt).format("MMM DD, YYYY") : "-"),
  },
];

export const BLOG_COLUMNS = [
  {
    key: "featuredImage",
    label: "Image",
    render: (row: any) =>
      row?.featuredImage ? (
        <img
          src={row?.featuredImage?.url}
          alt={row.featuredImage?.titleText}
          width={50}
          height={40}
          style={{ borderRadius: 6, objectFit: "cover" }}
        />
      ) : (
        "-"
      ),
  },
  {
    key: "blogTitle",
    label: "Title",
    render: (row: any) =>
      row.blogTitle?.length > 50 ? row.blogTitle.slice(0, 50) + "..." : row.blogTitle || "-",
  },
  {
    key: "slug",
    label: "Slug",
  },
  {
    key: "author",
    label: "Author",
    render: (row: any) => row.author?.authorName || row.author || "-",
  },
  {
    key: "categories",
    label: "Category",
    render: (row: any) =>
      row.categories?.map((p: any) => p?.categoryName).join(", ") || "-",
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) => row.status || "-",
  },
  {
    key: "publishedDate",
    label: "Published",
    render: (row: any) =>
      row.publishedDate ? moment(row.publishedDate).format("MMM DD, YYYY") : "-",
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row: any) => (row.createdAt ? moment(row.createdAt).format("MMM DD, YYYY") : "-"),
  },
];

export const CATEGORY_COLUMNS = [
  {
    key: "categoryName",
    label: "Category Name",
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row: any) => (row.createdAt ? moment(row.createdAt).format("MMM DD, YYYY") : "-"),
  },
];

export const COMMON_ACTIONS = (
  onEdit: (row: any) => void,
  onDelete: (row: any) => void,
  onViewCategory?: (categoryName?: string) => void // 👈 ADD THIS
) => [
  {
    label: "View",
    onClick: (row: any) => {
      if (!row?.slug || row?.status !== "Published") return;

      const firstCategory = row.categories?.[0];
      if (!firstCategory?.categoryName) return;

      // ✅ Safe optional call
      onViewCategory?.(firstCategory.categoryName);

      const frontendUrl = `/blog/${slugify(firstCategory.categoryName)}/${row.slug}`;
      window.open(frontendUrl, "_blank", "noopener,noreferrer");
    },
    disabled: (row: any) => row?.status !== "Published",
  },
  {
    label: "Edit",
    onClick: (row: any) => onEdit(row),
  },
  {
    label: "Delete",
    onClick: (row: any) => onDelete(row),
  },
];
