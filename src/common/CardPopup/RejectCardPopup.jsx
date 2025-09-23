"use client";

import { FaX } from "react-icons/fa6";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const RejectCardPopup = ({ setIsOpenRejected, handleReviewStatus }) => {
  const reasons = [
    "Violation of Dragon Customer Guidelines",
    "Conflict of Interest",
    "Lack of Transparency",
    "Duplication",
    "Incentivized or Paid Reviews",
    "Illegal or Fraudulent Reviews",
    "Violation of Privacy Policy",
  ];

  const [selectedReason, setSelectedReason] = useState(null);
  const [isNext, setIsNext] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelect = (reason) => setSelectedReason(reason);

  const handleConfirm = () => {
    setIsSuccess(true);
    handleReviewStatus("rejected", selectedReason);
  };

  const handleCancel = () => {
    setIsNext(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xl font-semibold text-gray-700">
        <h5>
          {isSuccess
            ? "Review Rejected Successfully!"
            : isNext
              ? "Confirm deletion of this Review?"
              : "Reason for Rejection"}
        </h5>
        <FaX
          size={16}
          onClick={() => setIsOpenRejected(false)}
          className="cursor-pointer"
        />
      </div>

      <AnimatePresence mode="wait">
        {!isNext && !isSuccess && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            <ul className="flex flex-col">
              {reasons.map((reason, index) => (
                <motion.li
                  initial={{ opacity: 0, x: 400 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  key={index}
                  className="flex justify-between items-center py-2 rounded-md transition-colors duration-200"
                >
                  <span>{reason}</span>
                  <CustomCheckbox
                    id={`reason-${index}`}
                    name="rejectionReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => handleSelect(reason)}
                  />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
        {isNext && !isSuccess && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <h5 className="font-semibold">Reason for Deleting:</h5>
            <div className="bg-gray-100 p-3 flex items-center space-x-1 rounded-md border border-gray-200 text-gray-800">
              <p className="text-gray-700">You selected:</p>
              <p className="font-medium">{selectedReason}</p>
            </div>
            <div className="w-full flex justify-end space-x-5">
              <button
                className="mt-3 w-32 border border-[#009F7D] text_secondary py-1 rounded-full"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="mt-3 w-32 bg-[#009F7D] text-white py-1 rounded-full"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center space-y-3 py-5"
          >
            <DotLottieReact
              src="https://lottie.host/93d56515-47ab-44d1-9f38-a8eb4dd80301/RB7UsomVeS.lottie"
              loop
              autoplay
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isNext && !isSuccess && (
        <div className="w-full flex justify-end">
          <motion.button
            onClick={() => setIsNext(true)}
            whileHover="hover"
            className="bg_secondary text-white w-28 py-1 rounded-full flex justify-center items-center space-x-2"
            disabled={!selectedReason}
          >
            <span>Next</span>
            <motion.span
              variants={{
                hover: { x: 5 },
                initial: { x: 0 },
              }}
              initial="initial"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaArrowRight />
            </motion.span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default RejectCardPopup;