"use client";
import { useState } from "react";
import { FaRegFlag, FaStar, FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Image from "next/image";
import User2 from "@/assets/images/DC_Guest_User/ReviewDetails/user-2.png";
import { MdAssistantNavigation, MdOutlineClose } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { formatDate } from "@/common/FormatDate/FrormateDate";
import { AnimatePresence, motion } from "framer-motion";
import FlaggingReason from "@/common/Inbox/ReviewDetailsPage/FlaggingReason";

const ReviewCard = ({ reviews }) => {
  const [show, setShow] = useState(false);
  const [heart, setHeart] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredImageView, setHoveredImageView] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleHoverImageView = (evidence) => {
    setHoveredImageView(evidence);
  };

  return (
    <div className="py-3 px-3 xl:px-0 mb-4 max-w-7xl mx-auto">
      <div className={`bg-white shadow-md rounded-2xl ${show ? "p-4" : ""}`}>
        {reviews &&
          reviews?.map((item, index) => (
            <div
              className={`flex flex-col md:flex-row gap-6 ${
                reviews.length > 1 && "border-b border-gray-200 p-6"
              }`}
              key={index}
            >
              <div className="flex flex-col md:flex-row gap-4 flex-[4] p-6">
                <div className="flex md:flex-col justify-between md:justify-start">
                  <div className="flex gap-3 mt-2">
                    <div className="flex-shrink-0">
                      <Image
                        src={item?.postedBy?.profilePic || User2}
                        alt="user-avatar"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <b className="text-[19px]">{item?.postedBy?.name}</b>
                      <p className="hidden md:block text-xs">
                        {item?.postedBy?.totalReviews} Reviews
                      </p>
                      <p className="flex items-center gap-2">
                        <MdAssistantNavigation size={19} />
                        <b className="text-gray-800 text-sm">
                          {item?.postedBy?.country}
                        </b>
                      </p>
                    </div>
                  </div>
                  <div className="md:flex gap-4 my-3 hidden">
                    <div
                      className="flex flex-wrap gap-2 group"
                      onClick={handleOpenPopup}
                    >
                      {item?.review?.evidence?.map((evidence, idx) => (
                        <Image
                          key={idx}
                          src={evidence?.evidenceFile}
                          alt={item?.postedBy?.name}
                          width={120}
                          height={120}
                          className="rounded-xl cursor-pointer h-24 w-24 object-cover"
                        />
                      ))}
                    </div>
                  </div>
                  <IoChevronDownOutline
                    onClick={() => setShow(!show)}
                    className="md:hidden"
                  />
                </div>
              </div>
              <div className="flex-[8] p-6">
                <div className="md:flex flex-col md:flex-row md:items-center justify-between gap-2 hidden">
                  <p className="text-sm font-semibold">
                    <span>Date of experience :</span>{" "}
                    {formatDate(item?.review?.dateOfExperience)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, idx) => (
                        <span
                          key={idx}
                          className="text-yellow-400 text-lg mx-1"
                        >
                          {idx < item?.review?.rateYourExperience ? (
                            <FaStar className="text-yellow-400" />
                          ) : (
                            <FaStar className="text-[#C5C6C7]" />
                          )}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm">
                      {formatDate(item?.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="mt-4">
                    <h3 className="font-semibold text-base mb-2">
                      {item?.review?.serviceProvided}
                    </h3>
                    <p>{item?.review?.comment}</p>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-700 mt-4 py-3">
                    <button
                      className="flex items-center gap-1 hover:text-black cursor-pointer"
                      onClick={() => setHeart(!heart)}
                    >
                      {heart ? (
                        <FaHeart size={18} className="text_red" />
                      ) : (
                        <FaRegHeart size={18} />
                      )}{" "}
                      Useful
                    </button>
                    <div className="flex items-center gap-1 hover:text-black cursor-pointer">
                      <FlaggingReason />
                    </div>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {isPopupOpen && (
                  <div>
                    {/* Overlay */}
                    <motion.div
                      className="fixed inset-0 bg-black/50 z-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={handleClosePopup}
                    />

                    {/* Popup content */}
                    <motion.div
                      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-7xl p-6 bg-white rounded-xl shadow-2xl max-h-[80vh] overflow-y-auto"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-800">
                            Review Images
                          </h3>
                          <MdOutlineClose
                            onClick={handleClosePopup}
                            className="cursor-pointer text-2xl text_secondary"
                          />
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="flex flex-col-reverse gap-4">
                            <div className="flex gap-3">
                              {item?.review?.evidence?.map((evidence, idx) => (
                                <motion.div
                                  onHoverStart={() => {
                                    handleHoverImageView(evidence);
                                  }}
                                  key={idx}
                                  className="h-22 w-22"
                                >
                                  <Image
                                    key={idx}
                                    src={evidence?.evidenceFile}
                                    alt={item?.postedBy?.name}
                                    width={120}
                                    height={120}
                                    className="rounded-xl object-cover w-full h-full cursor-pointer hover:border-2 hover:border-[#009f7d] transition"
                                  />
                                </motion.div>
                              ))}
                            </div>
                            <div>
                              {hoveredImageView && (
                                <div>
                                  <Image
                                    src={hoveredImageView?.evidenceFile}
                                    alt={item?.postedBy?.name}
                                    width={600}
                                    height={600}
                                    className="rounded-xl object-cover w-full h-full cursor-pointer"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="w-[950px] h-[40rem] hidden md:block">
                            <Image
                              src={item?.postedBy?.profilePic || User2}
                              alt="user-avatar"
                              width={1200}
                              height={1200}
                              className="rounded-xl object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewCard;
