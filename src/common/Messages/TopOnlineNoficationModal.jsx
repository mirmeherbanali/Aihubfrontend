import React from "react";
import Image from "next/image";
import NotificationUserProfile from "@/assets/images/DC_Guest_User/DiscoverCompanies/image-1.png";

const TopOnlineNoficationModal = ({ newNotifications }) => {

  return (
    <div className="notification-modal-wrapper-online absolute top-12 -left-[215px] z-100">
      <div className="relative max-w-md bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] p-1 lg:p-2 rounded-lg">
        <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 w-[20px] h-[25px] overflow-hidden">
        </div>
        <div className="flex items-center gap-x-2">
          <div className="w-8 h-8 rounded-md">
            <Image
              src={newNotifications?.data?.senderPic || NotificationUserProfile}
              alt="User profile"
              width={100}
              height={100}
              className="w-full h-full object-fill rounded-md"
              title="User profile"
            />
          </div>
          <h5 className="regular font-semibold truncate max-w-[calc(100%-48px)]">
            {newNotifications?.title} :{" "}
            <span className="font-normal text_secondary truncate">
              {newNotifications?.body}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default TopOnlineNoficationModal;
