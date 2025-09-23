'use client";';
import React from "react";
import { IoClose } from "react-icons/io5";

const BottomNotificationModal = ({
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  onClose,
}) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md fixed right-1 bottom-14 bg-white rounded-[20px] p-3 md:p-7 shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
      <div className="relative">
        <h2 className="subheading text_primary mb-2 md:mb-5">{title}</h2>
        <p className="text_black regular">{message}</p>
        <div className="flex justify-between mt-3 md:mt-5 gap-3">
          <button
            onClick={onPrimaryClick}
            className="cursor-pointer regular text-white text-center bg_primary w-full rounded-[50px] py-2 xl:py-3"
          >
            {primaryButtonText}
          </button>
          <button
            onClick={onSecondaryClick}
            className="cursor-pointer regular text-white bg_secondary w-full rounded-[50px] py-2 xl:py-3"
          >
            {secondaryButtonText}
          </button>
        </div>
        <IoClose
          size={18}
          onClick={onClose}
          className="cursor-pointer text-gray-500 absolute top-2 right-0"
        />
      </div>
    </div>
  );
};

export default BottomNotificationModal;
