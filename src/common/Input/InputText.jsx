"use client";
import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const InputText = ({
  name,
  label,
  value = "",
  placeholder,
  required = false,
  readOnly = false,
  onChange,
  setInputTextError,
  fieldName = "This field",
  className = "",
  labelClassName = "",
}) => {
  const [errMsg, setErrMsg] = useState("");

  const handleBlur = () => {
    const trimmedValue = String(value)?.trim();
    if (required && trimmedValue?.length === 0) {
      const requiredMessage = `${fieldName} is required.`;
      setErrMsg(requiredMessage);
      if (setInputTextError) {
        setInputTextError((previousState) => ({
          ...previousState,
          text: true,
        }));
      }
    } else {
      setErrMsg("");
      if (setInputTextError) {
        setInputTextError((previousState) => ({
          ...previousState,
          text: false,
        }));
      }
    }
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange({ target: { name, value: inputValue } });
    if (errMsg) {
      setErrMsg("");
      if (setInputTextError) {
        setInputTextError((previousState) => ({
          ...previousState,
          text: false,
        }));
      }
    }
  };

  useEffect(() => {
    if (!errMsg && setInputTextError) {
      setInputTextError((previousState) => ({
        ...previousState,
        text: false,
      }));
    }
  }, [errMsg, setInputTextError]);

  const defaultInputClasses = `
    p-[10px_15px] bg-white rounded-[10px] outline-none w-full pb-2
    ${errMsg ? "border-red-500 border" : "border-[#F5F5F7] border"}
  `;

  return (
    <div>
      <label
        htmlFor={name}
        className={twMerge(
          "block text-[14px] lg:text-[17px] font-semibold mb-1",
          labelClassName
        )}
      >
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={twMerge(clsx(defaultInputClasses), className)}
      />
      {!readOnly && (
        <small className="text-red-500 text-[14px]">{errMsg}</small>
      )}
    </div>
  );
};

export default InputText;
