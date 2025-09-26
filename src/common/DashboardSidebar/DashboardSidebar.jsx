import { useState, useEffect, useRef } from "react";
import { HiOutlineArrowTurnDownRight } from "react-icons/hi2";
import { FiLogOut, FiPlusCircle, FiUser } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import logo from "@/assets/images/Dashboard/logo.png";
import DCLogo from "@/assets/images/DC_Guest_User/Header/DC Logo.svg";
import Image from "next/image";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosNotifications } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AddAccount from "../PopupModal/AddAccount";
import { PiUserSwitchBold } from "react-icons/pi";
import defaultImage from "@/assets/images/Review_Screen/profile_image.png";
import CommonPopupModal from "../PopupModal/CommonPopupModal";
import { RiDeviceRecoverLine } from "react-icons/ri";
import useDropdown from "../Hooks/useDropdown";
import AddNewUser from "../UserInformation/AddUserAdditionModal";
import { useDispatch } from "react-redux";
import { setModuleName } from "@/store/slices/moduleName.slice";
import { AnimatePresence, motion } from "framer-motion";

const DashboardSidebar = ({
  moduleRoutes,
  handleLogout,
  showAddAccount,
  setShowAddAccount,
  onClose,
  profileData,
  userFormData,
  handleChangeUser,
  handleSubmitUser,
  handleChangePhoneCode,
  handleChangePhone,
  userDetails,
  handleSwitchAccount,
  deleteAccount,
  handleDeleteAccount,
  handleCancelDelete,
  isDeletePopupOpen,
  handleConfirmDeleteAccount,
  showRecoveryPopupOpen,
  setShowRecoveryPopupOpen,
  handleOpenRecoverModal,
  handleConfirmRecoverAccount,
  recoverAccount,
  userType,
  profileCompletion,
  handleResetProfile,
  handleUpdateProfile,
  isChangePassword,
  setIsChangePassword,
}) => {
  console.log(profileCompletion)
  const [color, setColor] = useState("#000000");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const {
    isDropdownOpen: isAccountDropdownOpen,
    setIsDropdownOpen: setIsAccountDropdownOpen,
    dropdownRef,
    toggleDropdown: toggleAccountDropdown,
  } = useDropdown();
  const pathname = usePathname();
  const dispatch = useDispatch();


  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + "/");

  useEffect(() => {
    let color = Math.floor(Math.random() * 16777215);
    let ranCode = "#" + color.toString(16);
    setColor(ranCode);
  }, []);

  useEffect(() => {
    const matchedParent = moduleRoutes?.find((item) => {
      if (item.childModule?.length) {
        return item.childModule.some(
          (child) => pathname === child.link || pathname.startsWith(child.link)
        );
      }
      return pathname === item.link;
    });
    if (matchedParent) {
      setOpenDropdown(matchedParent.name);
    } else {
      setOpenDropdown(null);
    }
  }, [pathname, moduleRoutes]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSetSingleModule = (name) => {
    setOpenDropdown(null);
    dispatch(setModuleName(name));
  };

  const handleSetParentModule = (name) => {
    setOpenDropdown(name);
    dispatch(setModuleName(name));
  };

  const dropdownVariants = {
    open: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <>
      <aside className="hidden lg:block w-72 min-h-screen bg_primary text-white p-4 lg:flex flex-col justify-between">
        <div className="fixed h-screen flex flex-col justify-between">
          <div className="overflow-y-auto scrollbar-hide">
            <div className="flex items-center mb-12 space-x-1 cursor-pointer">
              <Image src={DCLogo} width={40} height={40} alt="logo" />
              <span className="font-semibold text-lg">ragon Customer</span>
            </div>
            <nav className="space-y-6">
              {moduleRoutes?.map((item, index) => {
                const hasChildren = item?.childModule?.length > 0;
                const isParentActive = hasChildren
                  ? item.childModule.some((child) => isActive(child.link))
                  : isActive(item.link);
                return hasChildren ? (
                  <div className="space-y-2" key={index}>
                    <div
                      className={`${openDropdown === item.name || isParentActive
                        ? "bg-white text_primary rounded-lg px-3 py-2 flex items-center space-x-3 shadow-md cursor-pointer hover:bg-gray-100 text-[17px] font-bold"
                        : "flex items-center space-x-3 px-1 cursor-pointer text-[17px] font-bold"
                        }`}
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.name ? null : item.name
                        )
                      }
                    >
                      {item?.icon}
                      <span>{item?.name}</span>
                      {openDropdown === item.name ? (
                        <FaChevronUp className="ml-auto" size={16} />
                      ) : (
                        <FaChevronDown className="ml-auto" size={16} />
                      )}
                    </div>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={dropdownVariants}
                          className="overflow-hidden"
                        >
                          <div className="bg-white rounded-xl px-4 py-3 space-y-1 shadow-md flex flex-col gap-1">
                            {item?.childModule?.map((subItem, subIndex) => (
                              <Link
                                href={subItem?.link}
                                onClick={() => handleSetParentModule(item.name)}
                                key={subIndex}
                              >
                                <div
                                  className={`flex items-center space-x-3 cursor-pointer text-[17px] font-bold px-1 bg-white ${isActive(subItem.link)
                                    ? "text_secondary"
                                    : "text_primary"
                                    }`}
                                >
                                  <HiOutlineArrowTurnDownRight size={20} />
                                  <span>{subItem?.name}</span>
                                  {(subItem?.data > 0) && (
                                    <span className="bg_secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                      {subItem?.data}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item?.link}
                    className="block"
                    onClick={() => handleSetSingleModule(item?.name)}
                    key={index}
                  >
                    <div
                      className={`${isActive(item.link)
                        ? "bg-white text_primary rounded-lg px-3 py-2 flex items-center space-x-3 shadow-md cursor-pointer"
                        : "flex items-center space-x-3 px-1 cursor-pointer"
                        } text-[17px] font-bold`}
                    >
                      {item?.icon}
                      <span>{item?.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
          {profileData && (
            <div className="space-y-2 mb-10">
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                    className="-z-10"
                  >
                    <div className="bg-white rounded-xl px-4 py-3 space-y-2 flex flex-col shadow-md content">
                      <Link href={profileData?.profileUrl}>
                        <div
                          className={`flex items-center space-x-2 cursor-pointer px-1 text_primary`}
                        >
                          <FiUser size={20} />
                          <span>Profile Page</span>
                        </div>
                      </Link>
                      <Link href="">
                        <div
                          onClick={() => setShowAddAccount(true)}
                          className={`flex items-center space-x-3 cursor-pointer px-1 text_primary`}
                        >
                          <FiPlusCircle size={20} />
                          <span>Add Account</span>
                        </div>
                      </Link>
                      {userDetails?.accounts?.length > 1 && (
                        <div className="relative" ref={dropdownRef}>
                          <div className={`flex items-center space-x-3 cursor-pointer px-1 text_primary`}>
                            <div>
                              <PiUserSwitchBold size={20} />
                            </div>
                            <div className="flex items-center justify-start w-full gap-x-2">
                              <div onClick={toggleAccountDropdown}>
                                Switch Account
                              </div>
                              <div className="relative flex items-center">
                                {userDetails?.accounts?.length > 0 && (
                                  <div onClick={toggleAccountDropdown}>
                                    <Image
                                      src={
                                        userDetails?.accounts[0].profilePic ||
                                        defaultImage
                                      }
                                      width={30}
                                      height={30}
                                      className="rounded-full object-cover w-[25px] h-[25px] relative"
                                      alt={userDetails?.accounts[0].name}
                                    />
                                  </div>
                                )}
                                {userDetails?.accounts?.length > 1 && (
                                  <div onClick={toggleAccountDropdown}>
                                    <Image
                                      src={
                                        userDetails?.accounts[1].profilePic ||
                                        defaultImage
                                      }
                                      width={30}
                                      height={30}
                                      className="rounded-full object-cover w-[25px] h-[25px] absolute top-0 left-3 z-[2]"
                                      alt={userDetails?.accounts[1].name}
                                    />
                                  </div>
                                )}
                                {userDetails?.accounts?.length > 2 && (
                                  <div
                                    className="bg-gray-300 rounded-full w-[25px] h-[25px] flex items-center justify-center text-black font-bold text-sm cursor-pointer absolute top-0 left-6 z-[2] border border-gray-900"
                                    onClick={toggleAccountDropdown}
                                  >
                                    +{userDetails?.accounts?.length - 1}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <AnimatePresence>
                            {isAccountDropdownOpen && (
                              <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={dropdownVariants}
                                className="absolute left-full -translate-y-[35px] ml-7 w-60 bg-white rounded-xl shadow-md text-[17px] font-bold"
                              >
                                <div className="relative">
                                  <div className="absolute left-[-12px] top-12 -translate-y-[35px] w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[12px] border-r-white z-100" />
                                </div>
                                <div className="px-4 py-3 space-y-3 overflow-y-scroll lg:max-h-[150px] xl:max-h-[165px] 2xl:max-h-[200px] scrollbar-hide z-50">
                                  {userDetails?.accounts
                                    ?.filter(
                                      (account) => account?._id !== profileData?.id
                                    )
                                    ?.map((account, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between group z-50"
                                      >
                                        <div
                                          className="flex items-center space-x-2"
                                          onClick={() =>
                                            handleSwitchAccount(
                                              userDetails?._id,
                                              account?._id
                                            )
                                          }
                                        >
                                          <Image
                                            src={account?.profilePic || defaultImage}
                                            width={30}
                                            height={30}
                                            className="rounded-full object-cover w-[25px] h-[25px]"
                                            alt={account?.name}
                                          />
                                          <span className="text_primary cursor-pointer w-40 truncate">
                                            {userType === "business"
                                              ? account?.name
                                              : userType === "individual"
                                                ? `${account?.firstName} ${account?.lastName}`
                                                : null}
                                          </span>
                                        </div>
                                        {account?.deleteAt ? (
                                          <RiDeviceRecoverLine
                                            size={20}
                                            className="text_purple cursor-pointer hidden group-hover:block"
                                            onClick={() =>
                                              handleOpenRecoverModal(
                                                account?._id,
                                                account?.name
                                              )
                                            }
                                          />
                                        ) : (
                                          <RiDeleteBin6Line
                                            size={20}
                                            className="text_red cursor-pointer hidden group-hover:block"
                                            onClick={() =>
                                              handleDeleteAccount(
                                                account?._id,
                                                account?.name
                                              )
                                            }
                                          />
                                        )}
                                      </div>
                                    ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                      <div onClick={() => handleLogout()}>
                        <div
                          className={`flex items-center space-x-3 cursor-pointer px-1 text_red`}
                        >
                          <FiLogOut size={20} />
                          <span>Logout</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className={`overflow-hidden bg-white rounded-xl px-1 py-3 flex items-center shadow-md cursor-pointer z-50 ${isDropdownOpen
                  ? ""
                  : "flex items-center justify-between px-1 py-3 cursor-pointer"
                  }`}
                onClick={toggleDropdown}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    {profileData?.image && (
                      <Image
                        src={profileData?.image}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-full h-full"
                        alt={profileData?.name || profileData?.socialAccount}
                      />
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="w-42 overflow-hidden flex flex-col items-start">
                      <div
                        className={`text-lg font-bold text-black w-40 truncate`}
                      >
                        {profileData?.name?.length > 0 && profileData?.name}
                      </div>
                      <div className={`text-xs text-gray-700`}>
                        {profileData?.socialAccount}
                      </div>
                    </div>
                    {isDropdownOpen ? (
                      <FaChevronUp className={`text-black mt-1`} size={16} />
                    ) : (
                      <FaChevronDown className={`text-black mt-1`} size={16} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <section className="lg:hidden">
        <div
          className={`w-full bg-[#014D3C] text-white p-4 flex flex-col transition-all duration-300 ease-in-out fixed top-0 left-0 z-[999] overflow-y-auto ${show ? "min-h-[500px] rounded-b-4xl" : "h-[55px]"
            }`}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Image src={logo} width={170} height={40} alt="logo" />
            </div>
            <div className="flex items-center space-x-2">
              {show ? (
                <RxCross2
                  size={20}
                  onClick={() => setShow(!show)}
                  className="cursor-pointer"
                />
              ) : (
                <IoMenuOutline
                  className="text-white"
                  size={25}
                  onClick={() => setShow(!show)}
                />
              )}
            </div>
          </div>
          {show && (
            <AnimatePresence>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex flex-col"
              >
                <nav className="space-y-6 text-[15px] font-medium pt-3 p-4">
                  {moduleRoutes?.map((item, index) => {
                    const hasChildren = item?.childModule?.length > 0;
                    const isParentActive = hasChildren
                      ? item.childModule.some((child) => isActive(child.link))
                      : isActive(item.link);

                    return hasChildren ? (
                      <div className="space-y-2" key={index}>
                        <div
                          className={`${openDropdown === item.name || isParentActive
                            ? "bg-white text-[#014D3C] rounded-lg px-4 py-2 flex items-center space-x-3 shadow-md cursor-pointer"
                            : "flex items-center space-x-3 px-2 cursor-pointer pt-3"
                            }`}
                          onClick={() =>
                            setOpenDropdown((prev) =>
                              prev === item.name ? null : item.name
                            )
                          }
                        >
                          {item?.icon}
                          <span className="text-[16px] font-semibold">
                            {item?.name}
                          </span>
                          {openDropdown === item.name ? (
                            <FaChevronUp size={14} className="ml-auto" />
                          ) : (
                            <FaChevronDown size={14} className="ml-auto" />
                          )}
                        </div>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={dropdownVariants}
                              className="overflow-hidden"
                            >
                              <div className="bg-white rounded-xl px-4 py-3 space-y-3 shadow-md">
                                {item?.childModule?.map((subItem, subIndex) => (
                                  <Link
                                    href={subItem?.link}
                                    onClick={() => setShow(false)}
                                    key={subIndex}
                                  >
                                    <div
                                      className={`flex items-center space-x-3 cursor-pointer px-1 text-[#014D3C] bg-white ${isActive(subItem.link) ? "font-semibold" : ""
                                        }`}
                                    >
                                      <HiOutlineArrowTurnDownRight size={20} />
                                      <span className="text-[16px] font-semibold">
                                        {subItem?.name}
                                      </span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item?.link}
                        className="block"
                        onClick={() => setShow(false)}
                        key={index}
                      >
                        <div
                          className={`${isActive(item.link)
                            ? "bg-white text-[#014D3C] rounded-lg px-4 py-2 flex items-center space-x-3 shadow-md cursor-pointer hover:bg-gray-100"
                            : "flex items-center space-x-3 px-2 cursor-pointer pt-3"
                            }`}
                        >
                          {item?.icon}
                          <span className="ext-[16px] font-semibold">
                            {item?.name}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
                <div className="border-t border-gray-600"></div>
                <div className="pl-6 py-3 px-6" ref={dropdownRef}>
                  <div
                    className="flex items-center space-x-2 cursor-pointer text-[16px] font-semibold"
                    onClick={toggleAccountDropdown}
                  >
                    {profileData?.image && (
                      <Image
                        src={profileData?.image}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10"
                        alt={profileData?.name || profileData?.socialAccount}
                      />
                    )}
                    <span>{profileData?.name}</span>
                    {isAccountDropdownOpen ? (
                      <FaChevronUp size={14} className="ml-auto" />
                    ) : (
                      <FaChevronDown size={14} className="ml-auto" />
                    )}
                  </div>
                  <AnimatePresence>
                    {isAccountDropdownOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        className="overflow-hidden bg-white rounded-xl p-3 space-y-3 shadow-md mt-3"
                      >
                        {userDetails?.accounts
                          ?.filter((account) => account?._id !== profileData?.id)
                          ?.map((account, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between group z-50"
                            >
                              <div
                                className="flex items-center space-x-2"
                                onClick={() =>
                                  handleSwitchAccount(userDetails?._id, account?._id)
                                }
                              >
                                <Image
                                  src={account?.profilePic || defaultImage}
                                  width={30}
                                  height={30}
                                  className="rounded-full object-cover w-[25px] h-[25px]"
                                  alt={account?.name}
                                />
                                <span className="text_primary content cursor-pointer w-40 truncate">
                                  {userType === "business"
                                    ? account?.name
                                    : userType === "individual"
                                      ? `${account?.firstName} ${account?.lastName}`
                                      : null}
                                </span>
                              </div>
                              {account?.deleteAt ? (
                                <RiDeviceRecoverLine
                                  size={20}
                                  className="text_purple cursor-pointer hidden group-hover:block"
                                  onClick={() =>
                                    handleOpenRecoverModal(account?._id, account?.name)
                                  }
                                />
                              ) : (
                                <RiDeleteBin6Line
                                  size={20}
                                  className="text_red cursor-pointer hidden group-hover:block"
                                  onClick={() =>
                                    handleDeleteAccount(account?._id, account?.name)
                                  }
                                />
                              )}
                            </div>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="border-t border-gray-600 pb-3"></div>
                <div className="space-y-2 pl-6">
                  <Link href="">
                    <div
                      onClick={() => setShowAddAccount(true)}
                      className={`flex items-center space-x-3 cursor-pointer text-[16px] font-semibold`}
                    >
                      <FiPlusCircle size={20} />
                      <span>Add Acconut</span>
                    </div>
                  </Link>
                  <div onClick={() => handleLogout()}>
                    <div
                      className={`flex items-center space-x-3 cursor-pointer py-2 text-[16px] font-semibold`}
                    >
                      <FiLogOut size={20} />
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {(userType === "business" || userType === "individual") &&
        showAddAccount && (
          <AddAccount
            onClose={onClose}
            userFormData={userFormData}
            handleSubmitUser={handleSubmitUser}
            handleChangeUser={handleChangeUser}
            handleChangePhoneCode={handleChangePhoneCode}
            handleChangePhone={handleChangePhone}
            userType={userType}
          />
        )}

      {userType === "admin" && showAddAccount && (
        <AddNewUser
          isModelOpen={showAddAccount}
          setIsModalOpen={setShowAddAccount}
          modalTitle="Add Admin Account"
          adminUser={true}
          actionType="add"
          isChangePassword={isChangePassword}
          setIsChangePassword={setIsChangePassword}
          handleChange={handleChangeUser}
          formData={userFormData}
          handleSubmit={handleSubmitUser}
        />
      )}

      {userType !== "admin" && !profileCompletion?.isProfileComplete && (
        <CommonPopupModal
          title={`Please complete your profile`}
          message="To access all features, please update your profile, personal and categories information."
          profileCompletion={profileCompletion}
          handleUpdateProfile={handleUpdateProfile}
          onClose={handleResetProfile}
        />
      )}

      {isDeletePopupOpen && (
        <CommonPopupModal
          title={`Delete Account ${deleteAccount?.accountName}`}
          message="Are you sure you want to delete this account? You can recover it within 7 days if needed."
          primaryButtonText="No"
          secondaryButtonText="Yes"
          onSecondaryClick={handleConfirmDeleteAccount}
          onPrimaryClick={handleCancelDelete}
          onClose={handleCancelDelete}
        />
      )}

      {showRecoveryPopupOpen && (
        <CommonPopupModal
          title={`Recover Account ${recoverAccount?.accountName}`}
          message="Are you sure you want to delete this account?"
          primaryButtonText="No"
          secondaryButtonText="Yes"
          onSecondaryClick={handleConfirmRecoverAccount}
          onPrimaryClick={() => setShowRecoveryPopupOpen(false)}
          onClose={() => setShowRecoveryPopupOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;