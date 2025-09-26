import StarRating from '@/common/StarRating/StarRating';
import style from '@/common/Categories/categorystyle.module.scss';
import { MdKeyboardArrowRight } from "react-icons/md";
import Avatar from '@/assets/images/DC_Guest_User/HonestReviews/Avatar.png';
import Image from 'next/image';

const CategoryListPage = ({ categoryData = [], handleViewReviewForDetails }) => {

    return (
        <section className={`bg_background w-full shadow-md rounded-2xl`}>
            <div className={`bg_white rounded-2xl w-full p-2 sm:p-4 lg:p-8 `}>
                {categoryData && categoryData?.map((review, index) => {
                    return (
                        <div key={index} className={`${style['reviewlist']} flex justify-between items-center border-b border-gray-300 pb-14 sm:pb-4 relative`}>
                            <div className="flex items-start gap-4">
                                <Image src={review?.profilePic || Avatar} alt={review.name || review.firstName + ' ' + review.lastName} className="w-[70px] h-[70px] border rounded-md" width={70} height={70} />
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold subheading text_black">{review.name || review.firstName + ' ' + review.lastName}</h3>
                                    <p className="content1 font-semibold flex flex-col sm:flex-row gap-1">
                                        <span className="text_secondary">{review.domain || review.email}</span>
                                        <span className="hidden sm:block">|</span>
                                        <span className="text_black">{review?.country}</span></p>
                                    <div className="flex flex-row gap-2 items-center absolute sm:static bottom-[-5px] left-0 bg_background rounded-md py-2 mb-4 sm:mb-0 px-2">
                                        <div><StarRating rating={review?.overallRating} totalStars={5} /></div>
                                        <span>|</span>
                                        <span>{review.overallRating}.0</span>
                                        <span className="hidden sm:inline">Ratings</span>
                                        <span>|</span>
                                        <span>{review?.totalReviews} </span>
                                        <span className="hidden sm:inline">reviews</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden xl:block w-[180px]">
                                <button className="bg_secondary rounded-full py-2 px-4 cursor-pointer  text_white content1 text-center hover:shadow-lg w-full" onClick={() => handleViewReviewForDetails(review?._id)}>See Reviews</button>
                            </div>
                            <div className="block xl:hidden"><MdKeyboardArrowRight className='bg_background rounded-full cursor-pointer' size={25} /></div>
                        </div>
                    )
                })}
            </div>
        </section>
    );
};

export default CategoryListPage;