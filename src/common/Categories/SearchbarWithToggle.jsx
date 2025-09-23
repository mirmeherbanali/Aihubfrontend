'use client'
import { IoSearchOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState } from 'react';
import { VscSettings } from "react-icons/vsc";
import { AnimatePresence } from 'framer-motion';
import ModalContent from "./modalcontent";

const SearchbarWithToggle = ({ activeTab, setActiveTab, handleSelectedTab }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const ToggleButtonValues = [
        { id: 'Business', label: 'Business' },
        { id: 'Individual', label: 'Individual' }
    ];

    const categoryArr = ['System Software', 'Software-as-service', 'Managed Services', 'IT Consulting', 'System Integration', 'Infrastructure-as-a-service', 'Platform-as-a-service', 'Hybrid and Multi-cloud solutions', 'Network Security']

    return (<section className="bg_primary rounded-2xl py-3 px-4 my-2 shadow-md">
        <div className="flex flex-col xl:flex-row gap-4 items-center justify-center lg:justify-between">
            <h2 className="text_white font-bold subheading text-center flex-shrink-0">Information Technology</h2>
            <div className="flex items-center justify-center lg:justify-between w-full gap-4">
                <div className="relative w-full max-w-md lg:max-w-xl">
                    <input type='text' placeholder='Search By Categories, Postcode, etc' className="bg_white pl-10 p-2 rounded-full w-full" />
                    <IoSearchOutline className="absolute top-1/2 left-4 transform -translate-y-1/2 " />
                </div>
                <div className={`hidden lg:block bg_white rounded-full p-1`}>
                    <div className="w-full overflow-x-auto scrollbar-hide rounded-full">
                        <div className="inline-flex space-x-2 md:space-x-3 bg-white rounded-full p-1">
                            {ToggleButtonValues?.map((tab, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleSelectedTab(tab.id)}
                                    className={`relative z-10 px-4 md:px-8 py-1 rounded-full whitespace-nowrap md:text-[17px] font-medium transition-colors duration-300 cursor-pointer ${activeTab === tab.id ? "text-white" : "text-[#035140]"}`}>
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTabBackground"
                                            className="absolute inset-0 bg-[#009F7D] rounded-full z-[-1]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="block lg:hidden" onClick={() => { setIsModalOpen(true) }}>
                    <VscSettings className="p-2 text_primary bg_white rounded-full" size={40} />
                </div>
                <AnimatePresence>
                    {isModalOpen && (
                        <ModalContent onClose={() => setIsModalOpen(false)} categoryList={categoryArr} ToggleButtonValues={ToggleButtonValues} activeTab={activeTab} setActiveTab={setActiveTab} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    </section>)
}
export default SearchbarWithToggle;