'use client'

import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, totalStars }) => {
    return (
        <div className="flex gap-1">
            {Array.from({ length: totalStars }, (_, index) => (<>
                <div key={index}> {index < rating ? <FaStar style={{
                    filter: 'invert(53%) sepia(203%) saturate(999%) hue-rotate(348deg) brightness(101%) contrast(101%)'
                }} className="w-[15px] lg:w-[20px]" /> :
                    <FaRegStar style={{
                        filter: 'greyscale(100%)'
                    }} className="w-[15px] lg:w-[20px]" />}</div>
            </>
            ))}
        </div>
    );
}

export default StarRating;