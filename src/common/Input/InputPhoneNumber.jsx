"use client";
import React, { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";

const InputPhoneNumber = ({
  codeValue = "",
  numberValue = "",
  codePlaceholder = "Code",
  numberPlaceholder = "Enter Mobile Number",
  required = true,
  readOnly = false,
  handleChangePhoneCode,
  handleChangePhone,
  setError,
  className = "",
  labelClassName = "",
}) => {
  const [phoneCodeError, setPhoneCodeError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const getCountryFromCode = (code) => {
    const digits = code.replace("+", "");
    return getCountries().find((c) => getCountryCallingCode(c) === digits);
  };

  const validatePhoneNumber = () => {
    const code = codeValue.trim();
    const number = numberValue.trim();
    if (required && !code) {
      setPhoneCodeError("Country code is required.");
      setError?.((prev) => ({ ...prev, phoneCode: true }));
    } else {
      setPhoneCodeError("");
      setError?.((prev) => ({ ...prev, phoneCode: false }));
    }
    if (required && !number) {
      setPhoneError("Mobile number is required.");
      setError?.((prev) => ({ ...prev, phone: true }));
      return;
    }
    const country = getCountryFromCode(code);
    if (!country) {
      setPhoneCodeError("Unsupported country code.");
      setError?.((prev) => ({ ...prev, phoneCode: true }));
      return;
    }
    const parsed = parsePhoneNumberFromString(number, country);
    if (!parsed || !parsed.isValid()) {
      setPhoneError("Invalid phone number for selected country.");
      setError?.((prev) => ({ ...prev, phone: true }));
    } else {
      setPhoneError("");
      setError?.((prev) => ({ ...prev, phone: false }));
    }
  };

  const handleBlur = () => {
    validatePhoneNumber();
  };

  const handlePhoneCodeChange = (e) => {
    const { value } = e.target;
    if (/^[\d\s()+-]*$/.test(value)) {
      handleChangePhoneCode?.(e);
      if (phoneCodeError) {
        setPhoneCodeError("");
        setError?.((prev) => ({ ...prev, phoneCode: false }));
      }
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    if (/^[\d\s()+-]*$/.test(value)) {
      handleChangePhone?.(e);
      if (phoneError) {
        setPhoneError("");
        setError?.((prev) => ({ ...prev, phone: false }));
      }
    }
  };

  const defaultInputClasses = `
    p-[10px_15px] bg-white rounded-[10px] outline-none w-full ${
      phoneCodeError ? "border-red-500 border" : "border-[#F5F5F7] border"
    }
    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
  `;

  const codeInputClasses = `
    p-[10px_5px] xl:p-[10px_10px] bg-white rounded-[10px] outline-none w-full ${
      phoneError ? "border-red-500 border" : "border-[#F5F5F7] border"
    }
    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
  `;

  return (
    <>
      <label
        htmlFor="phoneCode"
        className={twMerge(
          "block text-[15px] font-semibold pb-1",
          labelClassName
        )}
      >
        Mobile Number{" "}
        {required && <span className="text-red-500 font-bold">*</span>}
      </label>

      <div className="flex space-x-1 md:space-x-3">
        <div className="w-1/3 md:w-1/6">
          <input
            type="text"
            id="phoneCode"
            name="phoneCode"
            value={codeValue}
            onChange={handlePhoneCodeChange}
            onBlur={handleBlur}
            placeholder={codePlaceholder}
            required={required}
            readOnly={readOnly}
            className={twMerge(clsx(codeInputClasses), className)}
          />
          {!readOnly && phoneCodeError && (
            <small className="text-red-500 text-[13px] mt-1">
              {phoneCodeError}
            </small>
          )}
        </div>
        <div className="w-full">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={numberValue}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            placeholder={numberPlaceholder}
            required={required}
            readOnly={readOnly}
            className={twMerge(clsx(defaultInputClasses), className)}
          />
          {!readOnly && phoneError && (
            <small className="text-red-500 text-[13px] mt-1">
              {phoneError}
            </small>
          )}
        </div>
      </div>
    </>
  );
};

export default InputPhoneNumber;
