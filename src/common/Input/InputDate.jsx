"use client";
import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({
  id,
  name,
  label,
  value = "",
  placeholder = "",
  required = false,
  readOnly = false,
  onChange,
  setInputTextError,
  fieldName = "Date",
  className = "",
  labelClassName = "",
  minDate = "",
  maxDate = "",
  autoComplete,
}) => {
  const [errMsg, setErrMsg] = useState("");
  const dateValue = value ? new Date(value) : null;

  const validateDate = (date) => {
    if (!date) return "";
    const selectedDate = new Date(date);
    if (minDate && selectedDate < new Date(minDate)) {
      return `Date must be after ${new Date(minDate).toLocaleDateString()}`;
    }
    if (maxDate && selectedDate > new Date(maxDate)) {
      return `Date must be before ${new Date(maxDate).toLocaleDateString()}`;
    }
    return "";
  };

  const handleBlur = () => {
    if (required && !dateValue) {
      const requiredMessage = `${fieldName} is required.`;
      setErrMsg(requiredMessage);
      if (setInputTextError) {
        setInputTextError((prev) => ({ ...prev, [name]: true }));
      }
    } else {
      const dateError = validateDate(dateValue);
      setErrMsg(dateError);
      if (setInputTextError) {
        setInputTextError((prev) => ({ ...prev, [name]: !!dateError }));
      }
    }
  };

  const handleChange = (date) => {
    const dateString = date ? date.toISOString().split("T")[0] : "";
    onChange({ target: { name, value: dateString } });
    if (errMsg) {
      setErrMsg("");
      if (setInputTextError) {
        setInputTextError((prev) => ({ ...prev, [name]: false }));
      }
    }
  };

  useEffect(() => {
    if (!errMsg && setInputTextError) {
      setInputTextError((prev) => ({ ...prev, [name]: false }));
    }
  }, [errMsg, setInputTextError, name]);

  const defaultInputClasses = `
    p-[10px_15px] bg-white rounded-[10px] outline-none w-full pb-2
    ${errMsg ? "border-red-500 border" : "border-[#F5F5F7] border"}
  `;

  return (
    <div>
      <label
        htmlFor={id}
        className={twMerge(
          "block text-[14px] lg:text-[17px] font-semibold mb-1",
          labelClassName
        )}
      >
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      <DatePicker
        id={id}
        name={name}
        selected={dateValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholderText={placeholder}
        required={required}
        readOnly={readOnly}
        minDate={minDate ? new Date(minDate) : null}
        maxDate={maxDate ? new Date(maxDate) : null}
        className={twMerge(clsx(defaultInputClasses), className)}
        dateFormat="MM/dd/yyyy"
        wrapperClassName="w-full block"
        autoComplete={autoComplete}
      />
      {errMsg && !readOnly && (
        <small className="text-red-500 text-[14px]">{errMsg}</small>
      )}
    </div>
  );
};

export default InputDate;
