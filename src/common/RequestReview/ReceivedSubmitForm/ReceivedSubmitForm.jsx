"use client";
import React, { useRef } from "react";
import InputTextArea from "@/common/Input/InputTextArea";
import StarRatingAddition from "@/common/StarRating/StarRatingAddition";
import useClickOutside from "@/common/Hooks/useClickOutside";
import InputEvidenceUpload from "@/common/Input/InputEvidenceUpload";
import reviewStyle from "@/common/Reviwes/review.module.scss";

const ReceivedSubmitForm = ({ onClose, userType }) => {
  const popupRef = useRef(null);
  useClickOutside(popupRef, onClose);

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto">
      <div className="fixed inset-0 bg-[#0000008c]" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          ref={popupRef}
          className=" w-full max-w-xs sm:max-w-sm md:max-w-3xl bg-white rounded-[20px] p-3 md:p-7 shadow-[0_0_4px_0_rgba(0,0,0,0.25)] overflow-y-scroll xl:h-[calc(100vh-100px)] 2xl:h-auto scrollbar-hide transition-all duration-300 scale-95 sm:scale-100 opacity-0 animate-popup-open"
        >
          <div className="flex flex-col items-start sm:items-center gap-2">
            <h2 className="subheading text_primary font-bold text-start sm:text-center">
              Write a Review about name
            </h2>
            <div className="bg_background py-3 px-2 w-full lg:w-1/2 rounded-full">
              <p className="text-center text_secondary font-bold">
                <span>name</span> | <span>sskbsqcbqkcbqcbeqcb</span>
              </p>
            </div>
            <div>
              <p className="regular font-medium py-4">
                Hi Nehru, how was your experience with us? We'd love your
                feedback!
              </p>
            </div>
          </div>
          <div className="mt-6">
            <form>
              <div>
                <InputTextArea
                  required={true}
                  label="Tell us more about your experience"
                  className="p-3 bg-[#F5F5F7] border border-[#F5F5F7] rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm md:placeholder:text-[14px] 2xl:placeholder:text-[15px] text-sm md:text-[15px]"
                />
              </div>
              <div className="">
                <InputEvidenceUpload required={false} />
              </div>
              <div className={`flex flex-wrap gap-4 pt-5`}>
                {userType === "business" && (
                  <div className={`w-full sm:w-[calc(50%-1rem)] `}>
                    <label className="font-semibold">
                      Payment <span className="text-[red]">*</span>
                    </label>
                    <div className={`${reviewStyle.inputstyle}`}>
                      <StarRatingAddition name="payment" />
                    </div>
                  </div>
                )}
                {userType === "business" && (
                  <div className={`w-full sm:w-[calc(50%-1rem)] `}>
                    <label className="font-semibold">
                      Solution/Resolution <span className="text-[red]">*</span>
                    </label>
                    <div className={`${reviewStyle.inputstyle}`}>
                      <StarRatingAddition name="payment" />
                    </div>
                  </div>
                )}
                {userType === "business" && (
                  <div className={`w-full sm:w-[calc(50%-1rem)] `}>
                    <label className="font-semibold">
                      Communication <span className="text-[red]">*</span>
                    </label>
                    <div className={`${reviewStyle.inputstyle}`}>
                      <StarRatingAddition name="payment" />
                    </div>
                  </div>
                )}
                <div className={`w-full sm:w-[calc(50%-1rem)] `}>
                  <label className="font-semibold">
                    Rate Your Experience <span className="text-[red]">*</span>
                  </label>
                  <div className={`${reviewStyle.inputstyle}`}>
                    <StarRatingAddition name="payment" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-3 md:mt-5 gap-3">
                <button
                  type="button"
                  className="cursor-pointer regular text_primary bg_white border border-1 border-[#035140] w-full rounded-[50px] py-2 xl:py-3"
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="cursor-pointer regular text-white bg_secondary w-full rounded-[50px] py-2 xl:py-3"
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivedSubmitForm;
