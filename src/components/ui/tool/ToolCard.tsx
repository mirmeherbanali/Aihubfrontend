"use client";

import React from "react";
import { Card, Typography } from "antd";
import styles from "@/components/ui/style/Tool.module.scss";
import { ToolCardProps } from "@/types/tool.types";

const { Title } = Typography;

export default function ToolCard({
  title,
  logo,
  value,
  onClick,
  style,
  className,
  disabled = false,
}: ToolCardProps) {
  return (
    <Card
      hoverable={!disabled} // disable hover if disabled
      onClick={disabled ? undefined : onClick} // disable click if disabled
      className={`${styles.toolCard} ${className || ""} ${disabled ? styles.disabledCard : ""}`}
      bodyStyle={{ padding: 16 }}
      style={style}
    >
      {logo && <img
          src={typeof logo === "string" ? logo : URL.createObjectURL(logo)}
          alt={title}
          className={styles.toolLogo}
        />}
      <Title level={5} className={styles.cardTitle}>
        {title}
      </Title>
      {value && <div className={styles.cardValue}>{value}</div>}
    </Card>
  );
}
