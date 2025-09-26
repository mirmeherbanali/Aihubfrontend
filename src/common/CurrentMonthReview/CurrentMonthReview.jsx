import React from "react";
import Arrow from "@/assets/images/Dashboard/arrow.png";
import downArrow from "@/assets/images/Dashboard/downarrow.png";
import Image from "next/image";

const CurrentMonthReview = ({ monthReview }) => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex-1 flex flex-col">
          <h3 className="text_primary subheading py-3 md:py-5">
            Current month's reviews
          </h3>
          <div className="bg-white p-3 md:p-6 rounded-xl shadow-sm flex flex-col sm:h-full">
            <p>How many users have left feedback on  your profile?</p>
            <div className="flex items-center gap-3">
              <h2 className=" text-[20px] xl:text-[42px] font-[700]">
                {monthReview[0]?.viewer}
              </h2>
              <span className="flex items-center text_primary content1 py-1">
                <Image className="w-[20px]" alt="Arrow_img" src={Arrow} />
                <span className="ml-2">{monthReview[0]?.betweenViewer} Viewer</span>
              </span>
            </div>
            <div className="mt-auto  text-center md:text-start">
              <p>Since {monthReview[0]?.date}, you've received</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text_primary subheading py-3 md:py-5">
            Positive & negative this month
          </h3>
          <div className="bg-white  p-3 md:p-6 rounded-xl shadow-sm flex flex-col h-full">
            <p>How many users left positive or negative feedback?</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <h2 className="text-[20px] xl:text-[32px] font-bold">
                  {monthReview[1]?.positive}
                </h2>
                <span className="text-sm  flex items-center">
                  <Image
                    src={Arrow}
                    alt="Positive arrow"
                    width={20}
                    height={20}
                  />
                  <span className="ml-2 text_primary">
                    {monthReview[1]?.betweenPostive}
                  </span>
                  (Positive)
                </span>
              </div>
              <span className="text-xl font-bold text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <h2 className="text-[18px] md:text-[20px] xl:text-[32px]  font-bold">
                  {monthReview[1]?.negative}
                </h2>
                <span className="text-sm  flex items-center">
                  <Image
                    src={downArrow}
                    alt="Negative arrow"
                    width={20}
                    height={20}
                  />
                  <span className="ml-2 text_red">{monthReview[1]?.betweenNegative}</span>
                  (Negative)
                </span>
              </div>
            </div>
            <div className="mt-3 md:mt-auto text-center md:text-start">
              <p>Since {monthReview[1]?.date}, you’ve received</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentMonthReview;