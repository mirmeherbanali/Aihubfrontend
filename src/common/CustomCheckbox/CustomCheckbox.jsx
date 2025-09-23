"use client";

import { useState } from "react";

const CustomCheckbox = ({
  checked = false,
  onChange,
  id,
  name,
  value,
  label,
  key,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) onChange(newValue, value); // Pass value for parent tracking
  };

  return (
    <div className="relative flex items-center w-5 h-5">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        className="absolute w-5 h-5 opacity-0 cursor-pointer"
        aria-label={label || "Checkbox"}
      />
      <div
        className={`w-3 h-3 lg:w-4 lg:h-4 rounded-[4.17px] border-[1.67px] border-[#009F7D] flex items-center justify-center transition-colors duration-200`}
      >
        {isChecked && (
          <div className="w-2 h-2 lg:w-3 lg:h-3 bg-[#009F7D] rounded-[3px]" />
        )}
      </div>
    </div>
  );
};

export default CustomCheckbox;
