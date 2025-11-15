"use client";

import React, { FC, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneProps } from "@/types/form.types";
import styles from "./style/DynamicForm.module.scss";

const MultiImageDropzone: FC<
  DropzoneProps & { files: (File | string)[]; maxFiles?: number }
> = ({ files, onDrop, error, maxFiles = 5 }) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      onDrop(newFiles);
    },
    [files, onDrop, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: true,
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024, // 5MB limit
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onDrop(newFiles);
  };

  // ✅ Cleanup for local previews to prevent memory leaks
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file instanceof File) {
          URL.revokeObjectURL(URL.createObjectURL(file));
        }
      });
    };
  }, [files]);

  return (
    <div>
      {/* Upload Box */}
      <div {...getRootProps()} className={styles.uploadCard}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className={styles.uploadPlaceholder}>
            <span className={styles.plusIcon}>＋</span>
            <p>Upload</p>
          </div>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {/* Image Preview Grid */}
      <div className={styles.multiImageContainer}>
        {files?.length > 0 &&
          files.map((file, i) => {
            const isFileObject = file instanceof File;
            const imageSrc = isFileObject ? URL.createObjectURL(file) : file;

            return (
              <div key={i} className={styles.imagePreviewWrapper}>
                <img
                  src={imageSrc}
                  alt={`preview-${i}`}
                  className={styles.imagePreviewCard}
                />
                <button
                  type="button"
                  className={styles.removeImageButton}
                  onClick={() => removeFile(i)}
                >
                  ✖
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MultiImageDropzone;
