"use client";

import SearchRecentReviews from "@/common/Reviwes/SearchRecentReviews";
import { getAllRecentSearches } from "@/store/slices/businessRecentSearch.slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import WriteReview from "@/common/PopupModal/WriteReview";

const RecentSearchReviews = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const businessRecentSearch = useSelector((state) => state.businessRecentSearch);
  const businessAuth = useSelector((state) => state.businessAuth);
  const individualRecentSearch = useSelector((state) => state.individualRecentSearch);
  const individualAuth = useSelector((state) => state.individualAuth);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  let currentUserType;
  let currentSearch;
  let currentAuth;
  if (userDetails) {
    if (userDetails?.userType === "business") {
      currentUserType = "business";
      currentSearch = businessRecentSearch?.recentSearch;
      currentAuth = businessAuth?.activeAccount;
    } else if (userDetails?.userType === "individual") {
      currentUserType = "individual";
      currentSearch = individualRecentSearch?.recentSearch;
      currentAuth = individualAuth?.activeAccount;
    } else if (userDetails?.userType === "admin") {
      currentUserType = "admin";
    } else {
      currentUserType = "/";
      currentSearch = null;
    }
  } else {
    currentUserType = "/";
    currentSearch = null;
  };

  useEffect(() => {
    dispatch(getAllRecentSearches({ id: currentAuth?._id }));
  }, [dispatch, currentAuth?._id]);

  const handlerRedirectToReviewPage = (data) => {
    if (userDetails) {
      if (userDetails?.userType !== "admin") {
        setShowReviewPopup(true);
        sessionStorage.setItem("userId", data);
      }
    }
  };

  const closeReviewPopup = () => {
    setShowReviewPopup(false);
  };

  return (
    <>
      {userDetails && userDetails?.userType !== "admin" &&
        <SearchRecentReviews
          handlerRedirectToReviewPage={handlerRedirectToReviewPage}
          recentSearch={currentSearch}
        />
      }
      {showReviewPopup && (
        <WriteReview
          onClose={closeReviewPopup}
          reviewType={"create"}
          userType={currentUserType}
        />
      )}
    </>
  );
};

export default RecentSearchReviews;