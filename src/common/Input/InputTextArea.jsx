import React, { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const InputTextArea = ({
  id,
  name,
  label,
  value = "",
  placeholder,
  required = false,
  readOnly = false,
  onChange,
  setError,
  fieldName = "This field",
  className = "",
  labelClassName = "",
  rows = 5,
}) => {
  const [error, setLocalError] = useState("");

  const handleBlur = () => {
    const trimmedValue = String(value)?.trim();
    if (required && trimmedValue.length === 0) {
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

  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange({ target: { name, value: inputValue } });
    if (error) {
      setLocalError("");
      if (setError) {
        setError((prev) => ({ ...prev, [name]: false }));
      }
    }
  };

  const defaultInputClasses = `
    p-3 bg-white rounded-[10px] outline-none w-full mb-2
    border border-gray-300 focus:border-primary
    min-h-[100px] 
    ${error ? "border-red-500 border" : "border-[#F5F5F7] border"}
  `;

  return (
    <>
      <label
        htmlFor={id}
        className={twMerge(
          "block text-[14px] lg:text-[17px] font-semibold mb-1",
          labelClassName
        )}
      >
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        rows={rows}
        className={twMerge(clsx(defaultInputClasses), className)}
      />
      {!readOnly && error && (
        <small className="text-red-500 text-[14px]">{error}</small>
      )}
    </>
  );
};

export default InputTextArea;
