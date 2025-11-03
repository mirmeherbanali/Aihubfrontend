"use client";

import React, { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneProps } from "@/types/form.types";
import styles from "./style/DynamicForm.module.scss";

const MultiImageDropzone: FC<DropzoneProps & { files: File[]; maxFiles?: number }> = ({
  files,
  onDrop,
  error,
  maxFiles = 5
}) => {
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
    maxSize: 5 * 1024 * 1024, // 5 MB
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onDrop(newFiles);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`w-full p-4 border-2 border-dashed rounded cursor-pointer text-center ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop images here, or click to select (max {maxFiles})</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <div className={styles.multiImageContainer}>
        {files.map((file, i) => (
          <div key={i} className={styles.imagePreviewWrapper}>
            <img
              src={URL.createObjectURL(file)}
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
        ))}
      </div>
    </div>
  );
};

export default MultiImageDropzone;
