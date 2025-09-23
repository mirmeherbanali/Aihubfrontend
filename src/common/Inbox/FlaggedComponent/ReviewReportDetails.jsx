import { motion } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";
import flaggedstyle from "./flagged.module.scss";

const ReviewReportDetails = ({ onClose }) => {
  return (
    <>
      <section>
        <motion.div
          className={flaggedstyle.backdrop} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={flaggedstyle.modalcontent}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2 bg_white">
              <div className="border-t-2 w-[50px] text-center text_black mx-auto"></div>
              <div className="flex justify-end">
                <IoCloseCircle size={20} onClick={onClose} />
              </div>
              <div className="bg_white py-4 my-2">
                <h2 className="heading text-[#035140] font-bold px-2">
                  Flagged Review Reports
                </h2>
                <p className="border-b border-gray-300 mt-2"></p>
                <div>
                  <table className="mobile-flagged-review">
                    <tbody>
                      <tr>
                        <td>Status</td>
                        <td>Report Closed (review Removed Offline)</td>
                      </tr>
                      <tr>
                        <td>Last Update</td>
                        <td>29/04/2025</td>
                      </tr>
                      <tr>
                        <td>Date Flagged</td>
                        <td>20/04/2025</td>
                      </tr>
                      <tr>
                        <td>Star Rating</td>
                        <td>20/04/2025</td>
                      </tr>
                      <tr>
                        <td>Reason</td>
                        <td>The Review Includes defamatory Statements</td>
                      </tr>
                      <tr>
                        <td>Flagged By</td>
                        <td>John Doe</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default ReviewReportDetails;
