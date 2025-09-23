'use client';

import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from "react";
import { FaX } from "react-icons/fa6";


const ApprovedCardPopup = ({ setIsOpenSuccess, handleReviewStatus }) => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleConfirm = () => {
        setIsSuccess(true);
        handleReviewStatus("approved");
    };

    const handleCancel = () => {
        setIsOpenSuccess(false);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between text-xl font-semibold text-gray-700">
                <h5>
                    {isSuccess ? "Review Approved!" : "Confirm approval of this Review?"}
                </h5>
                <FaX size={16} onClick={() => setIsOpenSuccess(false)} className="cursor-pointer" />
            </div>

            <AnimatePresence>
                {!isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                    >
                        <p>Are you sure? Want to approve this review? Once approved, it will be published.</p>
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
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
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
        </div>
    )
}

export default ApprovedCardPopup;