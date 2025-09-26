'use client';

import React, { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneProps } from "@/types/form.types";

const DropzoneComponent: FC<DropzoneProps> = ({ onDrop, error }) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles.length ? acceptedFiles as unknown as FileList : null);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024, // 5 MB
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-4 border-2 border-dashed rounded cursor-pointer text-center ${error ? "border-red-500" : "border-gray-300"}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Drag & drop an image here, or click to select</p>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DropzoneComponent;
