'use client';
import { useState } from 'react';

const ToggleSwitch = ({ defaultChecked = false, onToggle }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onToggle) onToggle(newValue);
  };

  return (
    <div className="flex items-center justify-between py-3">

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked || defaultChecked}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div
          className={`w-[54.26px] h-[26px] border border-gray-300 rounded-full ${isChecked ? 'bg-[#009F7D] border-none' : 'bg-gray-200'}`}

        >
          <div
            className={`absolute top-[2.5px] h-[20.25px] w-[20.35px] bg-[color:var(--black-70,#33333380)] rounded-full shadow-sm transform transition-transform ${isChecked ? 'translate-x-[28px] bg-white right-8' : 'translate-x-[1px]'}`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;