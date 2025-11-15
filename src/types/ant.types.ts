import {  Control } from "react-hook-form";

export interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "password";
  control: Control<any>;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  icon?: React.ReactNode; // ← accept icon here
  disabled?: boolean;
}

export interface ButtonProps {
  label: string;
  htmlType?: "submit" | "button";
  loading?: boolean;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
}
