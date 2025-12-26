export const BLOG_FORM = [
  /* ================= BASIC ================= */
  {
    type: "text",
    name: "blogTitle",
    label: "Blog Title",
    placeholder: "Add blog title",
  },

  {
    type: "editor",
    name: "content",
    label: "Blog Content",
  },

  {
    type: "text",
    name: "slug",
    label: "Custom URL Slug",
  },

  {
    type: "textarea",
    name: "metaDescription",
    label: "Meta Description",
  },

  {
    type: "select",
    name: "author",
    label: "Select Author",
    isMulti: true,
    options: [],
  },

  /* ================= CATEGORY ================= */
  {
    type: "select",
    name: "categories",
    label: "Select Category",
    isMulti: true,
    options: [],
  },

  /* ================= MEDIA & DATES ================= */
{
  type: "bothImageInput",
  label: "Featured Image",
  imageField: "featuredImage",
  inputs: [
    {
      name: "featuredImageAltText",
      label: "Alt Text",
      placeholder: "Enter image alt text",
    },
    {
      name: "featuredImageTitleText",
      label: "Title Text",
      placeholder: "Enter image title text",
    },
  ],
},


  /* ================= DATES ================= */
  {
    row: true,
    fields: [
      {
        type: "date",
        name: "publishedDate",
        label: "Published Date",
      },
      { type: "date", name: "lastModifiedDate", label: "Last Modified Date" },
    ],
  },

  {
    type: "textarea",
    name: "jsonLdSchema",
    label: "Add JSON-LD Schema Codes",
  },

  /* ================= SEO ================= */
  {
    type: "radio",
    name: "robots",
    label: "Meta Robots Tag",
    options: [
      { label: "Index, Follow", value: "index,follow" },
      { label: "Noindex, Nofollow", value: "noindex,nofollow" },
    ],
  },

  /* ================= ACTIONS ================= */
  {
    row: true,
    fields: [
      {
        type: "action",
        action: "draft",       // 👈 IMPORTANT
        label: "Save Draft",
        variant: "secondary",
      },
      {
        type: "action",
        action: "publish",     // 👈 IMPORTANT
        label: "Publish",
        variant: "primary",
      },
    ],
  },
];


export const CATEGORY_FORM = [
  {
    type: "text",
    name: "categoryName",
    label: "Category Name",
    placeholder: "Enter category name",
  },
  {
     type: "action",
        label: "",
        action: "Submit",
  },
];

export const AUTHOR_FORM = [
  {
    type: "text",
    name: "authorName",
    label: "Author Name",
    placeholder: "Enter author name",
  },
  {
    type: "textarea",
    name: "authorBio",
    label: "Bio",
    placeholder: "Enter author bio",
  },
  {
    type: "text",
    name: "socialLinks",
    label: "Social Profile Link",
    placeholder: "Enter social link",
    // isArray: true, // 👈 important for future scalability
  },
  {
    type: "image",
    name: "authorImage",
    label: "Author Picture",
  },
  {
    type: "action",
    label: "",
    action: "Submit",
  },
];

