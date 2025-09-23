import React, { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const isValidDomain = (domain) => {
  if (!domain) return false;
  const trimmed = domain.trim().toLowerCase();
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9](-?[a-zA-Z0-9])*\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(trimmed);
};

const InputDomain = ({
  id,
  name,
  label,
  value = "",
  placeholder = "e.g. example.com",
  required = true,
  readOnly = false,
  onChange,
  setError,
  fieldName = "Domain",
  className = "",
  labelClassName = "",
}) => {
  const [error, setLocalError] = useState("");

  const handleBlur = () => {
    const trimmedValue = String(value)?.trim();

    if (required && trimmedValue.length === 0) {
      const errorMessage = `${fieldName} is required.`;
      setLocalError(errorMessage);
      if (setError) setError((prev) => ({ ...prev, [name]: true }));
    } else if (!isValidDomain(trimmedValue)) {
      const errorMessage = "Please enter a valid domain (e.g., example.com)";
      setLocalError(errorMessage);
      if (setError) setError((prev) => ({ ...prev, [name]: true }));
    } else {
      setLocalError("");
      if (setError) setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange({ target: { name, value: inputValue } });

    if (error) {
      setLocalError("");
      if (setError) setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  const defaultInputClasses = `
    p-[10px_15px] bg-white rounded-[10px] outline-none w-full pb-2  ${
      error ? "border-red-500 border" : "border-[#F5F5F7] border"
    }
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
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={twMerge(clsx(defaultInputClasses), className)}
      />
      {!readOnly && error && (
        <small className="text-red-500 text-[14px]">{error}</small>
      )}
    </>
  );
};

export default InputDomain;
