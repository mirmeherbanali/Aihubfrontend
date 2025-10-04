"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import { Input as AntInput } from "antd";
import styles from "./style/Input.module.scss";
import { InputProps } from "@/types/ant.types";

const { TextArea } = AntInput;

const TextAreaInput: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  control,
  style,
  wrapperStyle,
}) => {
  return (
    <div className={styles["input-wrapper"]} style={wrapperStyle}>
      {label && <label className={styles["input-label"]}>{label}</label>}
      <Controller
        name={name}
        control={control as Control<any>}
        render={({ field, fieldState }) => (
          <>
            <TextArea
              {...field}
              placeholder={placeholder}
              rows={4}
              status={fieldState.error ? "error" : undefined}
              className={styles["input"]}
              style={style}
            />
            {fieldState.error && (
              <p className={styles["error"]}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TextAreaInput;
