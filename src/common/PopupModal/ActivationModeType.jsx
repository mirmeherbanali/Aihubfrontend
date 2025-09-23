"use client";
import React from "react";

const ActivationModeType = ({
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-100">
      <div className="absolute inset-0 bg-[#0000008c] transition-opacity duration-300 backdrop-blur-xs"></div>

      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md fixed right-1 bottom-14 bg-white rounded-[20px] p-3 md:p-7 shadow-[0_0_4px_0_rgba(0,0,0,0.25)]">
        <h2 className="subheading text_primary mb-2 md:mb-5 text-center">
          {title}
        </h2>
        <p className="text_black regular">{message}</p>
        <div className="flex justify-between mt-3 md:mt-5 gap-3">
          <button
            onClick={onPrimaryClick}
            className="cursor-pointer regular text_primary bg_white border border-1 border-[#035140] w-full rounded-[50px] py-2 xl:py-3"
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
      </div>
    </div>
  );
};

export default ActivationModeType;
