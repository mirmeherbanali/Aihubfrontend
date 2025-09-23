"use client";
import React, { useState, useRef } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subDays,
  addDays,
  getDay,
} from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const WeeklyCalendar = ({ today = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowPicker(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const togglePicker = () => {
    if (!showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    setShowPicker(!showPicker);
  };

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });

  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days * 7);
    setCurrentDate(newDate);
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDay = subDays(monthStart, getDay(monthStart));
  const endDay = addDays(monthEnd, 6 - getDay(monthEnd));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  return (
    <div className="relative" ref={pickerRef}>
      <div
        className="flex items-center justify-between rounded-full bg-white p-2 cursor-pointer lg:min-w-[340px]"
        onClick={togglePicker}
      >
        <button
          className="flex items-center gap-2 px-3 py-1 hover:bg-gray-200 transition-colors"
          aria-label={showPicker ? "Close calendar" : "Open calendar"}
        >
          <FaCalendarAlt className="h-5 w-5 lg:h-5 lg:w-6 text_primary" />
        </button>
        <h2 className="text-lg lg:text-xl font-semibold">
          <span className="md:hidden subheading">Weekly</span>
          <span className="hidden md:inline content1">
            Weekly ({format(weekStart, "do MMM")} - {format(weekEnd, "do MMM")})
          </span>
        </h2>
        <IoChevronDown
          className={`h-5 w-5 lg:h-6 lg:w-6 transition-transform ${showPicker ? "rotate-180" : ""
            }`}
        />
      </div>

      {showPicker && (
        <div className="fixed md:absolute inset-x-0 md:inset-x-auto border border-gray-300 md:right-0 bottom-0 md:top-full md:bottom-auto md:mt-1 lg:mt-2 w-full md:w-[275px] lg:w-[340px] z-[1000]  bg-white shadow-2xl rounded-t-3xl md:rounded-3xl">
          <div className="p-3 rounded-t-lg md:rounded-lg">
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleDateChange(-1)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Previous month"
              >
                <FiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>
              <span className="font-medium text-gray-700 text-base lg:text-lg">
                {format(currentDate, "MMMM")}
              </span>
              <button
                onClick={() => handleDateChange(1)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Next month"
              >
                <FiChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 lg:gap-2 pb-4 md:pb-0">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-center content font-medium py-1 text-sm lg:text-base"
                >
                  {day}
                </div>
              ))}

              {days.map((day, i) => (
                <div
                  key={i}
                  className={`text-center py-2 rounded-full cursor-pointer text-sm lg:text-base ${format(day, "yyyy-MM-dd") ===
                      format(currentDate, "yyyy-MM-dd")
                      ? "bg-[#004B3D] text-white"
                      : day.getMonth() === currentDate.getMonth()
                        ? "hover:bg-gray-100"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                  onClick={() => {
                    setCurrentDate(day);
                    // togglePicker();
                  }}
                >
                  {format(day, "d")}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;
