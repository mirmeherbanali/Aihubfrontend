"use client";
import { setActiveTab } from "@/store/slices/toggle.slice";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const ToggleButton = ({ setGetTab }) => {
  const { activeTab, tabs } = useSelector((state) => state.toggleTabs);
  const dispatch = useDispatch();

  const handleSettab = (tab) => {
    dispatch(setActiveTab(tab));
    setGetTab(tab);
  }

  return (
    <div className="w-full lg:w-[500px] xl:w-full overflow-x-auto scrollbar-hide rounded-full">
      <div className="inline-flex space-x-2 md:space-x-3 bg-white rounded-full p-1">
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSettab(tab)}
            className={`relative z-10 px-4 md:px-8 py-1 rounded-full whitespace-nowrap md:text-[17px] font-medium transition-colors duration-300 cursor-pointer ${(tabs.includes(activeTab) ? activeTab : tabs[0]) === tab ? "text-white" : "text-[#035140]"
              }`}
          >
            {tab}
            {(tabs.includes(activeTab) ? activeTab : tabs[0]) === tab && (
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
  );
};

export default ToggleButton;
