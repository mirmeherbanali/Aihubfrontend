import {
  FieldValues,
  UseFormRegister,
  FormState,
  SubmitHandler,
  Path,
} from "react-hook-form";

export type FieldType =
  | "input"
  | "dropdown"
  | "image"
  | "button"
  | "password"
  | "textarea"; // <-- added


// Base props
interface BaseField {
  type: FieldType;
  label?: string;
  placeholder?: string;
  options?: string[];
  value?: string | string[];   // allow array for multi-select
  conditional?: {
    field: string;
    value: string;
  };
  onChange?: (val: string | string[]) => void;
  fetchOptions?: () => Promise<string[]>;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  icon?: React.ReactNode;
  row?: string | number;
  col?: number;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

// Input-like fields (must have name)
export interface InputField<T extends FieldValues> extends BaseField {
  type: "input" | "password" | "image"| "textarea";
  name: Path<T>;
}

// Dropdown field (separate so it can allow multiple)
export interface DropdownField<T extends FieldValues> extends BaseField {
  type: "dropdown";
  name: Path<T>;
  multiple?: boolean;
  value?: string | string[];
  onChange?: (val: string | string[]) => void;
}

// Button fields (no name)
export interface ButtonField extends BaseField {
  type: "button";
  name?: never;
}

// Union type
export type FormField<T extends FieldValues = FieldValues> =
  | InputField<T>
  | DropdownField<T>
  | ButtonField;

// Dropzone props interface
export interface DropzoneProps {
  onDrop: (files: FileList | null) => void;
  error?: string;
}

// Props for DynamicForm
export interface DynamicFormProps<T extends FieldValues> {
  fields: FormField<T>[];
  register: UseFormRegister<T>;
  handleSubmit: (
    cb: SubmitHandler<T>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  formState: FormState<T>;
  onSubmit: SubmitHandler<T>;
  buttonText?: string;
  isLoading?: boolean;
}

// Async dropdown props
export interface AsyncDropdownProps<T extends FieldValues = FieldValues> {
  field: DropdownField<T>;   // only dropdowns allowed
  value?: string | string[];
  onChange?: (val: string | string[]) => void;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  result: {
    message: string;
    list?: any[];
  };
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}
