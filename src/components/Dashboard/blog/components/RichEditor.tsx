"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "../../../ui/style/BlogEditor.module.scss";

// Quill must be dynamic in Next.js
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

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

/* =======================
   TOOLBAR CONFIG
======================= */
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

/* =======================
   ALLOWED FORMATS
======================= */
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
