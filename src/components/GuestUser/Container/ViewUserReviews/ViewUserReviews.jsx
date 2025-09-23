"use client";

import { useEffect, useState } from "react";
import ViewUserReviewsComponent from "@/common/ViewUserReviews/ViewUserReviews";
import WriteReview from "@/common/PopupModal/WriteReview";
import fetchAPI from "@/common/Hooks/fetchAPI";
import CommonPopupModal from "@/common/PopupModal/CommonPopupModal";
import { useRouter } from "next/navigation";

const ViewUserReviews = () => {
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [allReviews, setAllReviews] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("userDetails");
        if (storedUser) {
            setUserDetails(JSON.parse(storedUser));
        }
    }, []);

    console.log("userDetails", userDetails);

    const getAllReviews = async (id) => {
        try {
            const response = await fetchAPI({
                url: `${process.env.NEXT_PUBLIC_API_URL}/admin/review/getAllReviews`,
                method: "POST",
                body: { postedForId: id },
            });
            setAllReviews(response?.result?.list || []);
        } catch (error) {
            setAllReviews([]);
        }
    };

    useEffect(() => {
        const id = sessionStorage.getItem("reviewForId");
        if (id) {
            getAllReviews(id);
        }
    }, [showReviewPopup]);

    const handlerRedirectToReviewPage = (data) => {
        if (userDetails) {
            setShowReviewPopup(true);
            sessionStorage.setItem("userId", data);
            sessionStorage.removeItem("reviewId");
        }else{
            setShowLoginPopup(true);
        }
    };

    const closeReviewPopup = () => {
        setShowReviewPopup(false);
    };

    const handleLogin = () => {
        setShowLoginPopup(false);
        router.push("/register");
    };

    return (
        <>
            {allReviews?.length > 0 && (
                <ViewUserReviewsComponent
                    reviews={allReviews}
                    handlerRedirectToReviewPage={handlerRedirectToReviewPage}
                />
            )}
            {showReviewPopup && (
                <WriteReview
                    onClose={closeReviewPopup}
                    reviewType="create"
                    userType={userDetails?.userType}
                />
            )}
            {showLoginPopup && <CommonPopupModal
                title="Login Required"
                message="Please login to write a review."
                primaryButtonText="Cancel"
                secondaryButtonText="Login"
                onPrimaryClick={() => setShowLoginPopup(false)}
                onSecondaryClick={handleLogin}
                onClose={() => setShowLoginPopup(false)}
            />}
        </>
    );
};

export default ViewUserReviews;