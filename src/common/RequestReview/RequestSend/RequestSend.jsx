"use client";
import InputEmail from "@/common/Input/InputEmail";
import React, { useState } from "react";
import RequestSubmitForm from "../RequestSubmitForm/RequestSubmitForm";

const RequestSend = ({
  handleEmailChange, clientEmail, handleEmailSearch, handleSelectCategory, handleClosePopup, isPopupOpen, categoriesOptions, formData, categoryError, userDetails, handleChange, handleSubmitRequest
}) => {

  return (
    <div className="pt-8">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 xl:p-8">
        <h1 className="subheading text_primary pb-2 md:pb-4">
          Request a Review
        </h1>
        <form onSubmit={handleEmailSearch}>
          <div className="w-full flex flex-col items-center sm:flex-row gap-4 sm:items-center">
            <div className="sm:w-[60%] xl:w-[70%]">
              <InputEmail
                id="clientEmail"
                name="email"
                label="Client Mail Id"
                placeholder="Enter the Client Mail Id"
                required={true}
                className="mt-1 sm:mt-2 sm:h-10 2xl:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm md:placeholder:text-[14px] 2xl:placeholder:text-[15px] text-sm md:text-[15px]"
                labelClassName="text-gray-800"
                onChange={handleEmailChange}
                value={clientEmail}
              />
            </div>
            <div className="sm:w-[40%] xl:w-[30%] sm:mt-8">
              <button
                type="submit"
                className="w-full py-2 2xl:py-3 rounded-full bg_primary text-white regular cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {isPopupOpen && (
        <RequestSubmitForm
          handleSelectCategory={handleSelectCategory}
          handleChange={handleChange}
          categoriesOptions={categoriesOptions}
          formData={formData}
          onClose={handleClosePopup}
          categoryError={categoryError}
          userDetails={userDetails}
          handleSubmitRequest={handleSubmitRequest}
        />
      )}
    </div>
  );
};

export default RequestSend;