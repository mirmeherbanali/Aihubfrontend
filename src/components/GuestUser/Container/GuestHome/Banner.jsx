'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import StarWoman from '@/assets/images/DC_Guest_User/HeroBanner/woman-holds-bright-yellow-star-her-hands-possibly-representing-hope-inspiration.png';
import StarMan from '@/assets/images/DC_Guest_User/HeroBanner/customer-experience-concept-happy-client-tuning-rating-from-terrible-exellent-customer-reputatio.png';
import LaptopStars from '@/assets/images/DC_Guest_User/HeroBanner/cozy-modern-living-room-with-laptop-displaying-fivestar-rating-couch-with-bright-orange-pillows.png';
import Partner from '@/assets/images/DC_Guest_User/HeroBanner/realty-free-image-uhd-wallpaper.png';
import SocialTeam from '@/assets/images/DC_Guest_User/HeroBanner/creative-team-having-discussion-social-media-application.png';

import ShareIcon from '@/assets/images/DC_Guest_User/HeroBanner/Share.png';
import DiscoverIcon from '@/assets/images/DC_Guest_User/HeroBanner/Search.png';
import TrustIcon from '@/assets/images/DC_Guest_User/HeroBanner/Partner.png';
import EmpowerIcon from '@/assets/images/DC_Guest_User/HeroBanner/Empower.png';

import { useRouter } from 'next/navigation';

const Banner = () => {
    const text = "Write a Review";
    const router = useRouter();

    const ScrollContent = [
        { image: StarWoman, alt: "Star", icon: ShareIcon, text: "Share Uncover insights." },
        { image: StarMan, alt: "Star", icon: DiscoverIcon, text: "Discover Uncover insights." },
        { image: LaptopStars, alt: "Laptop", icon: TrustIcon, text: "Discover Uncover insights." },
        { image: Partner, alt: "Partner", icon: EmpowerIcon, text: "Trust Uncover insights." },
        { image: SocialTeam, alt: "Social Team", icon: TrustIcon, text: "Empower Uncover insights." },
    ];

    const leftContent = ScrollContent.slice(0, 2);
    const rightContent = ScrollContent.slice(2, 4);

    return (
        <section className="bg_primary text_white py-16 px-4 sm:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto text-center md:text-left flex flex-col lg:flex-row items-start gap-12">
                <div className="lg:w-1/2">
                    <p className="content1 font-light text-gray-300 mb-3">⚡ Your Voice, Their Choice – Powering <br className='block md:hidden' /> Smarter Decisions Together.</p>
                    <h2 className="landing leading-tight mb-6">
                        Empower the Community<br className='hidden md:block' />
                        Through Your{' '}
                        <span className="relative inline-block text-[#FFB627]">
                            Authentic
                            <motion.svg
                                viewBox="0 0 347 15"
                                className="w-full h-[15px] absolute -bottom-1 left-0"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                            >
                                <motion.path
                                    d="M2 12C30 24 320 2 345 12"
                                    stroke="#FFB627"
                                    strokeWidth="3"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                />
                            </motion.svg>
                        </span><br className='hidden md:block' />
                        {' '}Feedback
                    </h2>

                    {/* Hidden for Mobile layout and add in Another Component */}
                    <p className="text-base hidden md:block sm:text-lg text-gray-200 mb-8 max-w-xl">
                        "Share your honest reviews to guide others toward better choices and highlight trusted businesses, fostering a transparent and informed community!"
                    </p>


                    <motion.button onClick={() => router.push("/reviews")} className="relative rounded-full overflow-hidden group">
                        <motion.span className="px-10 py-3 bg-white font-semibold rounded-full shadow-md flex items-center gap-2 relative transition-colors duration-700 group-hover:bg-[#009F7D]">
                            {/* Layered Text with Identical Styling */}
                            <div className="relative">
                                {/* Static Shadow Text */}
                                <span className="absolute inset-0 flex text-[#004B3F]/40 group-hover:text-white pointer-events-none">
                                    {text.split("").map((letter, index) => (
                                        <span key={`shadow-${index}`} className="inline-block whitespace-pre">
                                            {letter === " " ? "\u00A0" : letter}
                                        </span>
                                    ))}
                                </span>

                                {/* Animated Text Layer */}
                                <span className="flex text-[#004B3F] whitespace-pre">
                                    {text.split("").map((letter, index) => (
                                        <motion.span
                                            key={`animated-${index}`}
                                            className="inline-block"
                                            initial={{ opacity: 1 }}
                                            animate={{ opacity: 0 }}
                                            transition={{ duration: 2.6, delay: index * 0.05, repeat: Infinity,}}
                                        >
                                            {letter === " " ? "\u00A0" : letter}
                                        </motion.span>
                                    ))}
                                </span>
                            </div>

                            {/* Sliding Emoji Icon */}
                            <motion.span
                                animate={{ x: [-160, -80, 0] }}
                                transition={{
                                    duration: 2.6,
                                    delay: 1,
                                    ease: "backInOut",
                                    repeat: Infinity,
                                }}
                                className="inline-block z-20"
                            >
                                ✏️
                            </motion.span>
                        </motion.span>
                    </motion.button>

                    {/* Hidden for Mobile layout and add in Another Component */}
                    {/* Desktop & Tablet View (md and up) */}
                    <div className="mt-12 hidden md:grid grid-cols-3 gap-1 text-center">
                        <div>
                            <motion.p initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-2xl font-bold">12k+</motion.p>
                            <motion.p initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-xs text-gray-300">Business Reviews</motion.p>
                        </div>
                        <div>
                            <motion.p initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-2xl font-bold">7k+</motion.p>
                            <motion.p initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-xs text-gray-300">Individual Reviews</motion.p>
                        </div>
                        <div>
                            <motion.p initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-2xl font-bold">205+</motion.p>
                            <motion.p initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="text-xs text-gray-300">Market Sectors</motion.p>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 h-[600px] flex gap-4 overflow-hidden relative mx-auto rounded-2xl">
                    <div className="absolute inset-0 top-0 h-30 bg-gradient-to-b from-[#035140] to-transparent opacity-60 rounded-2xl z-20"></div>

                    {/* Left Column: Scrolls Top to Bottom */}
                    <div className="w-1/2 h-full overflow-hidden">
                        <motion.div animate={{ y: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity, }} className="flex flex-col gap-4">
                            {leftContent.map((item, index) => (
                                <div key={index} className="flex flex-col gap-4">
                                    <div className="rounded-2xl overflow-hidden h-[300px]">
                                        <Image src={item.image} alt={item.alt} className="rounded-2xl object-cover w-full h-full" width={300} height={300} />
                                    </div>
                                    <div className={`p-4 flex flex-col justify-center items-center h-[130px] ${index % 2 === 0 ? 'bg-[#4C9382]' : 'bg-white text-[#004B3F]'} rounded-xl`} >
                                        <Image src={item.icon} alt={item.alt} className="mb-2" width={46} height={34} />
                                        <p className={`font-semibold text-lg ${index % 2 === 0 ? 'text-white' : ''}`}>
                                            {item.text.split(' ')[0]}
                                        </p>
                                        <p className={`text-sm ${index % 2 === 0 ? 'text-white' : ''}`}>
                                            {item.text.split(' ').slice(1).join(' ')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {leftContent.map((item, index) => (
                                <div key={`duplicate-${index}`} className="flex flex-col gap-4">
                                    <div className="rounded-2xl overflow-hidden h-[300px]">
                                        <Image src={item.image} alt={item.alt} className="rounded-2xl object-cover w-full h-full" width={300} height={300} />
                                    </div>
                                    <div className={`p-4 flex flex-col justify-center items-center h-[130px] ${index % 2 === 0 ? 'bg-[#4C9382]' : 'bg-white text-[#004B3F]'} rounded-xl`}>
                                        <Image src={item.icon} alt={item.alt} className="mb-2" width={46} height={46} />
                                        <p className={`font-semibold text-lg ${index % 2 === 0 ? 'text-white' : ''}`}>
                                            {item.text.split(' ')[0]}
                                        </p>
                                        <p className={`text-sm ${index % 2 === 0 ? 'text-white' : ''}`}>
                                            {item.text.split(' ').slice(1).join(' ')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column: Scrolls Bottom to Top */}
                    <div className="w-1/2 h-full overflow-hidden">
                        <motion.div animate={{ y: ["-50%", "0%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity, }} className="flex flex-col gap-4">
                            {rightContent.map((item, index) => (
                                <div key={index} className="flex flex-col gap-4">
                                    <div className="rounded-2xl overflow-hidden h-[300px]">
                                        <Image src={item.image} alt={item.alt} className="rounded-2xl object-cover w-full h-full" width={300} height={300} />
                                    </div>
                                    <div className={`p-4 flex flex-col justify-center items-center h-[130px] ${(index + 2) % 2 === 0 ? 'bg-[#4C9382]' : 'bg-white text-[#004B3F]'} rounded-xl`} >
                                        <Image src={item.icon} alt={item.alt} className="mb-2" width={46} height={46} />
                                        <p className={`font-semibold text-lg ${(index + 2) % 2 === 0 ? 'text-white' : ''}`}>
                                            {item.text.split(' ')[0]}
                                        </p>
                                        <p className={`text-sm ${(index + 2) % 2 === 0 ? 'text-white' : ''}`}>
                                            {item.text.split(' ').slice(1).join(' ')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {rightContent.map((item, index) => (
                                <div key={`duplicate-${index}`} className="flex flex-col gap-4">
                                    <div className="rounded-2xl overflow-hidden h-[300px]">
                                        <Image src={item.image} alt={item.alt} className="rounded-2xl object-cover w-full h-full" width={300} height={300} />
                                    </div>
                                    <div className={`p-4 flex flex-col justify-center items-center h-[130px] ${(index + 2) % 2 === 0 ? 'bg-[#4C9382]' : 'bg-white text-[#004B3F]'} rounded-xl`}>
                                        <Image src={item.icon} alt={item.alt} className="mb-2" width={46} height={46} />
                                        <p className={`font-semibold text-lg ${(index + 2) % 2 === 0 ? 'text-white' : ''}`}>
                                            {item.text.split(' ')[0]}
                                        </p>
                                        <p className={`text-sm ${(index + 2) % 2 === 0 ? 'text-white' : ''}`}>
                                            {item.text.split(' ').slice(1).join(' ')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div>
                    <p className="text-base block md:hidden sm:text-lg text-gray-200 mb-8 max-w-xl">
                        "Share your honest reviews to guide others toward better choices and highlight trusted businesses, fostering a transparent and informed community!"
                    </p>
                    <div className="mt-12 block md:hidden grid grid-cols-2 gap-2 text-center">
                        <div>
                            <p className="text-2xl font-bold">19k+</p> {/* 12k + 7k */}
                            <p className="text-md text-gray-300">Users Reviews</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">205+</p>
                            <p className="text-md text-gray-300">Market Sectors</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
