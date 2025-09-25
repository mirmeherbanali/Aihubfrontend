import {
  FieldValues,
  UseFormRegister,
  FormState,
  SubmitHandler,
  Path,
} from "react-hook-form";

export type FieldType = "input" | "dropdown" | "image" | "button" | "password";

// Base props
interface BaseField {
  type: FieldType;
  label?: string;
  placeholder?: string;
  options?: string[];
  value?: string;
  onChange?: (val: string) => void;
  fetchOptions?: () => Promise<string[]>;
  style?: React.CSSProperties;         // for input / select styling
  wrapperStyle?: React.CSSProperties;  // for container div styling
  icon?: React.ReactNode; // <-- left-side icon
  row?: string | number;           // fields with same row appear together
  col?: number;                     // default column span (for desktop)
  breakpoints?: {                   // responsive column spans
    sm?: number;  // mobile
    md?: number;  // tablet
    lg?: number;  // desktop
  };
}

// Input-like fields (must have name)
export interface InputField<T extends FieldValues> extends BaseField {
  type: "input" | "password" | "dropdown" | "image";
  name: Path<T>;
}

// Button fields (no name)
export interface ButtonField extends BaseField {
  type: "button";
  name?: never; // 🚫 forbid name
}

// Union type
export type FormField<T extends FieldValues = FieldValues> =
  | InputField<T>
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

export interface AsyncDropdownProps<T extends FieldValues = FieldValues> {
  field: FormField<T>;
  value?: string;
  onChange?: (val: string) => void;
  error?: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

