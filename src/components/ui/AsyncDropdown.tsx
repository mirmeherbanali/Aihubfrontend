'use client';

import React, { FC, useEffect, useState } from "react";
import { AsyncDropdownProps } from "@/types/form.types";


const AsyncDropdown: FC<AsyncDropdownProps> = ({ field, value, onChange, error }) => {
  const [items, setItems] = useState<string[]>(field.options || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (field.fetchOptions) {
      setLoading(true);
      field.fetchOptions()
        .then((res) => setItems(res))
        .finally(() => setLoading(false));
    }
  }, [field]);

  return (
    <div>
      <select
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full border p-2 rounded ${error ? "border-red-500" : ""}`}
      >
        <option value="">Select {field.label}</option>
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          items.map((opt) => <option key={opt} value={opt}>{opt}</option>)
        )}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default AsyncDropdown;
 