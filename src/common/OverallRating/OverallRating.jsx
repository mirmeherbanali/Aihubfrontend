"use client"
import React from "react";
import Arrow from "@/assets/images/Dashboard/arrow.png";
import Image from "next/image";
import downArrow from "@/assets/images/Dashboard/downarrow.png";
import { getRatingLabel } from "../FormetConfig/FormetConfig";

function OverallRating({ ratingDetails }) {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 w-full py-3 md:py-0 lg:mt-5">
        <div className="flex-1 flex flex-col">
          <h3 className="text_primary subheading py-3 md:py-5 hidden md:block">
            Overall Rating
          </h3>
          <div className="bg-white p-3 md:p-6 rounded-xl shadow-sm flex md:flex-col justify-between md:justify-start items-center md:items-start">
            <div>
              <p className="md:mb-3">Overall Rating</p>
              <div>
                <div className="flex items-center md:mb-5 gap-3">
                  <h2 className=" text-[18px] lg:text-[32px] font-[600]">
                    {(ratingDetails?.rating)?.toFixed(1)}
                  </h2>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const rating = ratingDetails?.rating || 0;
                      const colorClass =
                        star <= rating
                          ? rating <= 2
                            ? "text_red"
                            : rating === 3
                              ? "text_yellow"
                              : rating === 4
                                ? "text_green"
                                : "text_purple"
                          : "text-gray-300";
                      return (
                        <span
                          key={star}
                          className={`text-2xl ${colorClass} ${star !== 4 ? "hidden md:inline" : ""}`}
                        >
                          ★
                        </span>
                      );
                    })}
                  </div>
                  <span
                    className={`content ${getRatingLabel(ratingDetails?.rating) === "Excellent"
                      ? "text_purple"
                      : getRatingLabel(ratingDetails?.rating) === "Good"
                        ? "text_green"
                        : getRatingLabel(ratingDetails?.rating) === "Average"
                          ? "text_yellow"
                          : "text_red"
                      }`}
                  >
                    {getRatingLabel(ratingDetails?.rating)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="mt-auto">
                <p>Total Reviews</p>
                <h2 className="text-[18px] lg:text-[32px] font-[600]">
                  {(Number(ratingDetails?.reviews) / 1000).toFixed(1).replace(/\.0$/, '')}k
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="subheading text_primary py-3 md:py-5 hidden md:block">
            Reach
          </h3>
          <div className="bg-white p-3 md:p-6 rounded-xl shadow-sm flex flex-col h-full">
            <p className="mb-3">
              How many users have checked out your profile?
            </p>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-[18px] lg:text-[32px] xl:text-[42px] font-[700]">
                {ratingDetails?.reach}
              </h2>
              <span className="flex items-center text_primary content1 py-1">
                <span className="mr-2">
                  {ratingDetails?.compare ?
                    <Image height={30} width={30} alt="Postive_img" src={Arrow} /> :
                    <Image
                      src={downArrow}
                      alt="Negative arrow"
                      width={30}
                      height={30}
                    />
                  }
                </span>
                {ratingDetails?.viewerNum} Viewer
              </span>
            </div>
            <div className="mt-auto hidden md:block">
              <p>Since {ratingDetails?.date}, you've received</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallRating;
