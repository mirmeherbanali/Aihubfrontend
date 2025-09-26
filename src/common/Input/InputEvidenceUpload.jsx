"use client";

import React, { useState, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiUploadCloud } from "react-icons/fi";
import Image from "next/image";
import DropdownComponent from "../Evidence/DropdownComponent";
import EvidenceRule from "../Evidence/EvidenceRule";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 2;

const InputEvidenceUpload = ({
  name = "evidence",
  label = "Evidence",
  onChange,
  required = false,
  className = "",
  labelClassName = "",
  containerClassName = "",
  initialFiles = [],
  ...props
}) => {
  const fileInputRef = useRef(null);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    if (initialFiles?.length) {
      setFileData((prevFileData) =>
        initialFiles
          .map((f) => {
            if (f instanceof File) {
              const existing = prevFileData?.find(
                (fd) => fd.file === f && fd.url?.startsWith("blob:")
              );
              return (
                existing || {
                  id: Date.now().toString() + Math.random().toString(),
                  file: f,
                  url: URL.createObjectURL(f),
                  privacy: "public",
                }
              );
            }
            if (f && typeof f === "object" && f.url) {
              return {
                id: f.id || Date.now().toString() + Math.random().toString(),
                file: f.file || null,
                url: f.url,
                privacy: f.privacy || "public",
              };
            }
            if (typeof f === "string") {
              return {
                id: Date.now().toString() + Math.random().toString(),
                file: null,
                url: f,
                privacy: "public",
              };
            }
            return null;
          })
          .filter(Boolean)
      );
    } else {
      setFileData([]);
    }
  }, [initialFiles]);

  useEffect(() => {
    return () => {
      fileData.forEach((item) => {
        if (item.file && item.url?.startsWith("blob:")) {
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
        files: updatedData.map((d) => d.file),
        data: updatedData,
      },
    });
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFileData = [];
    selectedFiles.forEach((file) => {
      if (
        file.size <= MAX_FILE_SIZE_MB * 1024 * 1024 &&
        file.type.startsWith("image/")
      ) {
        const blobUrl = URL.createObjectURL(file);
        newFileData.push({
          id: Date.now().toString() + Math.random().toString(),
          file,
          url: blobUrl,
          privacy: "Public",
        });
      }
    });

    const updatedData = [...fileData, ...newFileData];
    setFileData(updatedData);
    triggerOnChange(updatedData);
  };

  const handleRemoveFile = (index) => {
    const removed = fileData[index];
    if (removed?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(removed.url);
    }
    const updated = fileData.filter((_, i) => i !== index);
    triggerOnChange(updated);
  };

  const handlePrivacyChange = (index, value) => {
    const updated = [...fileData];
    updated[index].privacy = value;
    triggerOnChange(updated);
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <label
          htmlFor={name}
          className={`block text-[14px] lg:text-[17px] font-semibold ${labelClassName}`}
        >
          {label}{" "}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
        <EvidenceRule />
      </div>
      <div
        className={`flex flex-col px-3 md:px-6 pt-6 pb-12 bg_background rounded-lg ${containerClassName}`}
      >
        <div className="py-3 lg:py-5 2xl:py-10 flex flex-col lg:flex-row items-center justify-center gap-x-5 gap-y-14">
          <div className="flex flex-wrap lg:flex-nowrap flex-row gap-y-12 gap-x-3">
            {fileData.map((item, index) => (
              <div key={item.id} className="relative w-[100px] h-[100px]">
                {item.url ? (
                  <Image
                    src={item.url}
                    alt="Uploaded preview"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                    <span className="text-xs text-gray-500">No preview</span>
                  </div>
                )}
                <DropdownComponent
                  value={item.privacy}
                  onChange={(value) => handlePrivacyChange(index, value)}
                />
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <RxCross2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {fileData.length < MAX_FILES && (
            <label
              htmlFor={name}
              className={`cursor-pointer flex bg-[#E6F6F2] space-x-1 items-center rounded-3xl p-2 border-2 border-dotted border-green-400 ${className}`}
            >
              <FiUploadCloud className="text-green-700" size={24} />
              <span className="text-green-700 text-[14px] lg:text-[17px]">
                Upload your images here
              </span>
              <input
                type="file"
                id={name}
                name={name}
                accept="image/*"
                required={required}
                className="hidden"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                {...props}
              />
            </label>
          )}
        </div>
      </div>
    </>
  );
};

export default InputEvidenceUpload;
