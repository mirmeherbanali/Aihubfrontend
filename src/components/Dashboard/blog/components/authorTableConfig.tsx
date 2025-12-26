// authorTableConfig.ts
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
    render: (row: any) =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleDateString()
        : "-",
  },
];

export const BLOG_COLUMNS = [
  {
    key: "featuredImage",
    label: "Image",
    render: (row: any) =>
      row.featuredImage ? (
        <img
          src={row.featuredImage}
          alt={row.title}
          width={50}
          height={40}
          style={{ borderRadius: 6, objectFit: "cover" }}
        />
      ) : (
        "-"
      ),
  },
  {
    key: "title",
    label: "Title",
    render: (row: any) =>
      row.title?.length > 50 ? row.title.slice(0, 50) + "..." : row.title || "-",
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
    key: "category",
    label: "Category",
    render: (row: any) => row.category?.name || row.category || "-",
  },
  {
    key: "publishedDate",
    label: "Published",
    render: (row: any) =>
      row.publishedDate
        ? new Date(row.publishedDate).toLocaleDateString()
        : "-",
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row: any) =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleDateString()
        : "-",
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
    render: (row: any) =>
      row.createdAt
        ? new Date(row.createdAt).toLocaleDateString()
        : "-",
  },
];

export const COMMON_ACTIONS = (
  onEdit: (row: any) => void,
  onDelete: (row: any) => void
) => [
  {
    label: "Edit",
    onClick: (row: any) => onEdit(row),
  },
  {
    label: "Delete",
    onClick: (row: any) => onDelete(row),
  },
];



