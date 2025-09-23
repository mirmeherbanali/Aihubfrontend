"use client";
import React from "react";
import Select from "react-select";
import styles from "./InputCustomCss/InputCategory.module.css";

const InputCategory = ({
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  placeholder = "",
  className = "",
  labelClassName = "",
  categoryError = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-[14px] lg:text-[17px] font-semibold mb-1 ${labelClassName}`}
      >
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      <div className={styles.inputCategory}>
        <Select
          inputId={name}
          name={name}
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          isSearchable
          className={`w-full ${className}`}
          classNamePrefix="react-select"
          components={{
            Group: ({ data, children }) => (
              <div>
                <div className="pl-2 mb-3 md:mb-4 text-[14px] lg:text-[16px] 2xl:text-[18px] font-semibold uppercase">
                  {data.label}
                </div>
                <div
                  className={`mb-5 font-medium ${styles.customOptionWrapper}`}
                >
                  {children}
                </div>
              </div>
            ),
          }}
        />
        {categoryError && (
          <small className="text-red-500 text-[14px]">
            Category is required
          </small>
        )}
      </div>
    </div>
  );
};

export default InputCategory;
