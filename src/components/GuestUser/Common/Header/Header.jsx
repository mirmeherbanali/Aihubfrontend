"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import DCLogo from "@/assets/images/DC_Guest_User/Header/DC Logo.svg";
import DCLogoGreen from "@/assets/images/DC_Guest_User/Header/DC Logo Green.svg";
import Reviews from "@/assets/images/DC_Guest_User/WhyDragonCustomer/image.png";
import useDropdown from "@/common/Hooks/useDropdown";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastifySuccess, showToastifyError } from "@/common/tostify/Toastifyresponse";
import fetchAPI from "@/common/Hooks/fetchAPI";

const GuestHeader = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { isDropdownOpen: isDropdownOpen, dropdownRef: popupRef, toggleDropdown } = useDropdown();

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Reviews", href: "/reviews" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const logoutBusinessUser = async () => {
    try {
      let logoutUrl;
      if (userDetails) {
        if (userDetails?.userType === "business") {
          logoutUrl = `${process.env.NEXT_PUBLIC_API_URL}/business/auth/logoutBusinessUser`;
        } else if (userDetails?.userType === "individual") {
          logoutUrl = `${process.env.NEXT_PUBLIC_API_URL}/individual/auth/logoutIndividual`;
        } else if (userDetails?.userType === "admin") {
          logoutUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/logoutAdmin`;
        }
      }
      const response = await fetchAPI({
        url: logoutUrl,
        method: "POST"
      });
      if (response?.success === true) {
        showToastifySuccess(response?.result?.message);
        sessionStorage.clear();
        location.reload();
      } else {
        showToastifyError(response?.result?.message);
      }
    } catch (error) {
      showToastifyError(error?.message);
    }
  };

  const handleLogout = async () => {
    await logoutBusinessUser();
  };

  let dashboardRedirectLink;
  let profileRedirectLink;
  let settingRedirectLink;
  if (userDetails) {
    if (userDetails?.userType === "business") {
      dashboardRedirectLink = "/business/dashboard";
      profileRedirectLink = "/business/business_user_profile_information";
      settingRedirectLink = "/business/settings/profile";
    } else if (userDetails?.userType === "individual") {
      dashboardRedirectLink = "/individual/dashboard";
      profileRedirectLink = "/individual/individual_user_profile_information";
      settingRedirectLink = "/individual/settings/profile";
    } else if (userDetails?.userType === "admin") {
      dashboardRedirectLink = "/admin/dashboard";
      profileRedirectLink = "/admin/admin_user_profile_information";
      settingRedirectLink = "/admin/admin_settings";
    } else {
      dashboardRedirectLink = "/";
      profileRedirectLink = "/";
      settingRedirectLink = "/";
    }
  } else {
    dashboardRedirectLink = "/";
    profileRedirectLink = "/";
    settingRedirectLink = "/";
  };

  return (
    <header className={`sticky top-0 left-0 w-full z-50 py-6 px-4 transition-all duration-300 shadow-lg ${isHomePage ? "bg_primary" : "bg_white"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* DC Logo Part */}
        <Link href="/" className="flex items-center text-xl font-semibold">
          <span className="me-1">
            <Image
              src={isHomePage ? DCLogo : DCLogoGreen}
              alt="Dragon Customer Logo"
              width={40}
              height={40}
              priority
            />
          </span>
          <span
            className={`subheading ${isHomePage ? "text_white" : "text_primary"
              }`}
          >
            ragon Customer
          </span>
        </Link>

        {/* Mobile view Hamburger dropdown button */}
        <button
          className={`lg:hidden ${isHomePage ? "text_white" : "text_primary"}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Desktop view nav items */}
        <motion.div layout className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex flex-col overflow-hidden h-8 px-4 py-1 rounded-full z-10 ${isHomePage ? "text_white" : "text_primary"
                    }`}
                >
                  <motion.div
                    className="flex flex-col space-y-5 transition-transform duration-600 ease-out"
                    whileHover={{ y: "-65%" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {/* Top Text (Visible Initially) */}
                    <span className="flex items-center justify-center">
                      {item.name}
                    </span>

                    {/* Bottom Text (Revealed on Hover) */}
                    <span className="flex items-center justify-center">
                      {item.name}
                    </span>
                  </motion.div>

                  {/* Active Nav Highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="navHighlight"
                      className="absolute inset-0 rounded-full z-0 bg-[#5A8D82]/40"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>

                {/* Hover Background Overlay */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 py-2 rounded-full z-[-1] bg-gray-200 opacity-0"
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Desktop view Register Now button */}
        <div className="hidden lg:block">
          {userDetails ? (
            <div className="relative" ref={popupRef}>
              <button
                type="button"
                className="cursor-pointer flex items-center justify-between gap-x-4 w-58 p-2 rounded-2xl shadow-md font-semibold transition-transform bg-white text-primary"
                aria-label="Toggle user menu"
                onClick={() => toggleDropdown()}
              >
                <div className="flex items-start gap-x-1">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-gray-100">
                    <Image
                      src={userDetails?.profileImage || Reviews}
                      alt={userDetails?.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="max-w-36 text-[14px] truncate text-start">{userDetails?.name}</h6>
                    <h6 className="font-normal max-w-36 text-[12px] truncate">{userDetails?.socialHandel}</h6>
                  </div>
                </div>
                <div className="cursor-pointer">
                  <IoIosArrowDown size={20} />
                </div>
              </button>

              {isDropdownOpen && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="pb-2 pt-5 px-2 absolute w-58 top-[58px] right-0 bg-white rounded-2xl shadow-md z-10 overflow-hidden">
                    <div className="flex flex-col items-start gap-y-4 ">
                      <Link href={dashboardRedirectLink} className="cursor-pointer flex flex-row items-center gap-x-2 pl-2">
                        <MdDashboard size={19} className="text_secondary" />
                        <p>Dashboard</p>
                      </Link>
                      <Link href={profileRedirectLink} className="cursor-pointer flex flex-row items-center gap-x-2 pl-2">
                        <FaUserCircle size={18} className="text_secondary" />
                        <p>Profile</p>
                      </Link>
                      <Link href={settingRedirectLink} className="cursor-pointer flex flex-row items-center gap-x-2 pl-2">
                        <IoMdSettings size={20} className="text_secondary" />
                        <p>Settings</p>
                      </Link>
                      <button
                        className="w-full bg_secondary text-white text-center py-2 rounded-md cursor-pointer"
                        type="button"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          ) : (
            <Link href="/register" className={`py-3 px-6 rounded-full shadow-md font-semibold transition-transform ${isHomePage ? "bg_white text_primary" : "bg_primary text_white"}`}>
              Register Now
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden fixed inset-0 top-20 shadow-xl h-[300px] rounded-b-4xl text_white z-40 ${isHomePage ? "bg_primary" : "bg_white"
              }`}
          >
            <div className="container mx-auto px-4 py-2 text-[17px] flex flex-col items-center space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`py-2 px-6 rounded-lg font-medium ${isHomePage ? "text_white" : "text_primary"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              {userDetails ? (
                <div className="relative" ref={popupRef}>
                  <button
                    type="button"
                    className="cursor-pointer flex items-center gap-x-4 p-2 w-58 rounded-md shadow-md font-semibold transition-transform bg-white text-primary"
                    aria-label="Toggle user menu"
                    onClick={() => toggleDropdown()}
                  >
                    <div className="flex items-start gap-x-1">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-gray-100">
                        <Image
                          src={userDetails?.profileImage || Reviews}
                          alt={userDetails?.name}
                          width={36}
                          height={36}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h6 className="max-w-36 text-[14px] truncate text_black">{userDetails?.name}</h6>
                        <h6 className="font-normal max-w-36 text-[12px] truncate text_black">{userDetails?.socialHandel}</h6>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <IoIosArrowDown size={20} className="text_black" />
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div className="pb-2 pt-5 px-2 absolute w-58 top-[58px] right-0 bg-white rounded-lg shadow-md z-10">
                      <div className="text-black flex flex-col items-start gap-y-4 ">
                        <Link href={dashboardRedirectLink} className="cursor-pointer flex flex-row items-center gap-x-2 pl-2">
                          <MdDashboard size={19} className="text_secondary" />
                          <p>Dashboard</p>
                        </Link>
                        <Link href={profileRedirectLink} className="cursor-pointer flex flex-row items-center gap-x-2 pl-2">
                          <FaUserCircle size={18} className="text_secondary" />
                          <p>Profile</p>
                        </Link>
                        <Link href={settingRedirectLink} className="cursor-pointer flex flex-row items-center gap-x-2 pl-2">
                          <IoMdSettings size={20} className="text_secondary" />
                          <p>Settings</p>
                        </Link>
                        <button
                          className="w-full bg_secondary text-white text-center py-2 rounded-md cursor-pointer"
                          type="button"
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>) : (
                <Link
                  href="/register"
                  onClick={handleLinkClick}
                  className={`w-[80%] py-2 rounded-full font-semibold text-center border-t border-white mt-4 ${isHomePage ? "bg_white text_primary" : "bg_primary text_white"
                    }`}
                >
                  Register Now
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer stacked />
    </header>
  );
};

export default GuestHeader;