import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";
 
const DropdownComponent = ({ value = "Public", onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
 
  const handleOptionSelect = (option) => {
    if (onChange) onChange(option);
    setIsOpen(false);
  };
 
  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center justify-between w-full p-1 border border-gray-300 rounded-md text-black text-sm focus:outline-none"
      >
        <div className="flex items-center gap-1">
          {value === "Public" ? (
            <IoEyeOutline className="text-[#009f7d]" size={18} />
          ) : (
            <CiLock className="text-[#009f7d]" size={18} />
          )}
          <span>{value}</span>
        </div>
        <SlArrowDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          size={12}
        />
      </button>
 
      <div
        className={`z-50 p-2 text-sm absolute w-full mt-1 border border-gray-300 rounded-md bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          onClick={() => handleOptionSelect("Public")}
          className="flex items-center justify-between hover:bg-gray-100 cursor-pointer p-1"
        >
          <div className="flex items-center gap-2">
            <IoEyeOutline className="text-black" size={18} />
            <span className="text-black">Public</span>
          </div>
        </div>
        <div
          onClick={() => handleOptionSelect("Private")}
          className="flex items-center justify-between hover:bg-gray-100 cursor-pointer p-1 "
        >
          <div className="flex items-center gap-2">
            <CiLock className="text-black" size={18} />
            <span className="text-black">Private</span>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default DropdownComponent;