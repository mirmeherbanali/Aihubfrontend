export const BLOG_FORM = [
  /* ================= BASIC ================= */
  { type: "text", name: "title", label: "Blog Title", placeholder: "Add blog title" },

  { type: "editor", name: "content", label: "Blog Content" },

  { type: "text", name: "slug", label: "Custom URL Slug" },

  { type: "textarea", name: "metaDescription", label: "Meta Description" },

  /* ================= CATEGORY ROW ================= */
  {
    row: true,
    fields: [
      {
        type: "select",
        name: "category",
        label: "Select Category",
        options: ["Technology", "AI", "Business"],
      },
      {
        type: "text",
        name: "newCategory",
        label: "Create New Category",
      },
      {
        type: "action",
        label: "",
        action: "createCategory",
      },
    ],
  },

  /* ================= FEATURED MEDIA + DATES ================= */
  {
    row: true,
    fields: [
      { type: "image", name: "featuredImage", label: "Featured Image" },
      { type: "date", name: "publishedDate", label: "Published Date" },
      { type: "date", name: "modifiedDate", label: "Last Modified Date" },
    ],
  },

  /* ================= AUTHOR ROW ================= */
  
      {
        type: "select",
        name: "author",
        label: "Select Author",
        options: ["Admin", "Editor"],
      },
      {
        type: "text",
        name: "authorName",
        placeholder:"Enter Auther Name",
        label: "Create New Author",
      },

  /* ================= AUTHOR DETAILS ================= */
  { type: "textarea", name: "authorBio", label: "",placeholder:"Enter Auther Bio" },

  { type: "text", name: "authorSocial", label: "",placeholder:"Enter Author’s Social Profile Link"  },
  { type: "image", name: "authorImage", label: "Author Picture"},
  {
        type: "action",
        label: "",
        action: "createAuther",
      },
  /* ================= SEO ================= */
  { type: "textarea", name: "jsonLd", label: "Add JSON-LD Schema Codes" },

  {
    type: "radio",
    name: "robots",
    label: "Meta Robots Tag",
    options: [
      { label: "Index, Follow", value: "index,follow" },
      { label: "Noindex, Nofollow", value: "noindex,nofollow" },
    ],
  },
];
