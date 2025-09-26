"use client";
import React, { useRef } from "react";
import useClickOutside from "../Hooks/useClickOutside";

const CommonPopupModal = ({
  handleUpdateProfile,
  profileCompletion,
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  onClose,
}) => {
  const popupRef = useRef(null);
  useClickOutside(popupRef, onClose);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      <div
        className="absolute inset-0 bg-[#0000008c] transition-opacity duration-300 backdrop-blur-xs"
        onClick={onClose}
      ></div>
      <div
        ref={popupRef}
        className="relative w-full max-w-xs sm:max-w-sm md:max-w-md fixed right-1 bottom-14 bg-white rounded-[20px] p-3 md:p-7 shadow-[0_0_4px_0_rgba(0,0,0,0.25)]"
      >
        <h2 className="subheading text_primary mb-2 md:mb-5 text-center">
          {title}
        </h2>
        <p className="text_black regular">{message}</p>
        {profileCompletion && (
          <>
            <div className="flex justify-between pt-5 pb-2">
              <p className="regular font-semibold text_primary">Profile</p>
              <p className="regular font-semibold text_orange ">
                {profileCompletion?.percentageOfCompletion || 0}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg_orange h-2.5 rounded-full"
                style={{
                  width: `${profileCompletion?.percentageOfCompletion || 0}%`,
                }}
              ></div>
            </div>
            <div className="pt-5 flex flex-col gap-y-3">
              {profileCompletion?.missingFields?.map((field, index) => (
                <div
                  key={index}
                  className="text-[14px] flex flex-row items-center justify-between cursor-pointer"
                  onClick={() => handleUpdateProfile(field.path)}
                >
                  <p className="text_black font-semibold capitalize">
                    {field?.name || "Missing Name"}
                  </p>
                  <p className="text_secondary">Pending</p>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex justify-between mt-3 md:mt-5 gap-3">
          {onPrimaryClick && (
            <button
              type="button"
              onClick={onPrimaryClick}
              className="cursor-pointer regular text_primary bg_white border border-1 border-[#035140] w-full rounded-[50px] py-2 xl:py-3"
            >
              {primaryButtonText}
            </button>
          )}
          {onSecondaryClick && (
            <button
              type="button"
              onClick={onSecondaryClick}
              className="cursor-pointer regular text-white bg_secondary w-full rounded-[50px] py-2 xl:py-3"
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonPopupModal;
