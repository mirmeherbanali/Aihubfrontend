"use client";
import React from "react";
import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import SocialButtons from "../SocialIcon/SocialButtons";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { loginBusinessUser, recoverBusinessAccount, reactivateAccount } from "@/store/slices/businessAuth.slice";
import InputEmail from "../Input/InputEmail";
import InputPhoneNumber from "../Input/InputPhoneNumber";
import InputPassword from "../Input/InputPassword";
import RecoveryCardPopup from "../CardPopup/RecoveryCardPopup";

const BusinessLoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [recoverAccount, setRecoverAccount] = useState(false);
  const [reactivateBusinessAccount, setReactivateBusinessAccount] = useState(false);
  const { activeAccount, userErrorData } = useSelector((state) => state.businessAuth);
  const [formData, setFormData] = useState({
    email: "",
    phoneCode: "",
    phone: "",
    password: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneCodeChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, phoneCode: value }));
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: async (credentials) => {
      const response = await dispatch(loginBusinessUser(credentials)).unwrap();

      if (response?.success) {
        router.push("/business/dashboard");
        setRecoverAccount(false);
        setReactivateBusinessAccount(false);
      }

    },
    onSuccess: () => {
      if (userErrorData?.isSoftDeleted) {
        setRecoverAccount(true);
      } else if (userErrorData?.isDeactivateAccount) {
        setReactivateBusinessAccount(true);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      return;
    },
  });

  const isFormValid = useMemo(() => {
    return (
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
        loginMutation(formData);
        setFormData({
          email: "",
          phoneCode: "",
          phone: "",
          password: "",
          termsAccepted: false,
        });
      } else {
        return;
      }
    },
    [formData, isFormValid, loginMutation]
  );

  const { mutate: triggerReactivateAccount } = useMutation({
    mutationFn: async (credentials) => {
      return await dispatch(reactivateAccount(credentials)).unwrap();
    },
    onSuccess: (response) => {
      if (response?.success) {
        setReactivateBusinessAccount(false);
        router.push("/business/dashboard");
      } else if (userErrorData?.isDeactivateAccount || activeAccount?.isDeactivateAccount) {
        setReactivateBusinessAccount(true);
      } else {
        setReactivateBusinessAccount(false);
        router.push("/business/dashboard");
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      return;
    },
  });

  const { mutate: triggerRecoverBusinessAccount } = useMutation({
    mutationFn: async (credentials) => {
      return await dispatch(recoverBusinessAccount(credentials)).unwrap();
    },
    onSuccess: (response) => {
      if (response?.success) {
        setRecoverAccount(false);
        router.push("/business/dashboard");
      } else if (userErrorData?.isSoftDeleted || activeAccount?.isSoftDeleted) {
        setRecoverAccount(true);
      } else {
        setRecoverAccount(false);
        router.push("/business/dashboard");
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      return;
    },
  });

  const handleConfirmReactivateAccount = async () => {
    await triggerReactivateAccount({ businessId: userErrorData?._id });
  };

  const handleConfirmRecoverAccount = async () => {
    await triggerRecoverBusinessAccount({ businessId: userErrorData._id });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="pb-4">
          <InputEmail
            value={formData.email}
            onChange={handleChange}
            id="email"
            name="email"
            placeholder="Enter Work Mail Id"
            required={true}
            label="Email"
            className="w-full h-9 md:h-10 2xl:h-12 p-3 bg-[#F5F5F7] border border-[#F5F5F7] rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm 2xl:placeholder:text-[15px]"
          />
        </div>
        <div className="w-full pb-4">
          <InputPhoneNumber
            label="Mobile Number"
            codeValue={formData.phoneCode}
            numberValue={formData.phone}
            handleChangePhoneCode={handlePhoneCodeChange}
            handleChangePhone={handlePhoneChange}
            codePlaceholder="code"
            numberPlaceholder="Enter Mobile Number"
            required={true}
            className="w-full h-9 md:h-10 2xl:h-12 p-3 bg-[#F5F5F7] border border-[#F5F5F7] rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm 2xl:placeholder:text-[15px]"
          />
        </div>
        {/* <div className="relative pb-4">
          <label
            htmlFor="buisnessOtp"
            className="block text-[15px] font-medium pb-1"
          >
            OTP <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="number"
            id="buisnessOtp"
            name="buisnessOtp"
            placeholder="Enter the OTP"
            className="w-full p-3 bg-[#F5F5F7] border border-[#F5F5F7] rounded-lg placeholder-gray-500 focus:outline-none  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            required
          /> */}
        {/* <p className="text-red-500 text-[15px] mt-1">Error Show</p> */}
        {/* <p className="absolute -bottom-3 right-0 font-semibold text-[15px] text-[#014b3b]">
            03:00 sec
          </p>
        </div> */}
        <div className="relative pb-4">
          <InputPassword
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="Enter the Password"
            value={formData.password}
            className="w-full h-9 md:h-10 2xl:h-12 p-3 bg-[#F5F5F7] border border-[#F5F5F7] rounded-md placeholder-gray-500 focus:outline-none placeholder:text-sm 2xl:placeholder:text-[15px]"
          />
        </div>
        <div className="flex items-center gap-3 py-5">
          <input
            type="checkbox"
            id="terms"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
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
          {isLoading ? "Logging in..." : "Login Account"}
        </button>
        <SocialButtons />
      </form>

      {recoverAccount && (
        <div>
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <RecoveryCardPopup
              setIsOpenSuccess={setRecoverAccount}
              initalHeading={"Recover Account?"}
              successHeading={"Account Recovered!"}
              // setIsLogin={setIsLogin}
              message={"You're just one step away from recovering your account and getting back to everything you had access to."}
              successMessage={"To proceed, please log in with your account credentials."}
              button={"Recover"}
              successButton={"Login"}
              onActivationClick={handleConfirmRecoverAccount}
            />
          </motion.div>
        </div>
      )}
      {reactivateBusinessAccount && (
        <div>
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <RecoveryCardPopup
              setIsOpenSuccess={setReactivateBusinessAccount}
              initalHeading={"Re-Activate Account ?"}
              successHeading={"Account Activated!"}
              // setIsLogin={setIsLogin}
              message={"You're just one step away from reactivating your account and getting back to everything you had access to."}
              successMessage={"To proceed, please log in with your account credentials."}
              button={"Re-Activate"}
              successButton={"Login"}
              onActivationClick={handleConfirmReactivateAccount}
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BusinessLoginForm;
