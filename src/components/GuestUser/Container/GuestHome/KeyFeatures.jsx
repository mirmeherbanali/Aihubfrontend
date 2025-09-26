'use client';
import Image from 'next/image';
import KeyFeaturesImg from '@/assets/images/DC_Guest_User/KeyFeatures/laptop.png';
import Search from "@/assets/images/DC_Guest_User/HonestReviews/Search.png";
import { HiFlag } from "react-icons/hi";
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    {
        id: '01',
        title: 'Dashboard Management',
        desc: 'Control Over User Ratings, Flagged Reviews, and Monetization for Both Individual and Business Users',
    },
    {
        id: '02',
        title: 'Review Management',
        desc: 'Manage Inbox Reviews, Flagged Reviews, Review Status, and Edit or Post New Reviews',
    },
    {
        id: '03',
        title: 'AI-Powered Review Verification',
        desc: 'Reviews are analyzed by AI to verify authenticity; genuine reviews are approved, while suspicious ones are rejected',
    },
];

const barCharts = [
    { caption: 'Payment', percentage: 40, color: '#CA8200', count: 3, value: '(Average)' },
    { caption: 'Solution/Resolution', percentage: 80, color: '#004B3D', count: 5, value: '(Excellent)' },
    { caption: 'Communication', percentage: 60, color: '#DF0000', count: 4, value: '(Average)' },
];

const KeyFeatures = () => {

    return (
        <div className="bg-white px-4 sm:px-6 lg:px-12 py-12">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
                <h2 className="text-2xl sm:text-4xl text-center md:text-left font-bold text-green-900 leading-snug block md:hidden">
                    Key Features That Make It Unique and Effective
                </h2>
                <div className="py-4 md:py-0 relative w-full lg:w-1/2 flex flex-col items-center md:items-start bg-[#F4FBF9] rounded-xl">
                    {/* Top Left: Rating Card */}
                    <div className="bg-white md:m-8 p-4 sm:p-6 rounded-xl shadow-md flex flex-col items-start w-full max-w-xs sm:max-w-sm transform md:rotate-2">
                        {/* Rating: Average */}
                        <motion.div initial={{ x: 0, y: 0 }} animate={{ x: [0, 190, 40, 0], y: [0, 60, 150, 0], rotate: [5, 85, 5] }} transition={{ duration: 5, repeat: Infinity }} className='absolute'>
                            <Image className='z-20' height={40} width={40} src={Search} alt='Search' />
                        </motion.div>
                        {barCharts.map((chart, index) => (
                            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0], }} transition={{ duration: 1, times: [0, 0.3, 0.7, 1], delay: index * 1.5, repeat: Infinity, repeatDelay: barCharts.length * 0.5 }} className="flex items-end gap-2 w-full my-2">
                                <div>
                                    <span className='font-light text-black text-sm'>{chart.caption}</span>
                                    <p className="flex items-center gap-2 text-gray-700">
                                        <FaStar style={{ color: chart.color }} />
                                        <span className="font-semibold">{chart.count}</span>
                                        <span>{chart.value}</span>
                                    </p>
                                </div>
                                <div className="relative bg-gray-300 h-2 rounded my-2 w-full">
                                    <motion.span initial={{ width: 0 }} animate={{ width: `${chart.percentage}%` }} transition={{ delay: index * 1.5 + 0.3, duration: 0.5 }} className="absolute top-0 left-0 h-2 rounded" style={{ backgroundColor: chart.color }} />
                                </div>
                                <p className='text-black'>{chart.percentage}%</p>
                            </motion.div>
                        ))}

                        {/* Footer Note */}
                        <p className="text-gray-500 text-xs mt-2">
                            Since 30 Sept 2024, you’ve received
                        </p>
                    </div>


                    {/* Top Right: Flag Label */}
                    <div className="absolute md:right-5 top-70 md:top-85 bg-white rounded-xl shadow px-8 py-3 flex items-center gap-2 text-sm w-fit">
                        <HiFlag className="text-[#009F7D]" />
                        <span className="text-black font-medium">Flagged Reviews</span>
                    </div>

                    {/* Image Area */}
                    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full px-2 sm:px-6 mt-32 sm:mt-20">
                        <Image
                            src={KeyFeaturesImg}
                            alt="Dashboard Overview"
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                </div>


                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl sm:text-4xl text-center md:text-left font-bold text-green-900 leading-snug hidden md:block">
                        Key Features That Make It Unique and Effective
                    </h2>
                    <p className="hidden md:block mt-4 text-gray-600 text-base text-center md:text-left sm:text-lg">
                        Dragon Customer simplifies processes and builds strong connections.
                    </p>

                    <div className="mt-8 space-y-8">
                        {features?.map((feature) => (
                            <div key={feature.id} className="flex items-center gap-4">
                                <div className='bg-gray-100 p-2 text-black font-semibold rounded-full shadow-sm'>
                                    {feature.id}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default KeyFeatures;