"use client";

import React, { useState, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiUploadCloud } from "react-icons/fi";
import Image from "next/image";
import DropdownComponent from "../Evidence/DropdownComponent";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 2;

const InputReplyEvidenceUpload = ({
    name = "evidence",
    label = "Evidence",
    onChange,
    handleSubmitReply,
    onTextChange,
    required = false,
    className = "",
    labelClassName = "",
    containerClassName = "",
    initialFiles = [],
    commentReplay,
    ...props
}) => {
    const fileInputRef = useRef(null);
    const [fileData, setFileData] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        setText(commentReplay || "");
    }, [commentReplay]);

    useEffect(() => {
        if (initialFiles?.length) {
            setFileData(prevFileData =>
                initialFiles.map(f => {
                    if (f instanceof File) {
                        const existing = prevFileData?.find(fd => fd.file === f && fd.url?.startsWith("blob:"));
                        return existing || {
                            id: Date.now().toString() + Math.random().toString(),
                            file: f,
                            url: URL.createObjectURL(f),
                            privacy: "public",
                        };
                    }
                    if (f && typeof f === "object" && f.url) {
                        return {
                            id: f.id || (Date.now().toString() + Math.random().toString()),
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
                }).filter(Boolean)
            );
        } else {
            setFileData([]);
        }
    }, [initialFiles?.length]);

    useEffect(() => {
        return () => {
            fileData.forEach(item => {
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
                files: updatedData.map(d => d.file),
                data: updatedData,
            },
        });
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newFileData = [];
        selectedFiles.forEach((file) => {
            if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024 && file.type.startsWith("image/")) {
                const blobUrl = URL.createObjectURL(file);
                newFileData.push({
                    id: Date.now().toString() + Math.random().toString(),
                    file,
                    url: blobUrl,
                    privacy: "Public"
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

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        onTextChange?.({
            target: {
                name: "comment",
                value: newText,
            },
        });
    };

    return (
        <form className="flex flex-col items-center w-full py-2">
            <div className="flex flex-col w-full bg-gray-100 rounded-2xl p-2">
                {fileData.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2 w-full h-30">
                        {fileData.map((item, index) => (
                            <div key={item.id} className="relative w-24 h-19">
                                {item.url ? (
                                    <Image
                                        src={item.url}
                                        alt="Uploaded preview"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
                                        <span className="text-xs text-gray-500">No preview</span>
                                    </div>
                                )}
                                <div className="absolute -bottom-10 left-0 bg-white rounded-md p-1">
                                    <DropdownComponent
                                        value={item.privacy}
                                        onChange={(value) => handlePrivacyChange(index, value)}
                                        className="z-10"
                                    />
                                </div>
                                <button
                                    onClick={() => handleRemoveFile(index)}
                                    className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                >
                                    <RxCross2 size={10} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        value={text}
                        name="comment"
                        onChange={handleTextChange}
                        placeholder="Reply"
                        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 min-h-8"
                    />
                    {fileData.length < MAX_FILES && (
                        <label
                            htmlFor={name}
                            className={`cursor-pointer flex items-center justify-center w-8 h-8 border border-dashed border-[#009f7d] rounded-full mr-2 ${className}`}
                        >
                            <FiUploadCloud className="text_secondary" size={18} />
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
                    <button
                        onClick={handleSubmitReply}
                        className="bg_secondary text-white rounded-full px-4 py-1 text-sm hover:bg-teal-600 h-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Post reply
                    </button>
                </div>
            </div>
        </form>
    );
};

export default InputReplyEvidenceUpload;