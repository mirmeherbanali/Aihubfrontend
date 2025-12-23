// components/ImagePicker.tsx
import styles from "../../../ui/style/BlogEditor.module.scss"

export default function ImagePicker({ value, onChange }: any) {
  return (
    <label className={styles.imageBox}>
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0])}
      />
      {value ? "Image Selected" : "+"}
    </label>
  );
}
