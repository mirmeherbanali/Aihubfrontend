import DatePicker from "@/common/DatePicker/DatePicker";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IoIosNotifications } from "react-icons/io";
import TopOverallNoficationModal from "../Messages/TopOverallNoficationModal";
import TopOnlineNoficationModal from "../Messages/TopOnlineNoficationModal";
import { useSelector } from "react-redux";

const Header = ({ userType, notifications, newNotifications, handleMarkAsRead, notificationRedirectUrl }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { moduleName } = useSelector((state) => state.moduleName);
  const isAdmin = pathname.startsWith("/admin");
  const isBusinessReview = pathname.startsWith("/business/review");
  const text = "Write a Review";
  const isRead = notifications?.filter(counts => !counts?.read).length || 0;



  return (
    <div
      className={`fixed top-12 lg:top-0 left-0 right-0 z-50 bg-white flex justify-between items-center px-3 md:px-9 py-4 lg:left-72 lg:bg-white shadow ${isAdmin ? "hidden lg:flex" : ""}`}
    >
      <h1 className="heading text-lg md:text-xl font-semibold">{moduleName}</h1>
      <div className="lg:flex items-center gap-4 hidden">

        {/* Desktop Screen Notification Dropdown */}
        <div className="cursor-pointer relative w-8 h-8 rounded-full bg_secondary flex items-center justify-center group1">
          {isRead > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {isRead}
            </span>
          )}
          <div className="relative">
            <IoIosNotifications className="text-white text-xl" />
            <TopOverallNoficationModal
              notifications={notifications}
              handleMarkAsRead={handleMarkAsRead}
              notificationRedirectUrl={notificationRedirectUrl}
            />
            {newNotifications && (
              <TopOnlineNoficationModal newNotifications={newNotifications} />
            )}
          </div>
        </div>
        {!isAdmin && !isBusinessReview ? (
          <motion.button
            onClick={() => router.push(`/${userType}/review`)}
            className="relative rounded-full overflow-hidden group hidden lg:block"
          >
            <motion.span className="ps-7 py-2 bg-white text-[15px] rounded-full shadow-md flex items-center justify-center gap-2 relative transition-colors duration-700 group-hover:bg-[#009F7D] bg_primary">
              <div className="relative flex justify-center items-center cursor-pointer">
                <span className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
                  {text?.split("").map((letter, index) => (
                    <span
                      key={`shadow-${index}`}
                      className="inline-block whitespace-pre"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
                <span className="w-full flex items-center justify-center text_yellow whitespace-pre ">
                  {text?.split("")?.map((letter, index) => (
                    <motion.span
                      key={`animated-${index}`}
                      className="inline-block"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{
                        duration: 2.6,
                        delay: index * 0.05,
                        repeat: Infinity,
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </span>
              </div>
              <motion.span
                animate={{ x: [-130, -50, -10] }}
                transition={{
                  duration: 2.6,
                  delay: 1,
                  ease: "backInOut",
                  repeat: Infinity,
                }}
                className="inline-block z-20 text-white"
              >
                ✏️
              </motion.span>
            </motion.span>
          </motion.button>
        ) : (
          <div className="hidden lg:block">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-96 lg:py-3 px-10 ps-10 text-sm text-gray-800 border border-gray-200 rounded-full bg_light-color focus:outline-none focus:border-gray-300"
                placeholder="Search"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tab & Mobile Responsiveness */}
      <div className="lg:hidden flex  items-center">
        {/* Calender Dropdown */}
        <div>
          <DatePicker />
        </div>

        {/* Mobile Screen Notification Dropdown */}
        <div className="cursor-pointer relative w-8 h-8 rounded-full bg_secondary flex items-center justify-center group1">
          {isRead > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {isRead}
            </span>
          )}
          <div className="relative">
            <IoIosNotifications className="text-white text-xl" />
            <TopOverallNoficationModal
              notifications={notifications}
              handleMarkAsRead={handleMarkAsRead}
              notificationRedirectUrl={notificationRedirectUrl}
            />
            {newNotifications && (
              <TopOnlineNoficationModal newNotifications={newNotifications} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
