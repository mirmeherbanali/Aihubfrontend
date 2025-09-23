"use client";

import React, { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

const ActivityLogFilter = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    loggedIn: false,
    submittedReview: false,
    flaggedReview: false,
    loggedOut: false,
    editedReview: false,
  });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCheckboxChange = (isChecked, filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: isChecked,
    }));
  };

  const filterOptions = [
    { label: "Logged In", key: "loggedIn" },

    { label: "Submitted Reviews", key: "submittedReview" },
    { label: "Flagged Reviews", key: "flaggedReview" },
    { label: "Edited Reviews", key: "editedReview" },
    { label: "Replied Reviews", key: "flaggedReview" },
    { label: "Requested Reviews", key: "editedReview" },
    { label: "Logged Out", key: "loggedOut" },
  ];

  return (
    <div className="relative ">
      <button
        className="cursor-pointer w-max flex items-center justify-center gap-2 text-white bg-[#009F7D] rounded-full px-4 py-2 transition-colors"
        onClick={toggleDrawer}
      >
        <span className="hidden md:inline">Filters</span>
        <VscSettings className="text-xl" />
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:w-1/4 2xl:w-1/5 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="cursor-pointer absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={toggleDrawer}
        >
          <IoClose className="text-2xl" />
        </button>

        <div className="p-6 h-full flex flex-col">
          <h2 className="subheading text-black font-semibold pb-4">Filters</h2>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {filterOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-center justify-between gap-3 py-4"
              >
                <p className="text-sm font-semibold capitalize">
                  {option.label}
                </p>
                <CustomCheckbox
                  id={option.key}
                  name={option.key}
                  value={option.key}
                  label={option.label}
                  checked={filters[option.key]}
                  onChange={(isChecked) =>
                    handleCheckboxChange(isChecked, option.key)
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button className="rounded-lg bg-[#009F7D] text-white text-sm font-semibold w-max px-6 py-3">
              Apply Filter
            </button>
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

export default ActivityLogFilter;
