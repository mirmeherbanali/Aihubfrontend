"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "../../../ui/style/BlogEditor.module.scss";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Props = {
  value?: string;
  onChange: (content: string) => void;
};

export default function RichEditor({ value = "", onChange }: Props) {
  return (
    <div className={styles.editorWrapper}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write your blog content here..."
      />
    </div>
  );
}

/* =========================
   IMAGE HANDLER (URL + LOCAL)
========================= */
const imageHandler = function (this: any) {
  const quill = this.quill;
  const range = quill.getSelection(true);

  // 1️⃣ Choose upload type
  const useUpload = confirm(
    "Click OK to upload image from your computer.\nClick Cancel to use image URL."
  );

  // =========================
  // 🟢 LOCAL FILE UPLOAD
  // =========================
  if (useUpload) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const altText = prompt("Enter alt text (required for SEO)") || "";
      const titleText = prompt("Enter title text (optional)") || "";

      // ⚠️ DEMO: convert to base64
      // 🔥 In production, upload to server/S3 and return URL
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;

        quill.insertEmbed(range.index, "image", imageUrl);

        setTimeout(() => {
          const imgs = quill.root.querySelectorAll("img");
          const img = imgs[imgs.length - 1];
          if (img) {
            img.setAttribute("alt", altText);
            img.setAttribute("title", titleText);
          }
        }, 0);
      };

      reader.readAsDataURL(file);
    };

    return;
  }

  // =========================
  // 🌐 IMAGE URL
  // =========================
  const imageUrl = prompt("Enter image URL");
  if (!imageUrl) return;

  const altText = prompt("Enter alt text (required for SEO)") || "";
  const titleText = prompt("Enter title text (optional)") || "";

  quill.insertEmbed(range.index, "image", imageUrl);

  setTimeout(() => {
    const imgs = quill.root.querySelectorAll("img");
    const img = imgs[imgs.length - 1];
    if (img) {
      img.setAttribute("alt", altText);
      img.setAttribute("title", titleText);
    }
  }, 0);
};

/* =========================
   TOOLBAR CONFIG
========================= */
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"], // 🖼️ image icon already present
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
};

/* =========================
   ALLOWED FORMATS
========================= */
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "blockquote",
  "code-block",
  "link",
  "image",
  "video",
];