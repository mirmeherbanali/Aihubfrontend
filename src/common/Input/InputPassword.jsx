import React, { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Using Feather icons

const InputPassword = ({
  id,
  name,
  label,
  value = "",
  placeholder = "",
  required = true,
  readOnly = false,
  onChange,
  setError,
  fieldName = "Password",
  className = "",
  labelClassName = "",
  showStrengthIndicator = false,
  minLength = 3,
}) => {
  const [error, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const validatePassword = (password) => {
    if (!password) return "";

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters`;
    }

    return "";
  };

  const calculateStrength = (password) => {
    if (!showStrengthIndicator) return;

    let strength = 0;
    if (password.length >= minLength) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    setPasswordStrength(
      strength < 2 ? "Weak" : strength < 4 ? "Medium" : "Strong"
    );
  };

  const handleBlur = () => {
    const trimmedValue = String(value)?.trim();

    if (required && trimmedValue.length === 0) {
      const errorMessage = `${fieldName} is required.`;
      setLocalError(errorMessage);
      if (setError) {
        setError((prev) => ({ ...prev, [name]: true }));
      }
    } else {
      const passwordError = validatePassword(trimmedValue);
      setLocalError(passwordError);
      if (setError) {
        setError((prev) => ({ ...prev, [name]: !!passwordError }));
      }
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange({ target: { name, value: inputValue } });
    calculateStrength(inputValue);

    if (error) {
      setLocalError("");
      if (setError) {
        setError((prev) => ({ ...prev, [name]: false }));
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const defaultInputClasses = `
    p-[10px_15px] bg-white rounded-[10px] outline-none w-full pb-2 pr-10
    ${error ? "border-red-500 border" : "border-[#F5F5F7] border"}
  `;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={twMerge(
          "block text-[14px] lg:text-[17px] font-semibold mb-1",
          labelClassName
        )}
      >
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          minLength={minLength}
          className={twMerge(clsx(defaultInputClasses), className)}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>

      {showStrengthIndicator && value && (
        <div className="text-xs mt-1">
          Strength:{" "}
          <span
            className={`font-medium ${
              passwordStrength === "Weak"
                ? "text-red-500"
                : passwordStrength === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {passwordStrength}
          </span>
        </div>
      )}

      {!readOnly && error && (
        <small className="text-red-500 text-[14px]">{error}</small>
      )}
    </div>
  );
};

export default InputPassword;
