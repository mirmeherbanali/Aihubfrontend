"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/common/FormatDate/FrormateDate";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
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
import { MdOutlineLogin, MdLogout, MdOutlineReport } from "react-icons/md";
import ActivityLogFilter from "../Filterbar/ActivityLogFilter";

const ActivityLogDetails = ({ logDetail }) => {
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
  }, [logDetail]);

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-between pb-5 lg:pb-7 2xl:pb-10">
        <h1 className="text_primary subheading">Activity Log Details</h1>
        <ActivityLogFilter />
      </div>
      <AnimatePresence>
        <div
          ref={logContainerRef}
          className=" p-5 bg-white shadow-sm rounded-2xl overflow-y-auto h-[calc(100vh-200px)] scrollbar-hide relative"
        >
          {showScrollArrow && (
            <div
              onClick={handleScrolling}
              className="fixed bottom-24 right-14 bg-[#00856f] rounded-full p-2 cursor-pointer hover:bg-[#006d5a] transition-colors z-10"
            >
              <MdKeyboardDoubleArrowDown size={20} className="text-white" />
            </div>
          )}
          {logDetail && logDetail?.length > 0 ? (
            [...logDetail]?.map((log, index, reversedLogs) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.3 }}
                key={log?._id}
                className="flex items-center gap-3 p-5 rounded-lg transition-colors"
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
                    <span className="absolute -bottom-16 left-1/2 h-16 border-l border-gray-300"></span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <p className="font-semibold text-[17px] text_black">
                    {log?.logName} {" - "}
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
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ActivityLogDetails;
