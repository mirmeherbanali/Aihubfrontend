"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import RejectCardPopup from "@/common/CardPopup/RejectCardPopup";
import ApprovedCardPopup from "@/common/CardPopup/ApprovedCardPopup";
import { formatDate } from "@/common/FormatDate/FrormateDate";
import Avatar from "@/assets/images/DC_Guest_User/HonestReviews/Avatar.png";
import InputReplyEvidenceUpload from "@/common/Input/InputReplyEvidenceUpload";
import { FaRegFlag } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowReturnRight, BsArrowReturnLeft } from "react-icons/bs";
import FlaggingReason from "./FlaggingReason";

const ReviewDetailsPage = ({
  handleEditReviewId,
  reviewDetails,
  userType,
  pageType,
  handleDeleteReview,
  isOpenSuccess,
  setIsOpenSuccess,
  isOpenRejected,
  setIsOpenRejected,
  handleApproveReviewStatus,
  handleFileChange,
  handleSubmitReply,
  handleChange,
  handleDeleteReviewReplay,
  handleEditReviewReplay,
  reviewType,
}) => {
  const getStarColor = (rating) => {
    if (rating === 5) return "text-green-800";
    if (rating === 4) return "text-green-500";
    if (rating === 3) return "text-yellow-600";
    if (rating === 2) return "text-orange-600";
    return "text-red-600";
  };

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 5:
        return "Excellent";
      case 4:
        return "Good";
      case 3:
        return "Average";
      case 2:
        return "Not Bad";
      case 1:
        return "Worst";
      default:
        return "";
    }
  };

  const StarRatingBlock = ({ title, rating }) => {
    const starColor = getStarColor(rating);
    const label = getRatingLabel(rating);
    return (
      <div className="flex flex-col items-center text-center min-w-[130px]">
        <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
        <div className={`flex items-center gap-1 font-medium ${starColor}`}>
          <FaStar className="text-lg" />
          <span>
            {rating} ({label})
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 h-[calc(100vh-160px)] md:h-[calc(100vh-125px)] overflow-auto scrollbar-hide bg-white rounded-lg space-y-5 md:space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-3 md:gap-0">
        <div className="flex items-center gap-4 mb-0">
          <Image
            src={
              (pageType === "inbox"
                ? reviewDetails?.postedBy?.profilePic
                : reviewDetails?.postedFor?.profilePic) || Avatar
            }
            alt="User"
            width={150}
            height={150}
            className="rounded-md object-cover w-16 h-16 md:w-24 md:h-24"
          />
          <div>
            <h4 className="font-bold text-black md:text-xl">
              {pageType === "inbox"
                ? reviewDetails?.postedBy?.name ||
                  `${reviewDetails?.postedBy?.firstName} ${reviewDetails?.postedBy?.lastName}`
                : reviewDetails?.postedFor?.name ||
                  `${reviewDetails?.postedFor?.firstName} ${reviewDetails?.postedFor?.lastName}`}
            </h4>
            <div className="flex md:flex-col text-black text-xs gap-2">
              <div className="flex items-center font-semibold">
                <div className="flex flex-col text-black text-sm gap-2 mt-2">
                  <span className="flex items-center gap-x-1 font-bold">
                    <FaLocationDot
                      size={20}
                      className="font-bold color-black"
                    />
                    {pageType === "inbox"
                      ? reviewDetails?.postedBy?.country
                      : reviewDetails?.postedFor?.country}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {reviewDetails?.totalReview} Review
                    {reviewDetails?.totalReview !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(userType === "business" || userType === "individual") && (
          <div className="flex flex-col md:items-end space-y-2">
            <p>
              Date of Experience :{" "}
              {formatDate(reviewDetails?.review?.dateOfExperience)}
            </p>
            <p className="text_secondary">
              {formatDate(reviewDetails?.createdAt)}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="subheading ">
          {reviewDetails?.review?.serviceProvided}
        </h2>
        <p>{reviewDetails?.review?.comment}</p>
      </div>

      <div className="space-y-3">
        <h2 className="subheading">Star Ratings</h2>
        <div className="my-2 p-6 bg-gray-100 rounded-xl flex justify-between items-center flex-wrap gap-4">
          {userType === "business" && (
            <>
              <StarRatingBlock
                title="Payment"
                rating={reviewDetails?.review?.payment || 3}
              />
              <StarRatingBlock
                title="Solution / Resolution"
                rating={reviewDetails?.review?.solutionResolution || 3}
              />
              <StarRatingBlock
                title="Communication"
                rating={reviewDetails?.review?.communication || 3}
              />
            </>
          )}
          <StarRatingBlock
            title="Overall Experience"
            rating={reviewDetails?.review?.rateYourExperience || 3}
          />
        </div>
      </div>

      {(reviewDetails?.reviewStatus === "Flagged" ||
        reviewDetails?.reviewStatus === "rejected") && (
        <div className="w-full md:w-fit p-6 bg-gray-100 rounded-xl ">
          <p>Reason : </p>
          <p className="text_red">
            {reviewDetails?.rejectionReason || reviewDetails?.flaggedReason}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-[20px] font-bold">
          {reviewDetails?.review?.evidence?.length} Attachments
        </h2>
        {pageType === "inbox" && <FlaggingReason />}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          {reviewDetails?.review?.evidence?.length > 0 && (
            <div className="md:w-fit flex gap-2">
              {reviewDetails?.review?.evidence?.map((img, idx) =>
                userType === "admin" || img?.evidenceType === "private" ? (
                  <Image
                    key={idx}
                    src={img?.evidenceFile}
                    alt="Review image"
                    width={50}
                    height={50}
                    className="rounded-lg object-cover w-18 h-18 flex-1"
                  />
                ) : (
                  <Image
                    key={idx}
                    src={img?.evidenceFile}
                    alt="Review image"
                    width={50}
                    height={50}
                    className="rounded-lg object-cover w-18 h-18 flex-1"
                  />
                )
              )}
            </div>
          )}

          <div>
            {reviewDetails?.postedById ===
              reviewDetails?.postedBy?.userId?.activeAccount && (
              <div className="flex w-full gap-3 self-end sm:self-auto md:justify-end">
                <button
                  onClick={() => handleEditReviewId(reviewDetails?._id)}
                  aria-label="close"
                  className="w-40 py-2 border text_red rounded-full text-sm sm:text-base cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteReview()}
                  aria-label="close"
                  className="w-40 py-2 bg_secondary text_white rounded-full text-sm sm:text-base cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}

            {reviewDetails?.reviewStatus === "rejected" && (
              <div className="space-y-2">
                <p className="bg-red-600/20 text-center rounded-full p-1 text_red">
                  Rejected by <span>{reviewDetails?.rejectedBy}</span>
                </p>
                <p>Rejected Date : {reviewDetails.rejectedAt}</p>
              </div>
            )}

            {reviewDetails?.reviewStatus === "approved" && (
              <div className="space-y-2">
                <p className="bg-green-600/20 text-center rounded-full p-1 text_primary">
                  Approved by <span>{reviewDetails.flaggedBy}</span>
                </p>
                <p>Approved Date : {reviewDetails.approvedAt}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {reviewDetails?.replies?.length > 0 &&
        reviewDetails?.replies?.map((reply, idx) => (
          <div
            className="p-4 rounded-lg shadow border border-gray-200 bg-gray-100"
            key={idx}
          >
            {reply.replierType === "business" ? (
              <>
                <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                  <span className="text-xs text-gray-500">
                    {formatDate(reply?.createdAt)}
                  </span>
                  <div className="flex items-start gap-2 mb-2 text-sm text-gray-600">
                    <span className="text-sm font-semibold text_secondary">
                      Reply from {reply?.replier?.name}
                    </span>
                    <BsArrowReturnLeft className="mt-1 text_secondary" />
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {reply?.comment}
                </p>
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
                    {reply?.evidence?.length > 0 && (
                      <div className="md:w-fit flex gap-2">
                        {reply?.evidence?.map((img, idx) =>
                          pageType === "posted" ||
                          img?.evidenceType === "private" ? (
                            <Image
                              key={idx}
                              src={img?.evidenceFile}
                              alt="Review image"
                              width={80}
                              height={80}
                              className="rounded-lg object-cover w-24 h-24 flex-1"
                            />
                          ) : (
                            <Image
                              key={idx}
                              src={img?.evidenceFile}
                              alt="Review image"
                              width={80}
                              height={80}
                              className="rounded-lg object-cover w-24 h-24 flex-1"
                            />
                          )
                        )}
                      </div>
                    )}
                    {/* Show Edit and Delete buttons if the current user is the replier */}
                    {reviewDetails.postedById === reply?.replierId &&
                      userType === reply?.replierType && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditReviewReplay(reply)}
                            className="flex items-center gap-2 text_secondary btn-border px-4 py-1.5 rounded-full text-sm hover:bg-green-50 transition cursor-pointer"
                          >
                            <BiEdit className="pseudocode text-base" />
                            Edit reply
                          </button>
                          <button
                            onClick={() => handleDeleteReviewReplay(reply?._id)}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-700 transition cursor-pointer"
                          >
                            <RiDeleteBin6Line className="text-base" />
                            Delete
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2 mb-2 text-sm text-gray-600">
                    <BsArrowReturnRight className="mt-1 text_secondary" />
                    <span className="text-sm font-semibold text_secondary">
                      Reply from {reply?.replier?.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(reply?.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {reply?.comment}
                </p>
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
                    {reply?.evidence?.length > 0 && (
                      <div className="md:w-fit flex gap-2">
                        {reply?.evidence?.map((img, idx) =>
                          userType === "admin" ||
                          img?.evidenceType === "private" ? (
                            <Image
                              key={idx}
                              src={img?.evidenceFile}
                              alt="Review image"
                              width={80}
                              height={80}
                              className="rounded-lg object-cover w-24 h-24 flex-1"
                            />
                          ) : (
                            <Image
                              key={idx}
                              src={img?.evidenceFile}
                              alt="Review image"
                              width={80}
                              height={80}
                              className="rounded-lg object-cover w-24 h-24 flex-1"
                            />
                          )
                        )}
                      </div>
                    )}
                    {/* Show Edit and Delete buttons if the current user is the replier */}
                    {reviewDetails.postedForId === reply?.replierId &&
                      userType === reply?.replierType && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditReviewReplay(reply)}
                            className="flex items-center gap-2 text_secondary btn-border px-4 py-1.5 rounded-full text-sm hover:bg-green-50 transition cursor-pointer"
                          >
                            <BiEdit className="text-base" />
                            Edit reply
                          </button>
                          <button
                            onClick={() => handleDeleteReviewReplay(reply?._id)}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-700 transition cursor-pointer"
                          >
                            <RiDeleteBin6Line className="text-base" />
                            Delete
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

      <div className="flex space-x-3 items-center">
        <InputReplyEvidenceUpload
          onChange={handleFileChange}
          onTextChange={handleChange}
          handleSubmitReply={handleSubmitReply}
        />
      </div>

      <AnimatePresence>
        {isOpenRejected && (
          <div>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl p-6 bg-white rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <RejectCardPopup setIsOpenRejected={setIsOpenRejected} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenSuccess && (
          <div>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl p-6 bg-white rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ApprovedCardPopup
                setIsOpenSuccess={setIsOpenSuccess}
                handleConfirmStatus={handleApproveReviewStatus}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewDetailsPage;
