import React, { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoEyeOutline, IoClose } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { PiMountainsLight } from "react-icons/pi";

const EvidenceRule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={toggleModal}
        className="focus:outline-none"
      >
        <AiOutlineExclamationCircle size={17} className="text-[#009f7d]" />
      </button>
      <div className="hidden lg:block xl:w-max flex flex-col space-y-2 bg-white border border-gray-200 p-3 rounded-lg absolute xl:top-6 -left-28 xl:left-0 z-10 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-300">
        <div className="flex items-center space-x-2">
          <IoEyeOutline className="text-[#009f7d]" />
          <span className="text-sm font-normal">Visible to everyone</span>
        </div>
        <div className="flex items-start space-x-2">
          <CiLock className="text-[#009f7d]" size={17} />
          <span className="text-sm font-normal">
            Visible only to you and platform admins
          </span>
        </div>
        <div className="flex items-start space-x-2 w-max">
          <PiMountainsLight className="text-[#009f7d] text-[17px]" />
          <span className="text-sm font-normal ">
            You can upload up to 5 files as evidence (e.g., work images,
            invoice, payment proof).
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000008c] transition-opacity duration-300 lg:hidden">
          <div className="relative w-full max-w-[90vw] bg-white border border-gray-200 p-4 rounded-lg flex flex-col space-y-2 transform transition-all duration-300 scale-95 opacity-0 animate-popup-open">
            <button
              type="button"
              onClick={toggleModal}
              className="cursor-pointer absolute top-2 right-2 text-[#009f7d] hover:text-[#007f63] focus:outline-none"
            >
              <IoClose size={20} />
            </button>

            <div className="flex items-center space-x-2">
              <IoEyeOutline
                className="text-[#009f7d] flex-shrink-0"
                size={17}
              />
              <span className="text-sm font-normal break-words">
                Visible to everyone
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <CiLock className="text-[#009f7d] flex-shrink-0" size={17} />
              <span className="text-sm font-normal break-words">
                Visible only to you and platform admins
              </span>
            </div>
            <div className="flex items-start gap-x-2 ">
              <PiMountainsLight className="text-[#009f7d] flex-shrink-0" />
              <span className="text-sm font-normal break-words">
                You can upload up to 5 files as evidence (e.g., work images,
                invoice, payment proof).
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceRule;
