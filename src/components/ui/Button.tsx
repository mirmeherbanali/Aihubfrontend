"use client";

import React from "react";
import { Button as AntButton } from "antd";
import styles from "./style/Button.module.scss";
import { ButtonProps } from "@/types/ant.types";

const Button: React.FC<ButtonProps> = ({
  label,
  htmlType = "submit",
  loading = false,
  style,
  wrapperStyle
}) => {
  return (
    <div className={styles["button-wrapper"]} style={wrapperStyle}>
      <AntButton
        type="primary"
        htmlType={htmlType}
        loading={loading}
        style={style}
        className={styles["button"]}
      >
        {label}
      </AntButton>
    </div>
  );
};

export default Button;
