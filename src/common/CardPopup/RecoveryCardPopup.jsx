'use client';

import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from "react";
import { FaX } from "react-icons/fa6";


const RecoveryCardPopup = ({ setIsOpenSuccess, initalHeading, successHeading, message, successMessage, button, successButton, onActivationClick }) => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleActivate = () => {
        setIsSuccess(true);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-center text-xl text_primary font-semibold">
                <h5>
                    {isSuccess ? successHeading : initalHeading}
                </h5>
            </div>
            <FaX size={16} onClick={() => setIsOpenSuccess(false)} className="absolute top-3 right-3 cursor-pointer" />

            <AnimatePresence>
                {!isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                    >
                        <p>{message}</p>
                        <div className="w-full flex justify-center space-x-5">
                            <button
                                className="mt-3 w-[70%] bg-[#009F7D] text-white py-2 rounded-full"
                                onClick={handleActivate}
                            >
                                {button}
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
                        <p>{successMessage}</p>
                        <div className="w-full flex justify-center space-x-5">
                            <button
                                className="mt-3 w-[70%] bg-[#009F7D] text-white py-2 rounded-full cursor-pointer"
                                onClick={onActivationClick}
                            >
                                {successButton}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default RecoveryCardPopup;