'use client';

import { useState } from 'react';
import CustomCheckbox from '@/common/CustomCheckbox/CustomCheckbox';

const CheckBoxOpsation = ({ ratings }) => {
    const [businessFeedbackRatingSettings, setBusinessFeedbackRatingSettings] = useState({
        oneStar: false,
        twoStar: false,
        threeStar: false,
        fourStar: false,
        fiveStar: false,
    });
    const handleFeedbackChange = (rating, value) => {
        setBusinessFeedbackRatingSettings((prev) => ({
            ...prev,
            [rating]: value,
        }));
    };

    return (
        <div className="bg_background p-5 rounded-[20px] mb-3 lg:mb-4 xl:mb-5">
            <p className="text_black content1 font-semibold capitalize mb-2">
                Overall Feedback for goldenstones.com - Please email me with details.
            </p>
            <div className="flex flex-col gap-2">
                {ratings.map((rating) => (
                    <label key={rating.id} className="flex items-center gap-2">
                        <CustomCheckbox
                            id={rating.id}
                            name={rating.name}
                            value={rating.value}
                            checked={businessFeedbackRatingSettings[rating.id]}
                            onChange={(value) => handleFeedbackChange(rating.id, value)}
                        />
                        <span className="text_black content1 font-normal">{rating.label}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default CheckBoxOpsation