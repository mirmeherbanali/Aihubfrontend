import Link from "next/link";
import React, { useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import useClickOutside from "../Hooks/useClickOutside";

const SearchUserForReviewComponent = ({
  userType,
  userSearchList,
  handleSearch,
  userList,
  handlerRedirectToReviewPage,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
const linkPath = userType === "business" ? "/business/add_individual_user" : "/individual/add_business_user";
  useClickOutside(dropdownRef, () => {
    setShowDropdown(false);
  });

  const handleInputFocus = () => {
    if (
      userList &&
      userList.length > 0 &&
      userSearchList &&
      userSearchList.length > 0
    ) {
      setShowDropdown(true);
    }
  };

  const handleInputChange = (e) => {
    handleSearch(e);
    setShowDropdown(true);
  };

  const handleItemClick = (id) => {
    handlerRedirectToReviewPage(id);
    setShowDropdown(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-7xl mx-auto">
      <h2 className="subheading font-bold text_primary mb-4">
        Write a review and help other to make right decisions
      </h2>

      <div className="relative w-full max-w-xl mx-auto mb-3">
        <input
          type="search"
          value={userList}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search by Customer Mobile number or Postcode"
          className="w-full rounded-full py-3 pl-10 pr-4 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <IoSearchOutline className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />

        {showDropdown &&
          userList &&
          userList.length > 0 &&
          userSearchList &&
          userSearchList.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute left-0 right-0 mt-2 bg-white text-black rounded-2xl shadow-lg max-h-60 overflow-y-auto z-10"
            >
              {userSearchList.length > 0 ? (
                userSearchList.map((data, index) => (
                  <div
                    className="flex justify-between px-4 py-3 hover:bg-gray-100 transition cursor-pointer"
                    key={index}
                    onClick={() => handleItemClick(data?._id)}
                  >
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                        {userType === "business" &&
                          data?.firstName[0]?.toUpperCase()}
                        {userType === "individual" &&
                          data?.name[0]?.toUpperCase()}
                      </div>
                      <div className="text-start">
                        <p className="content">
                          {userType === "business" &&
                            data?.firstName + " " + data?.lastName}
                          {userType === "individual" && data?.name}
                        </p>
                        <p className="text_primary">{data?.address}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text_black">
                        {data?.totalReviews}k reviews
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No mobile numbers found
                </div>
              )}
            </div>
          )}
      </div>

      <p className="text_secondary text-sm mb-2">
        {userType==="business" ? "Can't find a Individual user?":"Can't find a Business?"}{" "}
        <span className="cursor-pointer">Add here..</span>
      </p>

      <Link href={linkPath}>
        <button className="bg_secondary text-white font-medium py-2 px-6 rounded-full transition duration-300 cursor-pointer">
          Add New User
        </button>
      </Link>
    </div>
  );
};

export default SearchUserForReviewComponent;
