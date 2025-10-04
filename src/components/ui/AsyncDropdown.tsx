"use client";

import React, { FC, useEffect, useState } from "react";
import Select from "react-select";
import { AsyncDropdownProps } from "@/types/form.types";

const AsyncDropdown: FC<AsyncDropdownProps> = ({ field, value, onChange, error }) => {
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (field.fetchOptions) {
      setLoading(true);
      field.fetchOptions()
        .then((res) =>
          setItems(res.map((opt) => ({ label: opt, value: opt })))
        )
        .finally(() => setLoading(false));
    } else if (field.options) {
      setItems(field.options.map((opt) => ({ label: opt, value: opt })));
    }
  }, [field]);

  // convert react-hook-form value into react-select compatible
  const getValue = () => {
    if (!value) return field.multiple ? [] : null;
    if (field.multiple) {
      return (value as string[]).map((v) => ({ label: v, value: v }));
    }
    return { label: value as string, value: value as string };
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
        placeholder={`Select ${field.label}`}
        classNamePrefix="react-select"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AsyncDropdown;
