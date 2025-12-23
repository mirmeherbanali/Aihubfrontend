// app/blog/create/page.tsx
"use client";

import { useState } from "react";
import { BLOG_FORM } from "@/lib/dashboard/blog/fields/formFields";
import FormRenderer from "./components/FormRenderer";
import styles from "./../../ui/style/BlogEditor.module.scss"
export default function CreateBlogPage() {
  const [formData, setFormData] = useState({});

  return (
    <div className={styles.container}>
      <FormRenderer
        config={BLOG_FORM}
        state={formData}
        setState={setFormData}
      />

      <div className={styles.actions}>
        <button>Save Draft</button>
        <button className={styles.primary}>Publish</button>
      </div>
    </div>
  );
}
