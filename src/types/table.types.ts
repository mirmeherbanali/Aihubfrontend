export type TableColumn<T> = {
  key: keyof T ;
  label: string;
  render?: (row: T) => React.ReactNode;
  badge?: (row: T) => { label: string; type: "success" | "warning" | "error" | "info" };
};

export type TableAction<T> = {
  label: string;
  onClick: (row: T) => void;
  disabled?: (row: T) => boolean; 
};

export type FilterOption = {
  label: string;
  value: string;
};
