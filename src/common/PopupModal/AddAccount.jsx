"use client";
import React, { useState } from "react";
import InputText from "../Input/InputText";
import InputEmail from "../Input/InputEmail";
import InputURL from "../Input/InputURL";
import InputPhoneNumber from "../Input/InputPhoneNumber";
import InputPassword from "../Input/InputPassword";

const AddAccount = ({
  onClose,
  userFormData,
  handleChangeUser,
  handleSubmitUser,
  handleChangePhoneCode,
  handleChangePhone,
  userType,
}) => {
  const [authMethod, setAuthMethod] = useState("password");

  const toggleAuthMethod = () => {
    setAuthMethod((prev) => (prev === "password" ? "otp" : "password"));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100">
      <div
        className="absolute inset-0 bg-[#0000008c]  transition-opacity duration-300"
        onClick={onClose}
      ></div>
      <div className="relative bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 rounded-[20px] transform transition-all duration-300 scale-95 sm:scale-100 opacity-0 animate-popup-open w-full max-w-[90%] sm:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px] mx-auto">
        <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold lg:font-bold text_primary text-center mb-6 sm:mb-8">
          Add New {userType === "business" ? "Business" : "Individual"} Account
        </h2>
        <div>
          <form className="pt-2 sm:pt-4 lg:pt-6" onSubmit={handleSubmitUser}>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {userType === "business" && (
                <div className="w-full sm:w-[calc(50%-12px)] flex-shrink-0">
                  <InputText
                    required={true}
                    id="name"
                    name="name"
                    label="Company Name"
                    placeholder="Enter Website"
                    value={userFormData.name}
                    onChange={handleChangeUser}
                    className="w-full h-10 sm:h-11 lg:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm sm:placeholder:text-[14px] text-sm sm:text-[15px]"
                  />
                </div>
              )}
              {userType === "business" && (
                <div className="w-full sm:w-[calc(50%-12px)] flex-shrink-0">
                  <InputURL
                    required={true}
                    id="domain"
                    name="domain"
                    label="Company Website"
                    placeholder="Enter Website"
                    value={userFormData.domain}
                    onChange={handleChangeUser}
                    className="w-full h-10 sm:h-11 lg:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm sm:placeholder:text-[14px] text-sm sm:text-[15px]"
                  />
                </div>
              )}
              {userType === "individual" && (
                <div className="w-full sm:w-[calc(50%-12px)] flex-shrink-0">
                  <InputText
                    required={true}
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    placeholder="Enter Website"
                    value={userFormData.firstName}
                    onChange={handleChangeUser}
                    className="w-full h-10 sm:h-11 lg:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm sm:placeholder:text-[14px] text-sm sm:text-[15px]"
                  />
                </div>
              )}
              {userType === "individual" && (
                <div className="w-full sm:w-[calc(50%-12px)] flex-shrink-0">
                  <InputText
                    required={true}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter Website"
                    value={userFormData.lastName}
                    onChange={handleChangeUser}
                    className="w-full h-10 sm:h-11 lg:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm sm:placeholder:text-[14px] text-sm sm:text-[15px]"
                  />
                </div>
              )}
              <div className="w-full sm:w-[calc(50%-12px)] flex-shrink-0">
                <InputEmail
                  required={true}
                  id="email"
                  name="email"
                  label="Work Mail Id"
                  value={userFormData.email}
                  onChange={handleChangeUser}
                  placeholder="Enter Work Mail Id"
                  className="w-full h-10 sm:h-11 lg:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm sm:placeholder:text-[14px] text-sm sm:text-[15px]"
                />
              </div>
              <div className="w-full sm:w-[calc(50%-12px)] flex-shrink-0">
                <InputPhoneNumber
                  required={true}
                  id="phone"
                  name="phone"
                  label="Mobile Number"
                  placeholder="Enter Mobile Number"
                  codeValue={userFormData.phoneCode}
                  numberValue={userFormData.phone}
                  handleChangePhoneCode={handleChangePhoneCode}
                  handleChangePhone={handleChangePhone}
                  className="w-full h-10 sm:h-11 lg:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm sm:placeholder:text-[14px] text-sm sm:text-[15px]"
                />
              </div>
              {authMethod === "password" ? (
                <>
                  <div className="w-full sm:w-[calc(50%-12px)] flex-shrink-0">
                    <InputPassword
                      required={true}
                      id="password"
                      name="password"
                      value={userFormData.password}
                      onChange={handleChangeUser}
                      label="Password"
                      placeholder="Enter Password"
                      className="w-full h-10 sm:h-11 lg:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm sm:placeholder:text-[14px] text-sm sm:text-[15px]"
                    />
                  </div>
                  <div className="w-full sm:w-[calc(50%-12px)] flex-shrink-0">
                    <InputPassword
                      required={true}
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="Enter Confirm Password"
                      fieldName="Confirm Password"
                      value={userFormData.confirmPassword}
                      onChange={handleChangeUser}
                      className="w-full h-10 sm:h-11 lg:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm sm:placeholder:text-[14px] text-sm sm:text-[15px]"
                    />
                  </div>
                </>
              ) : (
                <div className="w-full sm:w-[calc(50%-12px)] flex-shrink-0">
                  <InputText
                    required={true}
                    id="otp"
                    name="otp"
                    label="OTP"
                    placeholder="Enter OTP"
                    className="w-full h-10 sm:h-11 lg:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm sm:placeholder:text-[14px] text-sm sm:text-[15px]"
                  />
                </div>
              )}
            </div>
            <hr className="border border-[#F5F5F7] my-4 lg:my-6" />
            <div className="w-full flex justify-end">
              <p
                className="w-fit regular text_secondary font-semibold text-right cursor-pointer hover:text-primary transition-colors"
                onClick={toggleAuthMethod}
              >
                {authMethod === "password"
                  ? "Create Account With OTP"
                  : "Create Account With Password"}
              </p>
            </div>
            <div className="flex gap-x-4 justify-end mt-8 sm:mt-10">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer text_primary bg-white border border-[#035140] rounded-[50px] py-2 px-6 sm:py-2.5 sm:px-7 text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg_primary cursor-pointer text-white border border-[#035140] rounded-[50px] py-2 px-6 sm:py-2.5 sm:px-7 text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200"
              >
                Add Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
