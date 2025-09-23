import React from "react";
import Image from "next/image";
import NotificationUserProfile from "@/assets/images/DC_Guest_User/DiscoverCompanies/image-1.png";
import { formatDate } from "../FormatDate/FrormateDate";
import { useRouter } from "next/navigation";
import { IoFolderOpenOutline } from "react-icons/io5";

const TopOverallNoficationModal = ({ notifications, handleMarkAsRead, notificationRedirectUrl }) => {

  const router = useRouter();

  const handleNotificationClick = () => {
    router.push(notificationRedirectUrl);
  };

  return (
    <div className="notification-modal-wrapper absolute top-14 lg:-right-10 sm:-right-5 -right-2 z-100">
      <div className="relative max-w-[300px] md:max-w-md bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] p-2 md:p-3 rounded-2xl">
        <div className="absolute top-[-25px] right-1 md:right-3 lg:right-8 transform -translate-x-1/2 w-[20px] h-[25px] overflow-hidden">
          <div
            className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[25px] border-l-transparent border-r-transparent border-b-white"
            style={{ filter: "drop-shadow(0 0 1.5px rgba(0, 0, 0, 0.25))" }}
          ></div>
        </div>
        <h3 className="subheading text_primary mb-2 md:mb-5">Notification</h3>
        <div className="rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {(notifications.length !== 0) ? (
            notifications && notifications?.slice(0, 4)?.map((item, index) => (
              <div className={`flex items-start gap-x-2 pb-3 p-2 border-b border-gray-200 ${item?.read ? "" : "bg-[#E6EEEC]"}`} key={index}
                onClick={() => handleMarkAsRead(item)}>
                <div className="w-10 h-10">
                  <Image
                    src={item?.data?.senderPic || NotificationUserProfile}
                    alt={item?.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded-md"
                    title={item?.title}
                  />
                </div>
                <div className="md:relative flex flex-col gap-y-1  truncate max-w-[calc(100%-58px)] md:max-w-[calc(100%-48px)]">
                  <div className="flex justify-between items-center gap-x-2">
                    <h5 className="text-[14px] font-semibold">{item?.title}</h5>
                    <div className="text-[color:var(--black-50,#33333380)] text-[13px]">
                      {formatDate(item?.data?.createdAt)}
                    </div>
                  </div>
                  <h5 className="font-normal text-[13px] text-[color:var(--black-50,#33333380)] truncate max-w-[calc(100%-20px)] md:max-w-[calc(100%-0px)]">{item?.body}</h5>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full">
              <p className="p-8 text-center text_primary font-bold flex flex-col items-center justify-center gap-3">
                <span>No New Notifications</span>
                <IoFolderOpenOutline className="text-3xl" />
              </p>
            </div>
          )}
        </div>
        {(notifications.length !== 0) && (
          <button className="cursor-pointer text-[14px] lg:text-[15px] 2xl:text-[17px] text-white text-center bg_secondary w-full rounded-[50px] py-2 2xl:py-3 mt-3" onClick={() => handleNotificationClick()}>
            View All {notifications && notifications?.length > 4 && notifications?.length - 4} Notification
          </button>
        )}
      </div>
    </div>
  );
};

export default TopOverallNoficationModal;