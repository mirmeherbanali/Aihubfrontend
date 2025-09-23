"use client";
import InputEmail from "../Input/InputEmail";
import InputName from "../Input/InputName";
import InputPassword from "../Input/InputPassword";
import InputPhoneNumber from "../Input/InputPhoneNumber";
import { IoClose } from "react-icons/io5";
import InputDomain from "../Input/InputURL";
import Select from "react-select";

const AddNewUser = ({
  isModelOpen,
  setIsModalOpen,
  modalTitle,
  handleSubmit,
  handleChange,
  formData,
  options,
  selectedOption,
  handleSelectChange,
  businessUser,
  individualUser,
  adminUser,
  actionType,
  isChangePassword,
  setIsChangePassword,
}) => {
  const customSelectStyle = {
    control: (base) => ({
      ...base,
      padding: "2px", // outer padding around the control (optional)
      minHeight: "40px",
      marginTop: "5px",
    }),
  };
  return (
    <>
      {isModelOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        >
          <div className="bg-white rounded-lg p-4 w-1/2 h-auto shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              <IoClose />
            </button>
            <h2 className="text-[18px] lg:text-[20px] font-bold text_primary mb-2 text-center">
              {modalTitle}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* <div> */}
              <div className="flex flex-wrap gap-4 2xl:gap-x-8 pb-5 2xl:pb-0 mb-4">
                {businessUser && (
                  <div className="w-full sm:w-[calc(50%-1rem)]">
                    <InputName
                      name="name"
                      label="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-200 mb-2"
                      required={true}
                      placeholder="Enter the Last Name"
                    />
                  </div>
                )}
                {(individualUser || adminUser) && (
                  <div className="w-full sm:w-[calc(50%-1rem)]">
                    <InputName
                      name="firstName"
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-gray-200 mb-2"
                      required={true}
                      placeholder="Enter the First Name"
                    />
                  </div>
                )}

                {(individualUser || adminUser) && (
                  <div className="w-full sm:w-[calc(50%-1rem)]">
                    <InputName
                      name="lastName"
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-gray-200 mb-2"
                      required={true}
                      placeholder="Enter the Last Name"
                    />
                  </div>
                )}

                {businessUser && (
                  <div className="w-full sm:w-[calc(50%-1rem)]">
                    <InputDomain
                      name="domain"
                      label="Domain"
                      value={formData.domain}
                      onChange={handleChange}
                      className="bg-gray-200 mb-2"
                      required={true}
                      placeholder="Enter the Domain Name"
                    />
                  </div>
                )}

                <div className="w-full sm:w-[calc(50%-1rem)]">
                  <InputEmail
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-200 mb-2"
                    required={true}
                    placeholder="Enter the Email"
                    readOnly={actionType === "edit" ? true : false}
                  />
                </div>
                <div className="w-full sm:w-[calc(50%-1rem)]">
                  <InputPhoneNumber
                    codeValue={formData.phoneCode}
                    numberValue={formData.phone}
                    handleChangePhoneCode={handleChange}
                    handleChangePhone={handleChange}
                    className="bg-gray-200 mb-2"
                    onChange={handleChange}
                    labelClassName="font-semibold text-[17px]"
                    readOnly={actionType === "edit" ? true : false}
                  />
                </div>
                {adminUser && (
                  <div className="w-full sm:w-[calc(50%-1rem)]">
                    <InputPassword
                      name="password"
                      label={isChangePassword ? "New Password" : "Password"}
                      className="bg-gray-200 mb-2"
                      placeholder="Enter the Password"
                      onChange={handleChange}
                      value={formData.password}
                    />
                    {actionType === "edit" && !isChangePassword ? (
                      <p
                        onClick={() => setIsChangePassword(true)}
                        className="text-right underline decoration-1 text_secondary text-[12px] md:text-[14px] cursor-pointer"
                      >
                        Change Password
                      </p>
                    ) : null}
                  </div>
                )}
                {adminUser &&
                  (actionType === "add" ||
                    (actionType === "edit" && isChangePassword)) && (
                    <div className="w-full sm:w-[calc(50%-1rem)]">
                      <InputPassword
                        name="confirmPassword"
                        label="Confirm Password"
                        className="bg-gray-200 mb-2"
                        placeholder="Confirm Your Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                {actionType === "edit" && (
                  <div className="w-full sm:w-[calc(50%-1rem)]">
                    <label htmlFor="status" className="pb-2 font-bold content">
                      Status
                    </label>
                    <Select
                      name="status"
                      value={selectedOption}
                      onChange={(option) => handleSelectChange(option)}
                      options={options}
                      styles={customSelectStyle}
                    />
                  </div>
                )}
              </div>
              <div className="buttonAlignment">
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button>
                  {actionType === "add" ? "Add User" : "Edit User"}
                </button>
              </div>
              {/* </div>  */}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default AddNewUser;
