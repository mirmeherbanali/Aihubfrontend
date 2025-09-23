'use client';

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import RejectCardPopup from "@/common/CardPopup/RejectCardPopup";
import ApprovedCardPopup from "@/common/CardPopup/ApprovedCardPopup";
import { BsArrowReturnRight } from "react-icons/bs";
import { formatDate } from "@/common/FormatDate/FrormateDate";
import Avatar from '@/assets/images/DC_Guest_User/HonestReviews/Avatar.png';

const ReviewDetailsPage = ({ reviewType, reviewDetails, pageType, isOpenSuccess, setIsOpenSuccess, isOpenRejected, setIsOpenRejected, handleReviewStatus }) => {
    const [reply, setReply] = useState("");
    const [submittedReply, setSubmittedReply] = useState(null);

    const handlePostReply = () => {
        if (reply.trim()) {
            setSubmittedReply(reply);
        };
    };

    const getStarColor = (rating) => {
        if (rating === 5) return "text-green-800";
        if (rating === 4) return "text-green-500";
        if (rating === 3) return "text-yellow-600";
        if (rating === 2) return "text-orange-600";
        return "text-red-600";
    };

    const getRatingLabel = (rating) => {
        switch (rating) {
            case 5: return "Excellent";
            case 4: return "Good";
            case 3: return "Average";
            case 2: return "Not Bad";
            case 1: return "Worst";
            default: return "";
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
                    <span>{rating} ({label})</span>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 h-[calc(100vh-160px)] md:h-[calc(100vh-125px)] overflow-auto scrollbar-hide bg-white rounded-lg cursor-pointer space-y-5 md:space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between items-start gap-3 md:gap-0">
                <div className="flex items-center gap-4 mb-0">
                    <Image
                        src={reviewDetails?.postedFor?.profilePic || Avatar}
                        alt="User"
                        width={150}
                        height={150}
                        className="rounded-md object-cover w-16 h-16 md:w-24 md:h-24"
                    />
                    <div>
                        <h4 className="font-bold text-black md:text-xl">{reviewDetails?.postedFor?.name || `${reviewDetails?.postedFor?.firstName} ${reviewDetails?.postedFor?.lastName}`}</h4>
                        <div className="flex md:flex-col text-black text-xs gap-2">
                            <div className="flex items-center font-semibold">
                                <div className="flex flex-col text-black text-sm gap-2 mt-2">
                                    <span className="flex items-center gap-x-1 font-bold">
                                        <FaLocationDot size={20} className="font-bold color-black" />
                                        {reviewDetails?.postedFor?.country}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {reviewDetails?.totalReview} Review{reviewDetails?.totalReview !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:items-end space-y-2">
                    {reviewDetails?.status === "approved" && (
                        <p>Approved By : <span className="font-semibold">{reviewDetails?.approvedBy?.firstName + " " + reviewDetails?.approvedBy?.lastName}</span></p>
                    )}
                    {reviewDetails?.status === "rejected" && (
                        <p>Rejected By : <span className="font-semibold">{reviewDetails?.rejectedBy?.firstName + " " + reviewDetails?.rejectedBy?.lastName}</span></p>
                    )}
                    {reviewDetails?.status === "flagged" && (
                        <p>Flagged By : <span className="font-semibold">{reviewDetails.flaggedBy}</span></p>
                    )}
                    {reviewDetails?.status === "pending" && (
                        <div className="flex items-center justify-center gap-2">
                            <p>Posted By :</p>
                            <Image src={reviewDetails?.postedBy?.profilePic || Avatar} alt="User" width={60} height={60} className="rounded-md object-cover w-7 h-7 md:w-7 md:h-7" />
                            <p className="font-semibold">{reviewDetails?.postedBy?.name}</p>
                        </div>
                    )}
                    <p>Posted Date : {formatDate(reviewDetails?.createdAt)}</p>
                </div>
            </div>

            <div className="space-y-3">
                <h2 className="subheading ">{reviewDetails?.review?.serviceProvided}</h2>
                <p>{reviewDetails?.review?.comment}</p>
            </div>

            <div className="space-y-3">
                <h2 className="subheading">Star Ratings</h2>
                <div className="my-2 p-6 bg-gray-100 rounded-xl flex justify-between items-center flex-wrap gap-4">
                    {(reviewType === "business") && (
                        <>
                            <StarRatingBlock title="Payment" rating={reviewDetails?.review?.payment || 3} />
                            <StarRatingBlock title="Solution / Resolution" rating={reviewDetails?.review?.solutionResolution || 3} />
                            <StarRatingBlock title="Communication" rating={reviewDetails?.review?.communication || 3} />
                        </>
                    )}
                    <StarRatingBlock title="Overall Experience" rating={reviewDetails?.review?.rateYourExperience || 3} />
                </div>
            </div>

            {(reviewDetails?.reviewStatus === "Flagged" || reviewDetails?.reviewStatus === "rejected") && (
                <div className="w-full md:w-fit p-6 bg-gray-100 rounded-xl ">
                    <p>Reason : </p>
                    <p className="text_red">{reviewDetails?.rejectionReason || reviewDetails?.flaggedReason}</p>
                </div>
            )}

            <div className="space-y-3">
                <h2 className="subheading ">{reviewDetails?.review?.evidence?.length} Attachments</h2>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
                    {reviewDetails?.review?.evidence?.length > 0 && (
                        <div className="md:w-fit flex gap-2">
                            {reviewDetails?.review?.evidence?.map((img, idx) => (
                                <Image
                                    key={idx}
                                    src={img?.evidenceFile}
                                    alt="Review image"
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover w-24 h-24 flex-1"
                                />
                            ))}
                        </div>
                    )}

                    <div>
                        <div className="flex w-full gap-3 self-end sm:self-auto md:justify-end">
                            <button
                                aria-label="close"
                                className="w-40 py-2 border text_red rounded-full text-sm sm:text-base cursor-pointer"
                                onClick={() => setIsOpenRejected(true)}
                                disabled={reviewDetails?.status === "rejected"}
                            >
                                {reviewDetails?.status === "rejected" ? "Rejected" : "Rejecte"}
                            </button>
                            <button
                                aria-label="close"
                                className="w-40 py-2 bg_secondary text_white rounded-full text-sm sm:text-base cursor-pointer"
                                onClick={() => setIsOpenSuccess(true)}
                                disabled={reviewDetails?.status === "approved"}
                            >
                                {reviewDetails?.status === "approved" ? "Approved" : "Approve"}
                            </button>
                        </div>

                        {reviewDetails?.reviewStatus === "rejected" && (
                            <div className="space-y-2">
                                <p className="bg-red-600/20 text-center rounded-full p-1 text_red">Rejected by <span>{reviewDetails?.rejectedBy}</span></p>
                                <p>Rejected Date : {reviewDetails.rejectedAt}</p>
                            </div>
                        )}

                        {reviewDetails?.reviewStatus === "approved" && (
                            <div className="space-y-2">
                                <p className="bg-green-600/20 text-center rounded-full p-1 text_primary">Approved by <span>{reviewDetails.flaggedBy}</span></p>
                                <p>Approved Date : {reviewDetails.approvedAt}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {(pageType !== "posted") && (
                <div className="flex space-x-3 items-center">
                    {submittedReply ? (
                        <div className="w-full p-6 bg-gray-100 rounded-xl text-gray-800 font-medium space-y-4">
                            <h6 className="flex items-center gap-2 text_secondary font-semibold"><BsArrowReturnRight />Reply from "Admin Name"</h6>
                            <span>
                                {submittedReply}
                            </span>
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="reply"
                                id="reply"
                                placeholder="Reply"
                                className="w-full border border-gray-200 rounded-full py-1 px-4 outline-none"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            />
                            <button
                                className="py-1 w-40 bg_secondary text_white rounded-full"
                                onClick={handlePostReply}
                            >
                                Post Reply
                            </button>
                        </>
                    )}
                </div>
            )}

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
                            <RejectCardPopup setIsOpenRejected={setIsOpenRejected} handleReviewStatus={handleReviewStatus} />
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
                            <ApprovedCardPopup setIsOpenSuccess={setIsOpenSuccess} handleReviewStatus={handleReviewStatus} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default ReviewDetailsPage;