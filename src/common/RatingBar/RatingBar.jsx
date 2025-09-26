import { FaStar } from 'react-icons/fa';
import { formatNumber } from '@/common/FormatNumber/FormatNumber';

const RatingBar = ({ key, item, index, percent }) => {
    return (
        <div key={key} className="flex items-center gap-2 text-sm">
            <input
                type="radio"
                name="rating"
                className="accent-emerald-900 w-4 h-4"
                // checked={index}
                readOnly
            />
            <FaStar className={`w-4 h-4 ${item.text}`} />
            <div className="relative flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                    className={`${item.color} h-2 absolute top-0 left-0 rounded-full`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            <span className="text-gray-600 text-sm font-medium w-12 text-right">
                {formatNumber(item.count)}
            </span>
        </div>
    );
};

export default RatingBar;