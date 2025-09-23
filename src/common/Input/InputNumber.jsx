import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";

const InputNumber = ({
  name,
  label,
  value = "",
  placeholder,
  required = false,
  readOnly = false,
  onChange,
  setInputNumberError,
  className = "",
  labelClassName = "",
  phoneCode = "+44",
}) => {
  const [errMsg, setErrMsg] = useState("");

  const getCountryFromPhoneCode = (code) => {
    const digits = code.replace("+", "");
    return getCountries().find((c) => getCountryCallingCode(c) === digits);
  };

  const handleBlur = () => {
    const phoneValue = String(value).trim();
    const country = getCountryFromPhoneCode(phoneCode);
    if (required && phoneValue === "") {
      setErrMsg("Phone number is required.");
      setInputNumberError((prev) => ({ ...prev, phNumber: true }));
    } else if (country) {
      const parsed = parsePhoneNumberFromString(phoneValue, country);
      if (!parsed || !parsed.isValid()) {
        setErrMsg("Invalid phone number for selected country.");
        setInputNumberError((prev) => ({ ...prev, phNumber: true }));
      } else {
        setErrMsg("");
        setInputNumberError((prev) => ({ ...prev, phNumber: false }));
      }
    } else {
      setErrMsg("Unsupported country code.");
      setInputNumberError((prev) => ({ ...prev, phNumber: true }));
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^[\d\s()+-]*$/.test(inputValue)) {
      onChange({ target: { name, value: inputValue } });
      if (errMsg) {
        setErrMsg("");
        setInputNumberError((prev) => ({ ...prev, phNumber: false }));
      }
    }
  };

  useEffect(() => {
    if (!errMsg) {
      setInputNumberError((prev) => ({ ...prev, phNumber: false }));
    }
  }, [errMsg, setInputNumberError]);

  const defaultInputClasses = `
    p-[10px_15px] bg-white rounded-[10px] outline-none w-full pb-2
    ${errMsg ? "border-red-500 border" : "border-[#F5F5F7] border"}
  `;

  return (
    <>
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
        type="tel"
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder || "Enter phone number"}
        required={required}
        readOnly={readOnly}
        className={twMerge(clsx(defaultInputClasses), className)}
      />
      {!readOnly && errMsg && (
        <small className="text-red-500 text-[14px]">{errMsg}</small>
      )}
    </>
  );
};

export default InputNumber;
