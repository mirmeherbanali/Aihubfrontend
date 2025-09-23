"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BusinessRegister from "@/assets/images/Signup/BusinessRegister.png";
import IndividualRegister from "@/assets/images/Signup/IndividualRegister.png";
import percent from "@/assets/images/Signup/percent.png";
import hand from "@/assets/images/Signup/hand.png";
import BusinessRegisterForm from "./BusinessRegisterForm";
import IndividualRegisterForm from "./IndividualRegisterForm";
import BusinessLoginForm from "./BusinessLoginForm";
import IndividualLoginForm from "./IndividualLoginForm";

export default function Register() {
  const [activeTab, setActiveTab] = useState("business");
  const [isLogin, setIsLogin] = useState(false);

  const containerVariants = {
    business: {
      flexDirection: "row",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    individual: {
      flexDirection: "row-reverse",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="bg-[#035140]">
      <motion.div
        className="flex flex-row gap-8 p-2 sm:p-5 xl:p-10 2xl:p-20 h-screen"
        variants={containerVariants}
        animate={activeTab === "business" ? "business" : "individual"}
      >
        <div className="lg:w-[50%] xl:w-[60%] hidden lg:block">
          <h1 className="text-white text-[50px] lg:text-4xl font-semibold leading-snug">
            Empower Smarter Decisions with Honest Reviews
          </h1>
          <p className="text-white text-sm mt-4">
            We are a trusted platform where professionals can share honest
            reviews about both clients and companies.
          </p>
          <div className="relative mt-10 w-full lg:max-w-[300px] xl:max-w-[400px] 2xl:max-w-[500px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full"
              >
                <Image
                  src={
                    activeTab === "business"
                      ? BusinessRegister
                      : IndividualRegister
                  }
                  alt={
                    activeTab === "business"
                      ? "Business Register"
                      : "Individual Register"
                  }
                  title="Dragon Customer"
                  layout="responsive"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
                <Image
                  src={hand}
                  alt="Hand Icon"
                  title="Hand Icon"
                  layout="responsive"
                  width={70}
                  height={70}
                  className="absolute bottom-[50px] -left-[100px] max-w-[70px]"
                />
                <Image
                  src={percent}
                  alt="Percent Icon"
                  title="Percent Icon"
                  layout="responsive"
                  width={70}
                  height={70}
                  className="absolute top-[50px] -right-[100px] max-w-[70px]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full lg:w-[50%] xl:w-[40%] bg-white rounded-[30px] p-4 lg:p-6 overflow-y-auto scrollbar-hide">
          <div className="flex space-x-3 mb-6 w-max mx-auto bg-[#E6F5F2] rounded-full p-2">
            <div className="relative flex">
              <button
                type="button"
                className={`relative z-10 px-8 py-2 rounded-full text-[17px] font-medium cursor-pointer ${activeTab === "business" ? "text-white" : "text-[#014b3b]"
                  }`}
                onClick={() => {
                  setActiveTab("business");
                  setIsLogin(false);
                }}
              >
                Business
                {activeTab === "business" && (
                  <motion.div
                    layoutId="activeButtonBackground"
                    className="absolute inset-0 bg-[#035140] rounded-full z-[-1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
              <button
                type="button"
                className={`relative z-10 px-4 py-2 rounded-full text-[17px] font-medium cursor-pointer ${activeTab === "individual" ? "text-white" : "text-[#014b3b]"
                  }`}
                onClick={() => {
                  setActiveTab("individual");
                  setIsLogin(false);
                }}
              >
                Individual
                {activeTab === "individual" && (
                  <motion.div
                    layoutId="activeButtonBackground"
                    className="absolute inset-0 bg-[#035140] rounded-full z-[-1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </div>
          </div>

          <h2 className="text-[30px] font-semibold mb-6 text-center">
            {isLogin
              ? <>Login <span className="text-[#035140]">{activeTab === "business" ? "Business" : "Individual"}</span> Account</>
              : <>Create a <span className="text-[#035140]">{activeTab === "business" ? "Business" : "Individual"}</span> account</>}
          </h2>

          <AnimatePresence mode="wait">
            {activeTab === "business" ? (
              isLogin ? (
                <motion.div
                  key="business-login"
                  variants={formVariants}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <BusinessLoginForm />
                </motion.div>
              ) : (
                <motion.div
                  key="business-register"
                  variants={formVariants}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <BusinessRegisterForm />
                </motion.div>
              )
            ) : isLogin ? (
              <motion.div
                key="individual-login"
                variants={formVariants}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <IndividualLoginForm />
              </motion.div>
            ) : (
              <motion.div
                key="individual-register"
                variants={formVariants}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <IndividualRegisterForm />
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[17px] text-center mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleLoginSignup}
              className="text-[#014b3b] underline cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Log in"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}