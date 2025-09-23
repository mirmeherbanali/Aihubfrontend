import RatingBar from "@/common/RatingBar/RatingBar";
import Link from "next/link";
import { formatNumber } from "@/common/FormatNumber/FormatNumber";
import { FaStar } from "react-icons/fa";

const RatingSummary = ({ reviews }) => {
  const postedForInfor = reviews && reviews[0]?.postedFor;
  const dispersion = postedForInfor?.dispersionOfStars || {};
  const total = Object.values(dispersion).reduce((sum, val) => sum + (val || 0), 0);
  const averageRating = total ? (((dispersion.fiveStart || 0) * 5 + (dispersion.fourStart || 0) * 4 + (dispersion.threeStart || 0) * 3 + (dispersion.twoStart || 0) * 2 + (dispersion.oneStart || 0) * 1) / total).toFixed(1) : "1.0";

  const ratingData = [
    { star: 5, color: "bg-emerald-800", text: "text-emerald-800", count: postedForInfor?.dispersionOfStars?.fiveStart },
    { star: 4, color: "bg-lime-400", text: "text-lime-400", count: postedForInfor?.dispersionOfStars?.fourStart },
    { star: 3, color: "bg-amber-500", text: "text-amber-500", count: postedForInfor?.dispersionOfStars?.threeStart },
    { star: 2, color: "bg-yellow-400", text: "text-yellow-400", count: postedForInfor?.dispersionOfStars?.twoStart },
    { star: 1, color: "bg-red-600", text: "text-red-600", count: postedForInfor?.dispersionOfStars?.oneStart },
  ];

  return (
    <>
      <div className=" w-full max-w-7xl mx-auto md:mb-6 px-3 xl:px-0">
        <div className="flex justify-between shadow-md rounded-sm bg-white  md:hidden my-5 p-4">
          <div>
            <p>{formatNumber(postedForInfor?.totalReviews)}</p>
            <p>Total Reviews</p>
          </div>
          <div>
            <p>{formatNumber(postedForInfor?.totalReviews)}</p>
            <p>Total Reviews</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="md:grid grid-cols-12 gap-6 items-center">
            <div className="col-span-5 space-y-2">
              {ratingData.map((item, index) => {
                const percent = (item.count / total) * 100;
                return (
                  <RatingBar
                    key={item.star}
                    item={item}
                    index={index}
                    percent={percent}
                  />
                );
              })}
            </div>

            <div className="col-span-3 space-y-4">
              <div>
                <p className="content1  hidden md:block">
                  Total Reviews
                </p>
                <p className="content fw-[700] hidden md:block">
                  {formatNumber(postedForInfor?.totalReviews)}
                </p>
              </div>
              <div className="hidden md:block">
                <p className="content1">Overall Rating</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-lg font-extrabold text-gray-900 mr-2">
                    {total}
                  </span>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(total)
                          ? "text-lime-500 w-4 h-4"
                          : "text-gray-300 w-4 h-4"
                      }
                    />
                  ))}
                  <span className="text-lime-500 text-sm font-medium ml-1">
                    {averageRating >= 4 ? "Good" : averageRating >= 3 ? "Average" : "Poor"}
                  </span>
                </div>
              </div>
            </div>
            {postedForInfor?.description && <div className="col-span-4 bg-gray-100 p-4 rounded-xl content1 text-gray-700">
              <p>{postedForInfor?.description}</p>
              <div
                className="inline-block mt-3 px-4 py-1 text-sm bg-teal-100 text-teal-700 rounded-full"
              >
                written by the {postedForInfor?.name}
              </div>
            </div>}
          </div>
        </div>
        <Link href="/register">
          <div className="flex justify-center">
            <button className="bg-emerald-900 hover:bg-emerald-800 text-white font-medium text-sm px-18 py-2 rounded-full  md:flex items-center space-x-1 transition md:hidden mt-4">
              <span>Write a Review </span>
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default RatingSummary;
