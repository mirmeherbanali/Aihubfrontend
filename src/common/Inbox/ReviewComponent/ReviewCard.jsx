"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { formatDate } from "@/common/FormatDate/FrormateDate";
import Avatar from "@/assets/images/DC_Guest_User/HonestReviews/Avatar.png";

const BusinessReviewCard = ({
  allReviews,
  reviewType,
  reviewPageUrl,
  handleViewReviewDetails,
  handleViewReviewForDetails,
}) => {
  return (
    <div className="md:mb-0 rounded-lg cursor-pointer">
      {allReviews &&
        allReviews?.map((review, index) => (
          <div
            key={index}
            className={`${reviewType === "inbox" &&
              (review?.receverSeen ? "bg-white" : "bg-[#E6EEEC]")
              } w-full flex border-b border-gray-200 p-4`}
            onClick={(e) => handleViewReviewDetails(e, review?._id)}
          >
            <div className="w-full flex items-center gap-4 mb-0">
              <Link
                href={reviewPageUrl}
                className="hidden md:block"
                onClick={() => handleViewReviewForDetails(review?.postedFor?._id)}
              >
                <div className="w-22 h-22">
                  <Image
                    src={review?.postedFor?.profilePic || Avatar}
                    alt="User"
                    width={150}
                    height={150}
                    className="rounded-md object-cover w-full h-full"
                  />
                </div>
              </Link>
              <div>
                <Link
                  href={reviewPageUrl}
                  className="font-bold text-black md:text-xl"
                  onClick={() => handleViewReviewForDetails(review?.postedFor?._id)}
                >
                  {review?.postedFor?.name || `${review?.postedFor?.firstName} ${review?.postedFor?.lastName}`}
                </Link>
                <p className="line-clamp-2">{review?.review?.comment}</p>
              </div>
            </div>
            <div className="w-full hidden md:flex flex-col items-end gap-3">
              <div className="w-full flex justify-end items-center gap-3">
                <div className="flex items-center md:justify-end">
                  <div className="flex justify-end">
                    {Array.from({ length: 5 }, (_, idx) => (
                      <span key={idx} className="text-yellow-400 text-lg mx-1">
                        {idx < review?.review?.rateYourExperience ? (
                          <FaStar className="text-[#CA8200] text-xl" />
                        ) : (
                          <FaStar className="text-[#C5C6C7] text-xl" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="h-5 border" />
                <p>{formatDate(review.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BusinessReviewCard;
