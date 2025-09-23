import React, { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const InputEmail = ({
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
  autoComplete,
}) => {
  const [error, setLocalError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    const trimmedValue = String(value)?.trim();
    if (required && trimmedValue.length === 0) {
      const errorMessage = `${fieldName} is required.`;
      setLocalError(errorMessage);
      if (setError) {
        setError((prev) => ({ ...prev, [name]: true }));
      }
    } else if (trimmedValue.length > 0 && !validateEmail(trimmedValue)) {
      const errorMessage = `${fieldName} must be a valid email address.`;
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
    p-[10px_15px] bg-white rounded-[10px] outline-none w-full pb-2
    ${error ? "border-red-500 border" : "border-[#F5F5F7] border"}
  `;
  return (
    <>
      <label
        htmlFor={id}
        className={`block text-[14px] lg:text-[17px] font-semibold mb-1 ${labelClassName}`}
      >
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      <input
        type="email"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete={autoComplete}
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

export default InputEmail;
