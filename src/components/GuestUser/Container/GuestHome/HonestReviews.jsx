'use client';
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import BusinessMeeting from "@/assets/images/DC_Guest_User/HonestReviews/image.png"; // Replace with your image path
import Avatar from "@/assets/images/DC_Guest_User/HonestReviews/Avatar.png"; // Optional: reviewer's avatar
import Fireworks from "@/assets/images/DC_Guest_User/WhyDragonCustomer/Fireworks.gif";
import Announcement from "@/assets/images/DC_Guest_User/HonestReviews/Announcement.png";
import Clock from "@/assets/images/DC_Guest_User/HonestReviews/Clock.png";
import Search from "@/assets/images/DC_Guest_User/HonestReviews/Search.png";

const HonestReviews = () => {
    const badgeVariants1 = [
        { image: Announcement, text: <span className="text-xs font-medium leading-tight">Share your Service <br /> experiences</span> },
        { image: Search, text: <span className="text-xs font-medium leading-tight">Uncover genuine <br /> client insights</span> },
        { image: Clock, text: <span className="text-xs font-medium leading-tight">Find trusted <br /> feedback instantly</span> },
    ];
    return (
        <section className="bg-[#F4FBF9] py-20 px-6 md:px-12">
            <h2 className="text-2xl md:text-5xl font-bold text-center text-[#004B3D] leading-snug mb-16">
                Empower Smarter Decisions with Honest Reviews
            </h2>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="relative lg:w-1/2 w-full">
                    <Image
                        src={BusinessMeeting}
                        alt="Business Meeting"
                        width={600}
                        height={400}
                        className="rounded-xl object-cover w-full h-auto"
                    />
                    <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-white rounded-xl p-2 md:p-3 shadow-xl xl:w-64">
                        <div className="flex items-center gap-3 md:mb-2">
                            <Image
                                src={Avatar}
                                alt="Reviewer"
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-black text-xs">Chris John</p>
                                <p className="text-gray-500 text-xs">Excellent (5k Reviews)</p>
                            </div>
                        </div>

                        <div className="hidden md:flex text_primary mb-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="mr-1" />
                            ))}
                        </div>

                        <p className="text-sm text-gray-700 leading-snug hidden md:block">
                            Great client! <br />
                            Clear communication. <br />
                            Highly recommended.
                        </p>
                    </div>

                    <motion.div className="h-[56px] w-fit overflow-hidden absolute text-black bottom-2 md:bottom-4 right-2 md:right-4 bg-white px-4 py-2 rounded-xl shadow-md flex flex-col justify-start items-center" style={{backgroundImage: `url(${Fireworks.src})`, backgroundSize: 'cover'}}>
                        <motion.div
                            animate={{ y: ["0%", "-50%"] }}
                            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                            className="flex flex-col"
                        >
                            {[...badgeVariants1, ...badgeVariants1].map((value, index) => (
                                <div key={index} className="flex items-center gap-2 h-[46px]">
                                    <Image src={value.image} height={30} width={30} alt='icons' />
                                    {value.text}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                <div className="lg:w-1/2 w-full text-center lg:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                        Make informed choices
                    </h3>
                    <p className="text-gray-600 mb-8 text-base md:text-lg">
                        Empower others to make smarter decisions before engaging with a company or client.
                    </p>
                    <button className="bg-[#004B3D] text-white font-semibold px-18 py-3 rounded-full shadow-md hover:bg-[#009F7D] duration-800 transition-transform">
                        Get Started
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HonestReviews;