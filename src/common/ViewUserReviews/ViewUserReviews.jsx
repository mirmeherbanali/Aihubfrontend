import CompanyCard from "@/common/ViewUserReviews/CompanyCard/CompanyCard";
import RatingSummary from "@/common/ViewUserReviews/RatingSummary/RatingSummary";
import ReviewCard from "@/common/ViewUserReviews/ReviewCard/ReviewCard";

const ViewUserReviews = ({ reviews, handlerRedirectToReviewPage }) => {

    return (
        <>
            <CompanyCard
                reviews={reviews}
                handlerRedirectToReviewPage={handlerRedirectToReviewPage}
            />
            <RatingSummary
                reviews={reviews}
            />
            <ReviewCard
                reviews={reviews}
            />
        </>
    );
};

export default ViewUserReviews;