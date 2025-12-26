import { useState, useEffect } from "react";
import styles from "../../../ui/style/BlogEditor.module.scss";

type Props = {
  value: File | string | null; // File for new upload, string for existing URL
  onChange: (file: File | null) => void;
};

export default function ImagePicker({ value, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
  if (!value) {
    setPreview(null);
    return;
  }

  // ✅ Existing image URL (string)
  if (typeof value === "string") {
    setPreview(value);
    return;
  }

  // ✅ New upload
  if (value instanceof File) {
    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }

  // ✅ Fallback for edit-mode objects (important)
  if (typeof value === "object" && "url" in value) {
    setPreview((value as any).url);
  }
}, [value]);


  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening file selector
    onChange(null);
  };

  return (
    <label className={styles.imageBox}>
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {preview ? (
        <div className={styles.imagePreview}>
          <img src={preview} alt="Selected" />
          <button type="button" className={styles.removeBtn} onClick={handleRemove}>
            ✕
          </button>
        </div>
      ) : (
        <span className={styles.addImage}>+</span>
      )}
    </label>
  );
}
