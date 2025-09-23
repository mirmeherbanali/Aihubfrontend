import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import CompanyLogo from "@/assets/images/Review_Screen/company.png";

const RecentSearchReviews = ({ recentSearch, handlerRedirectToReviewPage }) => {
  return (
    recentSearch &&
    recentSearch?.searchResult &&
    recentSearch?.searchResult?.length > 0 && (
      <section className="px-4">
        <div className="bg-white shadow-md rounded-[10px] p-6 mx-auto max-w-7xl my-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text_primary heading">Write review on recent search</h2>
            <Link href="#" className="content1 text-gray-600 hover:text-black transition hidden md:block">
              See More
            </Link>
          </div>
          <div className="w-full">
            <div className={`flex gap-4 ${recentSearch?.searchResult?.length > 4 ? "flex-nowrap overflow-x-auto " : "flex-wrap"}`}>
              {recentSearch && recentSearch?.searchResult?.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer bg-gray-100 rounded-xl p-4 flex flex-col gap-2 items-start shadow-sm hover:shadow-md transition min-w-[250px] flex-shrink-0"
                  onClick={() => handlerRedirectToReviewPage(item?._id)}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item?.profilePic || CompanyLogo}
                      alt={item?.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div className="overflow-hidden">
                      <p className="content">{item?.name || `${item?.firstName} ${item?.lastName}`}</p>
                      <p className="content1 text-teal-700 truncate max-w-[150px]">{item?.domain}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="content1 text-gray-700">Overall Rating</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>{item?.overallRating?.toFixed(1)}</span>
                      <div className="flex text_green">
                        {[...Array(4)].map((_, i) => (<FaStar key={i} size={14} />))}
                        <FaStar size={14} className="text-gray-300" />
                      </div>
                      <span className="text-gray-600">{item?.totalReviews} Reviews</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default RecentSearchReviews;