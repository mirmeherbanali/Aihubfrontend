import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { Input as AntInput } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
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
  icon
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles["input-wrapper"]} style={wrapperStyle}>
      {label && <label className={styles["input-label"]}>{label}</label>}
      <Controller
        name={name}
        control={control as Control<any>}
        render={({ field, fieldState }) => (
          <>
            <AntInput
              {...field}
              type={type === "password" && showPassword ? "text" : type}
              placeholder={placeholder}
              status={fieldState.error ? "error" : undefined}
              className={styles["input"]}
              style={style}
              prefix={icon}
              suffix={
                type === "password" && (
                  <span
                    className={styles["password-toggle"]}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeTwoTone twoToneColor="#000000" /> // black color
                    ) : (
                      <EyeInvisibleOutlined style={{ color: "#000000" }} /> // black color
                    )}
                  </span>
                )
              }
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

export default Input;
