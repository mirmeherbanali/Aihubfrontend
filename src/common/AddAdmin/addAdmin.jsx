"use client";
import { useState } from "react";
import InputText from "../Input/InputText";
import InputPhoneNumber from "../Input/InputPhoneNumber";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import style from "./addadmin.module.scss";

const AdminAddition = () => {
  const [error, setError] = useState("");
  const checkboxAccessData = [
    "Dashboard Access",
    "Reviews Moderation Access",
    "User Information Access",
    "Notification Access",
    "Full Access",
  ];

  return (
    <>
      <section className="bg_white px-4 rounded-xl relative ">
        <div className="overflow-y-scroll h-[calc(100vh-130px)] scrollbar-hide pb-[50px] lg:pb-[80px]">
          <h2 className="font-bold text_primary subheading text-center py-3">
            Add Admin Here
          </h2>
          <div>
            <form>
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="w-full lg:w-1/2">
                  <InputText
                    id={"fname"}
                    name="fname"
                    label={"First Name"}
                    value={""}
                    placeholder={"Enter the First Name"}
                    readOnly={false}
                    required={true}
                    className="bg_background customInput py-[5px] lg:py-[10px]"
                    labelClassName=""
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <InputText
                    id={"lname"}
                    name="lname"
                    label={"Last Name"}
                    value={""}
                    placeholder={"Enter the Last Name"}
                    readOnly={false}
                    required={true}
                    className="bg_background customInput py-[5px] lg:py-[10px]"
                    labelClassName=""
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 mb-2">
                <div className="w-full lg:w-1/2">
                  <InputPhoneNumber
                    id={"phone"}
                    name="phone"
                    label={"Mobile Number"}
                    value={""}
                    placeholder={"Enter Mobile Number"}
                    readOnly={false}
                    required={true}
                    className="bg_background customInput py-[5px] lg:py-[10px]"
                    labelClassName="font-semibold text-[14px] lg:text-[17px]"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <InputText
                    id={"email"}
                    name="email"
                    label={"Mail Id"}
                    value={""}
                    placeholder={"Enter Email Id"}
                    readOnly={false}
                    required={true}
                    className="bg_background customInput py-[5px] lg:py-[10px]"
                    labelClassName=""
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="font-semibold text-[14px] lg:text-[17px]">
                  Business Account Access Permissions{" "}
                  <span className="text-red-500 font-bold">*</span>{" "}
                </label>
                <div className="flex gap-x-4 gap-y-2 flex-wrap mb-4 mt-2">
                  {checkboxAccessData.map((item, index) => {
                    return (
                      <div key={index} className="flex lg:gap-1">
                        <CustomCheckbox
                          name={`businessAccess${index}`}
                          value={item}
                          id={`businessAccess${index}`}
                          className="text-sm"
                        />
                        {/* <input  id={`businessAccess${index}`} type='checkbox' name={`businessAccess${index}`} value={item} /> */}
                        <label
                          htmlFor={`businessAccess${index}`}
                          className="text-sm 2xl:text-[17px]"
                        >
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="font-semibold text-[14px] lg:text-[17px] mb-2">
                  Individual Account Access Permissions{" "}
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="flex gap-x-4 gap-y-2 flex-wrap mb-4 mt-2">
                  {checkboxAccessData.map((item, index) => {
                    return (
                      <div key={index} className="flex lg:gap-1">
                        <CustomCheckbox
                          name={`individualAccess${index}`}
                          value={item}
                          id={`individualAccess${index}`}
                          classNa
                          me="text-[14px] lg:text-[15px]"
                        />
                        {/* <input  id={`individualAccess${index}`} type='checkbox' name={`individualAccess${index}`} value={item} /> */}
                        <label
                          htmlFor={`individualAccess${index}`}
                          className="text-sm 2xl:text-[17px]"
                        >
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={style.buttonstyle}>
                <button>Cancel</button>
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminAddition;
