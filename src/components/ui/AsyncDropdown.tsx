"use client";

import React, { FC, useEffect, useState } from "react";
import Select from "react-select";
import { AsyncDropdownProps } from "@/types/form.types";

const AsyncDropdown: FC<AsyncDropdownProps> = ({
  field,
  value,
  onChange,
  error,
  wrapperStyle,
}) => {
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      try {
        if (field.fetchOptions) {
          const res = await field.fetchOptions();
          setItems(res);
        } else if (field.options) {
          setItems(
            field.options.map((opt) =>
              typeof opt === "string" ? { label: opt, value: opt } : opt
            )
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [field]);

  // ✅ Convert value properly for React Select
  const getValue = () => {
    if (!value) return field.multiple ? [] : null;

    if (field.multiple && Array.isArray(value)) {
      return value
        .map((v) => items.find((i) => i.value === v))
        .filter(Boolean);
    }

    return items.find((i) => i.value === value) || null;
  };

  // ✅ Handle change (for both single & multiple)
  const handleChange = (selected: any) => {
    if (field.multiple) {
      onChange?.(selected ? selected.map((s: any) => s.value) : []);
    } else {
      onChange?.(selected ? selected.value : "");
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
          }),
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AsyncDropdown;
