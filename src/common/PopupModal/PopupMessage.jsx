import Image from "next/image";
import React from "react";
import noMatch from "@/assets/images/Common/noMatched.gif";
import Match from "@/assets/images/Common/matched.gif";
const PopupMessage = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-[#0000008c] transition-opacity duration-300"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-xl p-5 lg:p-6 xl:p-7 2xl:p-8  transform transition-all duration-300 scale-95 opacity-0 animate-popup-open">
        <h3 className="bigsubheading text_primary text-center mb-2">
          User Data Matched
        </h3>
        {/* <h3 className="bigsubheading text_primary text-center mb-2">
        User Data Mismatched
        </h3> */}
        <p className="text-[14px] lg:text-[17px] text_black text-center">
          User details matched. You may proceed to add a review.
        </p>
        {/*  <p className="text-[14px] lg:text-[17px] text_black text-center">
        Please check your company details and try again.
        </p> */}
        <Image
          src={Match}
          width={200}
          height={200}
          alt="Match"
          title="Dragon Customer"
          className="mx-auto mt-2"
        />
        {/* <Image src={noMatch} alt="noMatch" title="Dragon Customer" className="mx-auto mt-4" /> */}
      </div>
    </div>
  );
};

export default PopupMessage;
