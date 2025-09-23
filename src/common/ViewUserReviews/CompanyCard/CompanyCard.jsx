import Image from "next/image";
import Logo from "@/assets/images/Review_Screen/company.png";

const CompanyCard = ({ reviews, handlerRedirectToReviewPage }) => {

  const postedForInfor = reviews && reviews[0]?.postedFor;

  return (
    <div className=" max-w-7xl mx-auto my-3  md:my-6 px-3 xl:px-0">
      <div className="bg-white rounded-2xl shadow-sm  w-full p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={Logo}
                alt="Company Logo"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center flex-wrap space-x-2">
                <h2 className="heading">{postedForInfor?.name || `${postedForInfor?.firstName} ${postedForInfor?.lastName}`}</h2>
                <span className="text-gray-300 hidden md:inline">|</span>
                <div
                  className="text-teal-600 text-sm font-medium hover:underline"
                >
                  {postedForInfor?.domain || postedForInfor?.email}
                </div>
              </div>
              <span className="text-gray-500 text-sm md:hidden">
                {postedForInfor?.totalReviews || 0} Reviews
              </span>
            </div>
          </div>
          <button className="bg-emerald-900 hover:bg-emerald-800 text-white content px-6 py-2 rounded-full hidden md:flex items-center space-x-1 transition cursor-pointer" onClick={() => handlerRedirectToReviewPage(postedForInfor?._id)}>
            <span className="text-yellow-400 ">Write</span>
            <span>a Review ✏️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
