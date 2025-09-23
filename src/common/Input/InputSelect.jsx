import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InputSelect = ({
  label,
  name,
  value,
  options,
  required,
  onChange,
  error,
  setError,
  fieldName = "This field",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
    setLocalError("");
    setError?.((prev) => ({ ...prev, [name]: false }));
  };

  const handleBlur = () => {
    if (required && !value) {
      setLocalError(`${fieldName} is required.`);
      setError?.((prev) => ({ ...prev, [name]: true }));
    }
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Choose a support topic";

  return (
    <div onBlur={handleBlur} className="relative">
      <label className="block text-sm font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <button
        type="button"
        className={`w-full p-3 text-left rounded-md border bg_white ${error || localError ? "border-red-500" : "border-gray-300"
          }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedLabel}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-2 bg-white border border-gray-200 rounded-md shadow-sm w-full z-10"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => !opt.disabled && handleSelect(opt)}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${opt.disabled ? "text-gray-400 cursor-not-allowed" : ""
                  }`}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {(localError || error) && (
        <small className="text-red-500">{localError || `${fieldName} is required.`}</small>
      )}
    </div>
  );
};

export default InputSelect;
