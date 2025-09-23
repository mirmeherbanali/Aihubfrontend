"use client";
import useClickOutside from "@/common/Hooks/useClickOutside";
import InputCategory from "@/common/Input/InputCategory";
import InputText from "@/common/Input/InputText";
import InputDate from "@/common/Input/InputDate";
import InputTextArea from "@/common/Input/InputTextArea";
import React, { useRef } from "react";

const RequestSubmitForm = ({ handleSelectCategory, categoriesOptions, onClose, formData, categoryError, userDetails, handleChange, handleSubmitRequest }) => {
  const popupRef = useRef(null);
  useClickOutside(popupRef, onClose);

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto">
      <div className="fixed inset-0 bg-[#0000008c]" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          ref={popupRef}
          className=" w-full max-w-xs sm:max-w-sm md:max-w-2xl bg-white rounded-[20px] p-3 md:p-7 shadow-[0_0_4px_0_rgba(0,0,0,0.25)] overflow-y-scroll xl:h-[calc(100vh-100px)] 2xl:h-auto scrollbar-hide transition-all duration-300 scale-95 sm:scale-100 opacity-0 animate-popup-open"
        >
          <h2 className="subheading mb-2 md:mb-5">
            Request Review to{" "}
            <span className="text_primary">
              {userDetails?.email || ""}
            </span>
          </h2>
          <div className="pt-5">
            <form onSubmit={handleSubmitRequest}>
              <div className="flex flex-wrap gap-4 pb-5 2xl:pb-0">
                <div className="w-full mb-2">
                  <InputCategory
                    name="reviewCategory"
                    label="Select Category"
                    value={formData?.reviewCategory && formData?.reviewCategoryName ? {
                      value: formData.reviewCategory, label: formData.reviewCategoryName
                    } : null}
                    onChange={handleSelectCategory}
                    options={categoriesOptions}
                    required={true}
                    placeholder="Enter Category here"
                    categoryError={categoryError}
                  />
                </div>
                <div className="w-full sm:w-[calc(50%-1rem)] mb-2">
                  <InputText
                    name="serviceProvided"
                    label="Service Provided"
                    className="h-12 p-3 bg-[#F5F5F7] border border-[#F5F5F7] rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm md:placeholder:text-[14px] 2xl:placeholder:text-[15px] text-sm md:text-[15px]"
                    required={true}
                    placeholder="Enter your name"
                    value={formData.serviceProvided || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="w-full sm:w-[calc(50%-1rem)] mb-2">
                  <InputDate
                    autoComplete="off"
                    required={true}
                    label="Date of Experience"
                    name="dateOfExperience"
                    className="h-12 p-3 bg-[#F5F5F7] border border-[#F5F5F7] rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm md:placeholder:text-[14px] 2xl:placeholder:text-[15px] text-sm md:text-[15px]"
                    placeholder="Enter your email"
                    value={formData.dateOfExperience || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="w-full mb-2">
                  <InputTextArea
                    onChange={(e) => handleChange(e)}
                    required={true}
                    value={formData.notes || ""}
                    label="Add Notes Here"
                    name="notes"
                    className="p-3 bg-[#F5F5F7] border border-[#F5F5F7] rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm md:placeholder:text-[14px] 2xl:placeholder:text-[15px] text-sm md:text-[15px]"
                  />
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
                  type="submit"
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

export default RequestSubmitForm;