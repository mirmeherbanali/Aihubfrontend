"use client";
import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import Image from "next/image";

const MAX_FILE_SIZE_MB = 2;

const InputLogoUpload = ({
  id,
  name,
  label,
  required = false,
  readOnly = false,
  onChange,
  setError,
  fieldName = "This file",
  className = "",
  labelClassName = "",
  containerClassName = "",
  allowedFileTypes = ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
  initialFiles = [],
  ...props
}) => {
  const [error, setLocalError] = useState("");
  const [fileData, setFileData] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialFiles) {
      const newFileData = (
        Array.isArray(initialFiles) ? initialFiles : [initialFiles]
      )
        .map((f) => {
          if (f instanceof File) {
            return {
              id: Date.now().toString() + Math.random().toString(),
              file: f,
              url: URL.createObjectURL(f),
              privacy: "public",
            };
          }
          if (f && typeof f === "object" && f.url) {
            return {
              id: f.id || Date.now().toString() + Math.random().toString(),
              file: f.file || null,
              url: f.url,
              privacy: f.privacy || "public",
            };
          }
          return null;
        })
        .filter(Boolean)
        .slice(0, 1);
      if (JSON.stringify(newFileData) !== JSON.stringify(fileData)) {
        setFileData(newFileData);
      }
    } else if (fileData.length > 0) {
      setFileData([]);
    }
  }, [initialFiles]); 
  useEffect(() => {
    return () => {
      fileData.forEach((item) => {
        if (item.url?.startsWith("blob:")) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [fileData]);

  const triggerOnChange = (updatedData) => {
    setFileData(updatedData);
    onChange?.({
      target: {
        name,
        files: updatedData.map((d) => d.file).filter(Boolean),
        data: updatedData,
      },
    });
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setLocalError("");
      triggerOnChange([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      setLocalError(
        `Invalid file type. Allowed types: ${allowedFileTypes.join(", ")}.`
      );
      if (setError) {
        setError((prev) => ({ ...prev, [name]: true }));
      }
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setLocalError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
      if (setError) {
        setError((prev) => ({ ...prev, [name]: true }));
      }
      return;
    }

    const isImage = ["jpg", "jpeg", "png"].includes(fileExtension);
    const previewUrl = isImage ? URL.createObjectURL(file) : null;

    const newFileData = [
      {
        id: Date.now().toString() + Math.random().toString(),
        file,
        url: previewUrl,
        privacy: "public",
      },
    ];

    setLocalError("");
    if (setError) {
      setError((prev) => ({ ...prev, [name]: false }));
    }
    triggerOnChange(newFileData);
  };

  const handleRemove = () => {
    if (fileData[0]?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(fileData[0].url);
    }
    triggerOnChange([]);
    setLocalError("");
    if (setError) {
      setError((prev) => ({ ...prev, [name]: false }));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleBlur = () => {
    if (required && !fileData.length) {
      const errorMessage = `${fieldName} is required.`;
      setLocalError(errorMessage);
      if (setError) {
        setError((prev) => ({ ...prev, [name]: true }));
      }
    } else {
      setLocalError("");
      if (setError) {
        setError((prev) => ({ ...prev, [name]: false }));
      }
    }
  };

  const defaultContainerClasses =
    "flex flex-col items-center p-6 bg-white rounded-lg";
  const defaultUploadButtonClasses =
    "cursor-pointer flex bg-[#E6F6F2] space-x-1 items-center rounded-3xl px-5 md:px-8 py-2 border-2 border-dotted border-green-400";

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={twMerge(
            clsx(
              "block text-[14px] lg:text-[17px] font-semibold mb-2",
              labelClassName
            )
          )}
        >
          {label}{" "}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      <div
        className={twMerge(clsx(defaultContainerClasses, containerClassName))}
      >
        {fileData.length > 0 && fileData[0].url && (
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={fileData[0].url}
              alt="Uploaded preview"
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              aria-label="Remove image"
            >
              <IoClose size={14} className="cursor-pointer" />
            </button>
          </div>
        )}
        {fileData.length === 0 && (
          <label
            htmlFor={id}
            className={twMerge(clsx(defaultUploadButtonClasses, className))}
          >
            <FiUploadCloud className="text-green-700" size={24} />
            <span className="text-green-700 text-[14px] lg:text-[17px]">
              Upload
            </span>
            <input
              type="file"
              id={id}
              name={name}
              ref={fileInputRef}
              onChange={handleChange}
              onBlur={handleBlur}
              accept={allowedFileTypes.map((ext) => `.${ext}`).join(",")}
              required={required}
              readOnly={readOnly}
              className="hidden"
              {...props}
            />
          </label>
        )}
        {!readOnly && error && (
          <small className="text-red-500 text-[14px] mt-2">{error}</small>
        )}
      </div>
    </>
  );
};

export default InputLogoUpload;
