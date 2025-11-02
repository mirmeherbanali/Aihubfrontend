"use client";

import React, { FC, useEffect, useState } from "react";
import Select from "react-select";
import { AsyncDropdownProps } from "@/types/form.types";

const AsyncDropdown: FC<AsyncDropdownProps> = ({ field, value, onChange, error }) => {
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      try {
        if (field.fetchOptions) {
          // fetchOptions should return array of { label, value: _id }
          const res = await field.fetchOptions();
          setItems(res);
        } else if (field.options) {
          // static options
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

  // Convert RHF value to react-select compatible
  const getValue = () => {
    if (!value) return field.multiple ? [] : null;

    if (field.multiple) {
      return (value as string[]).map((v) => items.find((i) => i.value === v)).filter(Boolean);
    }
    return items.find((i) => i.value === value) || null;
  };

  const handleChange = (selected: any) => {
    if (field.multiple) {
      onChange?.(selected ? selected.map((s: any) => s.value) : []);
    } else {
      onChange?.(selected ? selected.value : "");
    }
  };

  return (
    <div className="w-full">
      <Select
        isMulti={field.multiple}
        isLoading={loading}
        options={items}
        value={getValue()}
        onChange={handleChange}
        placeholder={field.placeholder || `Select ${field.label}`}
        classNamePrefix="react-select"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AsyncDropdown;
