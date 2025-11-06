"use client";

import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import styles from "./style/Input.module.scss";
import { InputProps } from "@/types/ant.types";

const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  control,
  style,
  wrapperStyle,
  icon,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles["input-wrapper"]} style={wrapperStyle}>
      {label && <label className={styles["input-label"]}>{label}</label>}

      <Controller
        name={name}
        control={control as Control<any>}
        render={({ field, fieldState }) => (
          <div className={styles["input-container"]}>
            {icon && <span className={styles["input-icon"]}>{icon}</span>}

            <input
              {...field}
              type={type === "password" && showPassword ? "text" : type}
              placeholder={placeholder}
              className={`${styles["input"]} ${
                fieldState.error ? styles["input-error"] : ""
              }`}
              style={style}
              disabled={disabled}
            />

            {type === "password" && (
              <span
                className={styles["password-toggle"]}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            )}
          </div>
        )}
      />

      {/* Error message */}
      <Controller
        name={name}
        control={control as Control<any>}
        render={({ fieldState }) =>
          fieldState.error ? (
            <p className={styles["error"]}>{fieldState.error.message}</p>
          ) : (
            <></>
          )
        }
      />
    </div>
  );
};

export default Input;
