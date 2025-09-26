"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  FiCheck,
  FiEdit,
  FiFlag,
  FiTrash2,
  FiPlus,
  FiActivity,
  FiUserX,
} from "react-icons/fi";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { TbGraph } from "react-icons/tb";
import { formatDate } from "@/common/FormatDate/FrormateDate";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { MdOutlineLogin, MdLogout, MdOutlineReport } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function ActivityLog({ logDetail, userType }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const logContainerRef = useRef(null);

  const getActionIcon = (logType) => {
    switch (logType) {
      case "Accepted":
        return <FaCheckCircle className="w-5 h-5" />;
      case "Active":
        return <FiActivity className="w-5 h-5" />;
      case "Created":
        return <FiCheck className="w-5 h-5" />;
      case "Updated":
        return <FiEdit className="w-5 h-5" />;
      case "Inactive":
        return <FiUserX className="w-5 h-5" />;
      case "Flagged":
        return <FiFlag className="w-5 h-5" />;
      case "Report":
        <MdOutlineReport className="w-5 h-5" />;
      case "Deleted":
        return <FiTrash2 className="w-5 h-5" />;
      case "Rejected":
        <FaRegCircleXmark className="w-5 h-5" />;
      case "Login":
        return <MdOutlineLogin className="w-5 h-5" />;
      case "Logout":
        return <MdLogout className="w-5 h-5" />;
      default:
        return <FiPlus className="w-5 h-5" />;
    }
  };

  const getActionColor = (logType) => {
    switch (logType) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Active":
        return "bg-lime-100 text-lime-900";
      case "Created":
        return "bg-emerald-100 text-emerald-900";
      case "Updated":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-amber-100 text-red-900";
      case "Flagged":
        return "bg-purple-100 text-purple-800";
      case "Report":
        return "bg-violet-100 text-violet-900";
      case "Deleted":
        return "bg-red-600 text-white";
      case "Rejected":
        return "bg-rose-100 text-rose-900";
      case "Login":
        return "bg-cyan-100 text-cyan-900";
      case "Logout":
        return "bg-teal-100 text-teal-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleScrolling = () => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTo({
        top: logContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (logContainerRef.current) {
        const { scrollHeight, clientHeight, scrollTop } =
          logContainerRef.current;

        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        setShowScrollArrow(scrollHeight > clientHeight && !isAtBottom);
      }
    };
    const container = logContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, [isOpen, logDetail]);

  const handleShowMore = () => {
    try {
      if (userType === "business") {
        router.push("/business/activity_log_details");
      } else if (userType === "individual") {
        router.push("/individual/activity_log_details");
      }
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  return (
    <div className="relative">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-x-2 cursor-pointer bg-[#00856f] w-max py-2 xl:py-3 px-5 rounded-full font-semibold text-center text-white hover:bg-[#006d5a] transition-colors"
        >
          <span>Activity Log</span>
          <TbGraph size={20} />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[380px] md:w-[450px] bg-white rounded-l-3xl shadow-xl z-[999] p-4"
            >
              <div className="flex justify-between items-center my-8">
                <h2 className="text-2xl text-black font-bold">Activity Log</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-gray-700 font-semibold hover:text-gray-900"
                >
                  ✕
                </button>
              </div>
              <div
                ref={logContainerRef}
                className="relative space-y-3 overflow-y-auto h-[calc(100vh-225px)] scrollbar-hide"
              >
                {logDetail && logDetail?.length > 0 ? (
                  [...logDetail]?.map((log, index, reversedLogs) => (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.3 }}
                      key={log?._id}
                      className="flex items-start gap-3 p-3 rounded-lg transition-colors"
                    >
                      <div className="relative">
                        <span
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActionColor(
                            log?.logType,
                            log?.logName
                          )}`}
                        >
                          {getActionIcon(log?.logType, log?.logName)}
                        </span>
                        {index !== reversedLogs?.length - 1 && (
                          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-5 border-l border-gray-300"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[17px] text-gray-900 line-clamp-1">
                          {log?.logName}
                        </p>
                        <p className="text-[14px] text-gray-500">
                          {formatDate(log?.createdAt)}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No activity logs available
                  </p>
                )}
                {showScrollArrow && (
                  <div
                    onClick={handleScrolling}
                    className="fixed bottom-32 right-5 bg-[#00856f] rounded-full p-2 cursor-pointer hover:bg-[#006d5a] transition-colors"
                  >
                    <MdKeyboardDoubleArrowDown
                      size={20}
                      className="text-white"
                    />
                  </div>
                )}
              </div>
              <div className="absolute bottom-6 text-center w-full">
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="bg-[#00856f] text-white w-max px-10 py-4 rounded-lg cursor-pointer hover:bg-[#006d5a]"
                >
                  Show More
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
