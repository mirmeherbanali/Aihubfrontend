import React, { CSSProperties, ReactNode } from "react";
export interface ToolCardProps {
  title: string;
 logo?: string | File; // <-- allow both
  value?: ReactNode;            // dynamic content
  onClick?: () => void;
  style?: CSSProperties;        // allow custom style overrides
  className?: string;           // allow custom class overrides
   disabled?: boolean; // new prop
}