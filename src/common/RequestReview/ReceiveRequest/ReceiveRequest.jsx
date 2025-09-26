"use client";
import React, { useState } from "react";
import ReceivedSubmitForm from "../ReceivedSubmitForm/ReceivedSubmitForm";
import MobileRecieveRequest from "../ReceiveRequest/MobileRecieveRequest";
import { formatDate } from "@/common/FormatDate/FrormateDate";

const ReceiveRequest = ({ userType, isPopupOpen, selectedUser, handleSubmitRequest, handleClosePopup, handleOpenDetails, handleCloseDetails, userList }) => {

  return (
    <>
      <section className="overflow-y-auto relative">
        <h3 className="subheading text_primary mt-3 sm:mt-6">
          Received Request{" "}
          <span className="font-normal text_secondary">({userList && userList?.length} Found)</span>
        </h3>
        {/* Desktop View Table */}
        <div className="hidden lg:block mx-auto bg-white rounded-lg shadow-sm mt-4 p-4">
          <div className="overflow-y-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="md:p-3 text-start content text_black uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="md:p-3 text-start content text_black uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="md:p-3 text-center content text_black uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-right content text_black uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-right content text_black uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userList && userList?.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 py-5 whitespace-nowrap regular font-medium text_secondary">
                      {user?.reciverId?.name ? user.reciverId.name
                        : `${user?.reciverId?.firstName || ""} ${user?.reciverId?.lastName || ""}`}
                    </td>
                    <td className="px-4 py-5 whitespace-nowrap regular font-medium text_secondary">
                      {user?.reciverId?.email}
                    </td>
                    <td className="px-4 py-5 whitespace-nowrap regular text_black text-center">
                      {user?.reviewStatus}
                    </td>
                    <td className="px-4 py-5 whitespace-nowrap regular text_black text-right">
                      {formatDate(user?.createdAt)}
                    </td>
                    <td className="px-4 py-6 whitespace-nowrap regular text-right">
                      {user.reviewStatus === "In Progress" ? (
                        <button
                          onClick={() => handleSubmitRequest(user)}
                          className="cursor-pointer bg_secondary text-white px-3 py-2 rounded-full regular hover:bg-teal-600"
                        >
                          Submit Request
                        </button>
                      ) : (
                        <span className="text_secondary">Submitted</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <MobileRecieveRequest
          userList={userList && userList}
          selectedUser={selectedUser}
          handleOpenDetails={handleOpenDetails}
          handleCloseDetails={handleCloseDetails}
        />
        {isPopupOpen && (
          <ReceivedSubmitForm onClose={handleClosePopup} userType={userType} />
        )}
      </section>
    </>
  );
};

export default ReceiveRequest;
