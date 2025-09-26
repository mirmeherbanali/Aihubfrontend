import React from "react";
import Image from "next/image";
import NotificationUserProfile from "@/assets/images/Common/NotificationUserProfile.png";
import { formatDate } from "@/common/FormatDate/FrormateDate";

const InboxNotification = ({ notifications, handleMarkAsRead }) => {
  return (
    <div className="h-[calc(100vh-185px)] bg-white my-4 rounded-xl overflow-scroll scrollbar-hide">
      <div className="md:mb-0 rounded-lg cursor-pointer">
        {notifications && notifications?.map((item, index) => (
          <div key={index} className={`w-full flex flex-col lg:flex-row lg:items-center gap-3 border-b border-gray-300 p-4 ${item?.read ? "" : "bg-[#E6EEEC]"}`} onClick={() => handleMarkAsRead(item)}>
            <div className="w-full flex items-center gap-4 mb-0">
              <div className="w-22 h-22 min-w-[84px]">
                <Image
                  src={item?.data?.senderPic || NotificationUserProfile}
                  alt={item?.title}
                  width={150}
                  height={150}
                  className="rounded-md object-cover w-full h-full"
                  title={item?.title}
                />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-black md:text-xl capitalize">{item?.title}</p>
                <p className="line-clamp-2 lg:line-clamp-1">
                  <span className="text_secondary">{item?.body}</span>
                </p>
              </div>
            </div>
            {/* <hr className="border-b border-text_black opacity-10" /> */}
            <p className="whitespace-nowrap min-w-fit text-[color:var(--black-50,#33333380)]">{formatDate(item?.data?.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxNotification;
