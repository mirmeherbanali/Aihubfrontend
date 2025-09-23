import React from "react";
import Arrow from "@/assets/images/Dashboard/arrow.png";
import downArrow from "@/assets/images/Dashboard/downarrow.png";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

const OverallReview = ({ overView }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {overView?.map((items, index) => (
        <div key={index} className="p-2 md:p-4 bg-white shadow rounded">
          <ul className="flex md:block justify-between">
            <div className="flex gap-2 items-center">
              <li className="text_secondary">{items.icon}</li>
              <li className="content1">{items.name}</li>
            </div>
            <li className="md:hidden">
              <IoIosArrowForward />
            </li>
          </ul>
          <div className="flex md:flex-col items-center md:items-start justify-between">
            <div className="content flex md:justify-between gap-2 md:gap-0 items-center py-2 md:py-3 md:w-full">
              <span>{items.totelReview} Review</span>
              <span>
                {items.monthReview > 5 ? (
                  <Image
                    className="w-[20px] md:w-[35px]"
                    alt="Upward trend arrow"
                    src={Arrow}
                  />
                ) : (
                  <Image
                    className="w-[20px] md:w-[35px]"
                    alt="Downward trend arrow"
                    src={downArrow}
                  />
                )}
              </span>
              <span
                className={
                  items.monthReview > 5 ? "text_secondary" : "text_red"
                }
              >
                {items.monthReview}
              </span>
            </div>
            <p>Compared to last week</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OverallReview;
