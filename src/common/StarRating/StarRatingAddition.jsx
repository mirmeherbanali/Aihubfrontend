"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { PiLineVertical } from "react-icons/pi";
const StarRatingAddition = ({ rating, setRating, totalStars = 5, name }) => {
  const [hoverValue, setHoverValue] = useState(null);

  const ratingLabels = [
    { value: 1, label: "Worst", color: "#DF0000" },
    { value: 2, label: "Fair", color: "#DFC100" },
    { value: 3, label: "Average", color: "#CA8200" },
    { value: 4, label: "Good", color: "#73CF11" },
    { value: 5, label: "Excellent", color: "#035140" },
  ];
  
  const getCurrentLabel = (value) => {
    return (
      ratingLabels.find((item) => item.value === value) || {
        label: "",
        color: "#000000",
      }
    );
  };

  const currentValue = hoverValue !== null ? hoverValue : rating;
  const { label: currentLabel, color: currentColor } =
    getCurrentLabel(currentValue);

  return (
    <div className="flex items-center gap-2 ">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalStars }, (_, index) => {
          const value = index + 1;
          const isFilled = value <= currentValue;
          const starColor = isFilled ? currentColor : "#C9CFCD";
          return (
            <label
              key={index}
              onMouseEnter={() => setHoverValue(value)}
              onMouseLeave={() => setHoverValue(null)}
            >
              <input
                type="radio"
                name={name}
                value={value}
                onChange={() => setRating(value)}
                className="hidden"
              />
              {isFilled ? (
                <FaStar
                  style={{ color: starColor }}
                  className=" cursor-pointer"
                  size={22}
                />
              ) : (
                <FaStar
                  style={{ color: starColor }}
                  className=" cursor-pointer"
                  size={22}
                />
              )}
            </label>
          );
        })}
      </div>
      {currentValue > 0 && (
        <PiLineVertical size={20} className="text-[#C9CFCD]" />
      )}
      {currentValue > 0 && (
        <span style={{ color: currentColor }} className="text-sm font-semibold">
          {currentLabel}
        </span>
      )}
    </div>
  );
};

export default StarRatingAddition;
