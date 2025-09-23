"use client";
import React, { useState } from "react";
import { FaRegFlag } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CustomCheckbox from "@/common/CustomCheckbox/CustomCheckbox";
 
const flaggingReasons = [
  {
    flagId: 1,
    title: "Personal Information",
    question:
      "Does the review go against our guidelines on personal information?",
    description:
      "We can remove content that breaches applicable privacy laws for example, information that identifies an employee without their permission, such as their:",
    confirmationText: "Yes, I'd like to continue flagging this review",
  },
  {
    flagId: 2,
    title: "Advertising or promotional",
    question: "Is this review primarily advertising or promotional content?",
    description:
      "Reviews should reflect genuine experiences, not advertisements for businesses or services. We remove content that appears to be primarily promotional in nature.",
    confirmationText: "Yes, this appears to be promotional content",
  },
  {
    flagId: 3,
    title: "About a different business",
    question:
      "Does this review describe an experience with a different business?",
    description:
      "Reviews should be about the specific business they're posted under. We can move or remove reviews that clearly describe experiences with other companies.",
    confirmationText: "Yes, this review is about a different business",
  },
  {
    flagId: 4,
    title: "Not based on a genuine experience",
    question:
      "Does this review appear to be fabricated or not based on a real experience?",
    description:
      "We remove reviews that show signs of being fake, fabricated, or not based on actual first-hand experiences with the business.",
    confirmationText: "Yes, this doesn't appear to be a genuine experience",
  },
  {
    flagId: 5,
    title: "Harmful or illegal - Hate speech or discrimination",
    question: "Does this review contain hate speech or discriminatory content?",
    description:
      "We remove content that attacks people based on race, ethnicity, national origin, religion, disability, disease, age, sexual orientation, gender, or gender identity.",
    confirmationText: "Yes, this contains hate speech or discrimination",
  },
  {
    flagId: 6,
    title: "Harmful or illegal - Terrorism",
    question: "Does this review contain content related to terrorism?",
    description:
      "We remove content that promotes or supports terrorism, including content that encourages violence, celebrates attacks, or promotes terrorist ideologies.",
    confirmationText: "Yes, this contains terrorist-related content",
  },
  {
    flagId: 7,
    title: "Harmful or illegal - Threats or violence",
    question: "Does this review contain threats or incitement to violence?",
    description:
      "We remove content that contains threats of violence or harm against individuals or groups, or that encourages others to commit violent acts.",
    confirmationText: "Yes, this contains threats or incitement to violence",
  },
  {
    flagId: 8,
    title: "Harmful or illegal - Obscenity",
    question: "Does this review contain obscene or explicit content?",
    description:
      "We remove content that contains gratuitously graphic sexual descriptions, pornography, or excessively vulgar language that serves no constructive purpose.",
    confirmationText: "Yes, this contains obscene content",
  },
  {
    flagId: 9,
    title: "Harmful or illegal - Defamation",
    question: "Does this review contain potentially defamatory statements?",
    description:
      "We may remove content that contains demonstrably false statements presented as facts that could harm the reputation of an individual or business.",
    confirmationText: "Yes, this contains defamatory statements",
  },
  {
    flagId: 10,
    title: "Obsolete reasons",
    question: "Is this review no longer relevant or obsolete?",
    description:
      "We may remove content that describes outdated experiences that are no longer relevant to the current state of the business.",
    confirmationText: "Yes, this review is obsolete",
  },
];
 
const FlaggingReason = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [checkedItems, setCheckedItems] = useState(false);
 
 
 
  const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
  };
 
  const handleCheckboxChange = (checked) => {
    setCheckedItems(checked);
  };
 
  const handleAccordion = (flagId) => {
    if (openAccordion === flagId) {
      setOpenAccordion(null);
      setCheckedItems(false);
    } else {
      setOpenAccordion(flagId);
      setCheckedItems(false);
    }
  };
 
 
  return (
    <div className="relative">
      <div
        onClick={toggleDrawer}
        className="cursor-pointer flex w-full gap-1 self-end sm:self-auto justify-end items-center"
      >
        <FaRegFlag /> Report
      </div>
      <div
        className={`fixed top-0 right-0 h-full overflow-y-scroll scrollbar-hide w-11/12 md:w-10/12 lg:w-5/12 2xl:w-4/12 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="cursor-pointer absolute top-8 right-4 text-gray-600 hover:text-gray-800"
          onClick={toggleDrawer}
        >
          <IoClose className="text-2xl" />
        </button>
 
        <div className="p-6 h-full flex flex-col">
          <h2 className="subheading text-black font-semibold pb-4 text-start">
            Reason for Flagging
          </h2>
          <div className="pt-8 space-y-8">
            {flaggingReasons.map((reason) => (
              <div key={reason?.flagId}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleAccordion(reason?.flagId)}
                >
                  <p className="regular font-semibold word-break">
                    {reason?.title}
                  </p>
                  {openAccordion === reason?.flagId ? (
                    <IoIosArrowUp size={22} />
                  ) : (
                    <IoIosArrowDown size={22} />
                  )}
                </div>
                {openAccordion === reason?.flagId && (
                  <div className="bg-[#F5F5F7] my-2 p-2 md:p-4 rounded-xl">
                    <p className="regular font-bold text-start">
                      {reason?.question}
                    </p>
                    <p className="regular text_black font-light py-3 md:py-5 text-start">
                      {reason?.description}
                    </p>
                    <p className="regular flex items-center justify-between">
                      <span className="text_secondary">
                        {reason?.confirmationText}
                      </span>
                      <span>
                        <CustomCheckbox
                          checked={checkedItems}
                          onChange={handleCheckboxChange}
                        />
                      </span>
                    </p>
 
                    {checkedItems && (
                      <div className="pt-5 md:pt-6 xl:pt-8 flex items-center justify-center gap-x-2 xl:gap-3">
                        <button className="w-full sm:w-4/12 text-center border border-1 border-[#009f7d] bg_secondary text_white py-2 rounded-full cursor-pointer">
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-[#0000008c] z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};
 
export default FlaggingReason;