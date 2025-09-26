"use client";
import TostifyShowAndReset from "@/common/tostify/TostifyShowAndReset";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  registerBusinessUser,
  resetBusinessRegistrationMessage,
} from "@/store/slices/businessAuth.slice";
import {
  showToastifySuccess,
  showToastifyError,
} from "@/common/tostify/Toastifyresponse";
import SocialButtons from "../SocialIcon/SocialButtons";
import { useRouter } from "next/navigation";
import InputName from "../Input/InputName";
import InputEmail from "../Input/InputEmail";
import InputText from "../Input/InputText";
import InputPhoneNumber from "../Input/InputPhoneNumber";
import InputPassword from "../Input/InputPassword";

const BusinessRegisterForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const tostifyShowAndReset = TostifyShowAndReset();
  const {
    registerBusinessUserSuccessMessage,
    registerBusinessUserErrorMessage,
  } = useSelector((state) => state.businessAuth);

  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    email: "",
    phoneCode: "",
    phone: "",
    password: "",
    termsAccepted: false,
  });

  useEffect(() => {
    tostifyShowAndReset(
      registerBusinessUserSuccessMessage,
      showToastifySuccess,
      resetBusinessRegistrationMessage
    );
  }, [tostifyShowAndReset, registerBusinessUserSuccessMessage]);

  useEffect(() => {
    tostifyShowAndReset(
      registerBusinessUserErrorMessage,
      showToastifyError,
      resetBusinessRegistrationMessage
    );
  }, [tostifyShowAndReset, registerBusinessUserErrorMessage]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handlePhoneCodeChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, phoneCode: value }));
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const { mutate: registerMutation, isLoading } = useMutation({
    mutationFn: async (credentials) => {
      const response = await dispatch(
        registerBusinessUser({
          ...credentials,
        })
      );
      return response;
    },
    onError: (error) => {
      console.error("Registration Failed:", error);
    },
  });

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() &&
      formData.domain.trim() &&
      formData.email.trim() &&
      formData.phoneCode.trim() &&
      formData.phone.trim() &&
      formData.password.trim() &&
      formData.termsAccepted
    );
  }, [formData]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isFormValid) {
        registerMutation(formData);
        setFormData({
          name: "",
          domain: "",
          email: "",
          phoneCode: "",
          phone: "",
          password: "",
          termsAccepted: false,
        });
      } else {
        console.log("Please fill all required fields and accept the terms.");
      }
    },
    [formData, isFormValid, registerMutation]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row sm:space-x-3">
        <div className="sm:w-1/2 pb-4">
          <InputName
            value={formData.name}
            onChange={handleInputChange}
            id="name"
            name="name"
            placeholder="Enter Name"
            required={true}
            label="Name"
            className="w-full h-9 md:h-10 2xl:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm 2xl:placeholder:text-[15px]"
          />
        </div>
        <div className="sm:w-1/2 pb-4">
          <InputEmail
            value={formData.email}
            onChange={handleInputChange}
            id="email"
            name="email"
            placeholder="Enter Work Mail Id"
            required={true}
            label="Email"
            className="w-full h-9 md:h-10 2xl:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm 2xl:placeholder:text-[15px]"
          />
        </div>
      </div>
      <div className="pb-4">
        <InputText
          value={formData.domain}
          onChange={handleInputChange}
          id="domain"
          name="domain"
          placeholder="Enter Website URL"
          required={true}
          label="Company Website"
          className="w-full h-9 md:h-10 2xl:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm 2xl:placeholder:text-[15px]"
        />
      </div>
      <div className="pb-4">
        <InputPhoneNumber
          label="Mobile Number"
          codeValue={formData.phoneCode}
          numberValue={formData.phone}
          handleChangePhoneCode={handlePhoneCodeChange}
          handleChangePhone={handlePhoneChange}
          codePlaceholder="code"
          numberPlaceholder="Enter Mobile Number"
          required={true}
          className="w-full h-9 md:h-10 2xl:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm 2xl:placeholder:text-[15px]"
        />
      </div>
      <div className="relative pb-4">
        <InputPassword
          label="Password"
          name="password"
          onChange={handleInputChange}
          placeholder="Enter the Password"
          value={formData.password}
          className="w-full h-9 md:h-10 2xl:h-12 p-3 bg-[#F5F5F7] border  rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm 2xl:placeholder:text-[15px]"
        />
        {/* <p className="absolute -bottom-3 right-0 font-semibold text-[15px] text-[#014b3b]">
          03:00 sec
        </p> */}
      </div>
      <div className="flex items-center gap-3 py-5">
        <input
          type="checkbox"
          id="terms"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleInputChange}
          className="accent-[#014b3b]"
        />
        <label htmlFor="terms" className="text-[17px] font-medium">
          I agree to the{" "}
          <a href="#" className="text-[#014b3b] underline">
            Terms & Conditions
          </a>
        </label>
      </div>
      <button
        type="submit"
        disabled={isLoading || !isFormValid}
        className={`flex justify-center mx-auto w-50 sm:w-96 py-3 rounded-full font-medium transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white bg-[#014b3b]`}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
      <SocialButtons />
    </form>
  );
};

export default BusinessRegisterForm;
