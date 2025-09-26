"use client";
import React from "react";
import { GoChevronRight } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
const MobileRecieveRequest = ({
  userList,
  selectedUser,
  handleOpenDetails,
  handleCloseDetails,
}) => {
  return (
    <>
      <div className="block lg:hidden mx-auto bg-white rounded-lg shadow-sm mt-4 p-4">
        <div className="overflow-y-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="md:p-3 text-start content text_black uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="hidden sm:block md:p-3 text-center content text_black uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userList?.map((user, index) => (
                <tr key={index}>
                  <td className="py-4 whitespace-nowrap regular font-medium text_secondary">
                    {user.email}
                  </td>
                  <td className="hidden sm:block whitespace-nowrap regular text_black text-center">
                    {user.status}
                  </td>
                  <td className="regular">
                    <GoChevronRight
                      className="text-xl cursor-pointer"
                      onClick={() => handleOpenDetails(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full sm:max-w-lg  mx-auto pb-10 fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg p-4 z-50 max-h-[80vh] overflow-y-auto"
          >
            <hr
              className="border border-[#035140]/[0.3] border-3 rounded-full w-16 mx-auto mb-4 cursor-pointer"
              onClick={handleCloseDetails}
            />
            <h4 className="subheading font-medium text-center text_primary">
              Request Details
            </h4>
            <div className="py-3">
              <hr className="border-gray-200 border-1" />
            </div>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-row items-center justify-between sm:justify-around">
                <p className="regular">Email</p>
                <p className="regular">{selectedUser.email}</p>
              </div>
              <div className="flex flex-row items-center justify-between sm:justify-around">
                <p className="regular">Status</p>
                <p className="regular">{selectedUser.status}</p>
              </div>
              <div className="flex flex-row items-center justify-between sm:justify-around">
                <p className="regular">Created</p>
                <p className="regular">{selectedUser.created}</p>
              </div>
              <div className="flex flex-row items-center justify-between sm:justify-around">
                <p className="regular">Action</p>
                <p className="regular">
                  {selectedUser.status === "In progress" ? (
                    <button
                      onClick={() => handleSubmitRequest()}
                      className="cursor-pointer bg_secondary text-white px-2 py-1 rounded-full regular hover:bg-teal-600"
                    >
                      Submit Request
                    </button>
                  ) : (
                    <span className="text_secondary">Submitted</span>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileRecieveRequest;
