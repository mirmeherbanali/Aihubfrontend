"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";

const AccordionSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  const handleToggleAccordion = () => setOpen(!open);

  return (
    <div>
      <button
        className="w-full flex justify-between items-center text-left py-2 fw-[600]"
        onClick={handleToggleAccordion}
      >
        {title} {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && (
        <div className="bg-gray-100 p-3 rounded-md space-y-2">{children}</div>
      )}
    </div>
  );
};

const Filter = ({ filterData, handleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4));
  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  });

  const ratings = [1, 2, 3, 4, 5];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const [filterState, setFilterState] = useState({
    paymentRatings: [],
    communicationRatings: [],
    solutionRatings: [],
    isFlagged: null,
    hasReply: null,
    dateFrom: null,
    dateTo: null,
  });

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const handleClearFilters = () => {
    setFilterState({
      paymentRatings: [],
      communicationRatings: [],
      solutionRatings: [],
      isFlagged: null,
      hasReply: null,
      dateFrom: null,
      dateTo: null,
    });
    setSelectedRange({ from: null, to: null });
  };

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1));

  const handleDayClick = (day) => {
    const clickedDate = new Date(year, month, day);

    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      setSelectedRange({ from: clickedDate, to: null });
      setFilterState((prev) => ({
        ...prev,
        dateFrom: clickedDate,
        dateTo: null,
      }));
    } else if (clickedDate < selectedRange.from) {
      setSelectedRange({ from: clickedDate, to: null });
      setFilterState((prev) => ({
        ...prev,
        dateFrom: clickedDate,
        dateTo: null,
      }));
    } else {
      setSelectedRange({ from: selectedRange.from, to: clickedDate });
      setFilterState((prev) => ({
        ...prev,
        dateFrom: selectedRange.from,
        dateTo: clickedDate,
      }));
    }
  };

  const handleRatingChange = (e, star) => {
    const name = e.target.name;
    const updated = e.target.checked
      ? [...filterState[name], star]
      : filterState[name].filter((s) => s !== star);
    setFilterState((prev) => ({ ...prev, [name]: updated }));
  };

  const handleRadioChange = (key, value) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    handleFilter(filterState);
    toggleDrawer();
  };

  const renderRatingCheckboxes = (name) =>
    ratings.map((star) => (
      <label key={star} className="flex items-center gap-2 content1 fw-[400]">
        <span
          style={{
            color: ["#dc2626", "#f59e0b", "#d97706", "#22c55e", "#0f766e"][
              star - 1
            ],
          }}
        >
          ★
        </span>
        {star} Star{star > 1 && "s"}
        <input
          type="checkbox"
          className="ml-auto accent-green-500"
          name={name}
          checked={filterState[name].includes(star)}
          onChange={(e) => handleRatingChange(e, star)}
        />
      </label>
    ));

  const renderCalendar = () => (
    <div className="p-2 rounded-lg bg-white md:w-[270px]">
      <div className="flex justify-between items-center mb-3">
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={handlePrevMonth}
        >
          <FiChevronLeft />
        </button>
        <span className="text-sm font-semibold">
          {monthNames[month]} {year}
        </span>
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={handleNextMonth}
        >
          <FiChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-sm">
        {Array.from({ length: firstDay + daysInMonth }, (_, i) => {
          const day = i >= firstDay ? i - firstDay + 1 : null;
          const dateObj = day ? new Date(year, month, day) : null;

          const isSelected =
            selectedRange.from &&
            selectedRange.to &&
            dateObj &&
            dateObj >= selectedRange.from &&
            dateObj <= selectedRange.to;

          const isStart =
            selectedRange.from &&
            dateObj &&
            dateObj.toDateString() === selectedRange.from.toDateString();

          const isEnd =
            selectedRange.to &&
            dateObj &&
            dateObj.toDateString() === selectedRange.to.toDateString();

          return (
            <div
              key={i}
              onClick={() => day && handleDayClick(day)}
              className={`text-center py-1 rounded-full cursor-pointer transition-colors
              ${isStart || isEnd ? "bg-[#004B3D] text-white" : ""}
              ${isSelected && !isStart && !isEnd ? "bg-green-100" : ""}
              ${!day ? "" : "hover:bg-gray-100"}`}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className="text-center">
        <button
          className="h-10 w-10 md:h-fit md:w-fit flex items-center justify-center gap-2 text-white bg_secondary rounded-full md:px-4 md:py-1"
          onClick={toggleDrawer}
        >
          <span className="hidden md:inline">Filters</span>
          <VscSettings className="text-xl rounded-full" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ stiffness: 300, damping: 40 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0" onClick={toggleDrawer} />
            <div className="absolute md:right-0 md:top-0 h-3/5 md:h-full bottom-0 right-0 md:w-80 w-full bg-white p-4 flex flex-col rounded-l-3xl shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h5 className="heading fw-[600]">Filters</h5>
                <button onClick={toggleDrawer} className="text-xl cursor-pointer">
                  <FiX />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
                {filterData === "posted" ? (
                  <>
                    <AccordionSection title="Payment Rating">
                      {renderRatingCheckboxes("paymentRatings")}
                    </AccordionSection>
                    <AccordionSection title="Communication Rating">
                      {renderRatingCheckboxes("communicationRatings")}
                    </AccordionSection>
                    <AccordionSection title="Solution & Resolution Ratings">
                      {renderRatingCheckboxes("solutionRatings")}
                    </AccordionSection>
                  </>
                ) : (
                  <AccordionSection title="Star Ratings">
                    {ratings.map((star) => (
                      <label
                        key={star}
                        className="flex items-center gap-2 content1 fw-[400]"
                      >
                        <span
                          style={{
                            color: [
                              "#dc2626",
                              "#f59e0b",
                              "#d97706",
                              "#22c55e",
                              "#0f766e",
                            ][star - 1],
                          }}
                        >
                          ★
                        </span>
                        {star} Star{star > 1 && "s"}
                        <input
                          type="checkbox"
                          className="ml-auto accent-green-500"
                        />
                      </label>
                    ))}
                  </AccordionSection>
                )}

                <AccordionSection title="Flagged">
                  {["Reviews flagged", "Reviews not flagged", "All"].map(
                    (label, idx) => {
                      const values = [true, false, null];
                      return (
                        <label
                          key={label}
                          className="flex justify-between content1 fw-[400]"
                        >
                          {label}
                          <input
                            type="radio"
                            name="flagged"
                            className="accent-green-500"
                            checked={filterState.isFlagged === values[idx]}
                            onChange={() =>
                              handleRadioChange("isFlagged", values[idx])
                            }
                          />
                        </label>
                      );
                    }
                  )}
                </AccordionSection>

                <AccordionSection title="Reply">
                  {[
                    "Reviews with a reply",
                    "Reviews without a reply",
                    "All",
                  ].map((label, idx) => {
                    const values = [true, false, null];
                    return (
                      <label
                        key={label}
                        className="flex justify-between content1 fw-[400]"
                      >
                        {label}
                        <input
                          type="radio"
                          name="hasReply"
                          className="accent-green-500"
                          checked={filterState.hasReply === values[idx]}
                          onChange={() =>
                            handleRadioChange("hasReply", values[idx])
                          }
                        />
                      </label>
                    );
                  })}
                </AccordionSection>

                <AccordionSection title="Date">
                  {renderCalendar()}
                </AccordionSection>
              </div>

              <div className="mt-4 flex justify-between gap-2">
                <button
                  className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm cursor-pointer"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
                <button
                  className="bg-[#05a081] text-white px-3 py-2 rounded-full text-sm cursor-pointer"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Filter;
