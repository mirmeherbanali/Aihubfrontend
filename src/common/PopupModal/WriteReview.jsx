"use client";
import React, { useEffect, useRef } from "react";
import BusinessReviewAddition from "@/components/Business/Container/Reviwes/ReviewAddition";
import IndividualReviewAddition from "@/components/Individual/Container/Reviwes/ReviewAddition";
import useClickOutside from "../Hooks/useClickOutside";

const WriteReview = ({ onClose, reviewType, userType }) => {
  const popupRef = useRef(null);

  useClickOutside(popupRef, onClose);

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center">
      <div className="absolute inset-0 bg-[#0000008c]" onClick={onClose}></div>
      <div className="relative w-full h-full flex justify-center items-center">
        <div
          ref={popupRef}
          role="dialog"
          aria-modal="true"
          className="absolute top-5 w-full max-w-[90%] sm:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px] mx-auto overflow-y-scroll h-[calc(100vh-100px)] scrollbar-hide bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 rounded-[20px] transition-all duration-300 scale-95 sm:scale-100 opacity-0 animate-popup-open"
        >
          {userType === "business" ? (
            <BusinessReviewAddition onClose={onClose} reviewType={reviewType} />
          ) : (
            <IndividualReviewAddition onClose={onClose} reviewType={reviewType} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
