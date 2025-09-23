"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGlobe } from "react-icons/fa6";
import { formatDate } from "@/common/FormatDate/FrormateDate";
import Avatar from "@/assets/images/DC_Guest_User/HonestReviews/Avatar.png";

const BusinessReviewCard = ({
  allReviews,
  userType,
  reviewPageUrl,
  handleViewReviewDetails,
  handleViewReviewForDetails,
}) => {
  return (
    <div className="md:mb-0  rounded-lg cursor-pointer">
      {allReviews &&
        allReviews?.map((review, index) => (
          <div key={index}
            className={`${review?.adminSeen ? "bg-white" : "bg-[#E6EEEC]"} w-full flex border-b border-gray-200 p-4`}
            onClick={(e) => handleViewReviewDetails(e, review?._id)}
          >
            <div className=" w-full flex items-center gap-4 mb-0">
              <Link
                href={reviewPageUrl}
                className="hidden md:block"
                onClick={() => handleViewReviewForDetails(review?.postedFor?._id)}
              >
                <Image
                  src={review?.profileImg || Avatar}
                  alt="User"
                  width={150}
                  height={150}
                  className="rounded-md object-cover w-16 h-16"
                />
              </Link>
              <div>
                <Link
                  href={reviewPageUrl}
                  className="font-bold text-black md:text-xl"
                  onClick={() => handleViewReviewForDetails(review?.postedFor?._id)}
                >
                  {review?.postedFor?.name || `${review?.postedFor?.firstName} ${review?.postedFor?.lastName}`}
                </Link>
                <span>
                  <span className="hidden md:flex items-center gap-x-1 font-semibold text_black mt-2 text-sm">
                    <FaGlobe size={17} />
                    {review?.postedFor?.domain || review?.postedFor?.email}
                  </span>
                  <span
                    className={`block md:hidden text-center rounded-full cursor-pointer
                  ${review.status === "flagged" && "text_red"} || 
                  ${review.status === "rejected" && "text_red"} ||
                  ${review.status === "approved" && "text_primary"} ||
                  ${review.status === "pending" && "text_yellow"} ||
                  `}
                  >
                    {review.status}
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full hidden md:flex flex-col items-end gap-3">
              <div className="flex flex-col items-end">
                {review.status === "approved" && (
                  <span className="font-semibold">
                    Approved Date:{" "}
                    <span className="font-light">
                      {formatDate(review.approvedAt)}
                    </span>
                  </span>
                )}
                {review.status === "rejected" && (
                  <span className="font-semibold">
                    Rejected Date:{" "}
                    <span className="font-light">
                      {formatDate(review.rejectedAt)}
                    </span>
                  </span>
                )}
                {review.status === "flagged" && (
                  <span className="font-semibold">
                    Flagged Date:{" "}
                    <span className="font-light">
                      {formatDate(review.flaggedAt)}
                    </span>
                  </span>
                )}
                {review.status === "pending" && (
                  <span className="font-semibold">
                    Posted Date:{" "}
                    <span className="font-light">
                      {formatDate(review.createdAt)}
                    </span>
                  </span>
                )}
                <span
                  className={`text-center rounded-full cursor-pointer mt-3 text-lg
                  ${review.status === "flagged" && "text_red"} || 
                  ${review.status === "rejected" && "text_red"} ||
                  ${review.status === "approved" && "text_primary"} ||
                  ${review.status === "pending" && "text_yellow"} ||
                  `}
                >
                  {review.status}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BusinessReviewCard;
