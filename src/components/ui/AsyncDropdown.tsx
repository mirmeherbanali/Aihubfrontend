"use client";

import React, { FC, useEffect, useState } from "react";
import Select from "react-select";
import { AsyncDropdownProps } from "@/types/form.types";

interface SelectOption {
  label: string;
  value: string;
}

const AsyncDropdown: FC<AsyncDropdownProps> = ({
  field,
  value,
  onChange,
  error,
  wrapperStyle,
}) => {
  const [items, setItems] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const formatOptions = (data: unknown): SelectOption[] => {
    if (!Array.isArray(data)) return [];
    
    return data.map(item => {
      if (typeof item === 'string') {
        return { label: item, value: item };
      }
      if (typeof item === 'object' && item !== null && 'label' in item && 'value' in item) {
        return item as SelectOption;
      }
      return { label: String(item), value: String(item) };
    }).filter(Boolean);
  };

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      try {
        if (field.fetchOptions) {
          const res = await field.fetchOptions();
          setItems(formatOptions(res));
        } else if (field.options) {
          setItems(formatOptions(field.options));
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error loading dropdown options:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [field]);

  const getValue = (): SelectOption | SelectOption[] | null => {
    if (!value) return field.multiple ? [] : null;

    if (field.multiple && Array.isArray(value)) {
      return value
        .map(v => items.find(item => item.value === v))
        .filter((item): item is SelectOption => item !== undefined);
    }

    return items.find(item => item.value === value) || null;
  };

  const handleChange = (selected: any) => {
    if (field.multiple) {
      const selectedValues = Array.isArray(selected) 
        ? selected.map((s: SelectOption) => s.value)
        : [];
      onChange?.(selectedValues);
    } else {
      onChange?.(selected?.value || "");
    }
  };

  return (
    <div style={wrapperStyle}>
      {field.label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {field.label}
        </label>
      )}
      <Select
        isMulti={field.multiple}
        isLoading={loading}
        options={items}
        value={getValue()}
        onChange={handleChange}
        placeholder={field.placeholder || `Select ${field.label}`}
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "6px",
            minHeight: "38px",
            borderColor: error ? "#ef4444" : base.borderColor,
          }),
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AsyncDropdown;