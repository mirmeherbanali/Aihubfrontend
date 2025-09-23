"use client";
import { MdKeyboardArrowRight } from "react-icons/md";
import StarRating from "@/common/StarRating/StarRating";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewReportDetails from "./ReviewReportDetails";
import { useRouter } from "next/navigation";

const Table = ({ url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const reviewData = [
    {
      status: "Report Closed(review removed offline)",
      flaggedDate: "20/04/2025",
      rating: 4,
      reason: "Review Includes defamatory Statements",
      flaggedBy: "john doe",
    },
    {
      status: "Report Closed(review removed offline)",
      flaggedDate: "04/05/2025",
      rating: 3,
      reason: "Review Includes defamatory Statements",
      flaggedBy: "Alan Parker",
    },
    {
      status: "Report Closed(review removed offline)",
      flaggedDate: "01/05/2025",
      rating: 5,
      reason: "Review Includes defamatory Statements",
      flaggedBy: "Michael Adams",
    },
    {
      status: "Investigation Report",
      flaggedDate: "28/04/2025",
      rating: 2,
      reason: "Review Includes defamatory Statements",
      flaggedBy: "Dianne Russell",
    },
  ];

  return (
    <>
      <h2 className="heading block lg:hidden text-[#035140] font-bold mt-8">
        Flagged Review Reports
      </h2>
      <div className="bg_white rounded-xl w-full p-4 mt-4 lg:mt-8">
        <table className="py-4 tableSpacing content1">
          <thead className="text-left">
            <tr>
              <th>Status</th>
              <th className="hidden lg:table-cell">Date Flagged</th>
              <th>Star Rating</th>
              <th className="hidden lg:table-cell">Reason</th>
              <th className="hidden lg:table-cell">Flagged By</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-left">
            {reviewData?.map((review, index) => {
              return (
                <tr key={index}>
                  <td>{review.status}</td>
                  <td className="hidden lg:table-cell">{review.flaggedDate}</td>
                  <td>
                    <StarRating rating={review.rating} totalStars={5} />
                  </td>
                  <td className="hidden lg:table-cell">{review.reason}</td>
                  <td className="hidden lg:table-cell capitalize">
                    {review.flaggedBy}
                  </td>
                  <td>
                    <MdKeyboardArrowRight
                      className="bg_background rounded-full cursor-pointer"
                      size={25}
                      onClick={() => {
                        if (typeof url === "string" && url.startsWith("/")) {
                          router.push(url);
                        } else {
                          console.error("Invalid or missing URL:", url);
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ReviewReportDetails onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Table;
