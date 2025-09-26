'use client'
import { motion } from 'framer-motion'
import BusinessReview from "@/assets/images/DC_Guest_User/WhyDragonCustomer/BusinessReview.png";
import ClientReview from "@/assets/images/DC_Guest_User/WhyDragonCustomer/ClientReviews.png";
import Star from "@/assets/images/DC_Guest_User/WhyDragonCustomer/Star.png";
import Verified from "@/assets/images/DC_Guest_User/WhyDragonCustomer/Verified.png";
import Fireworks from "@/assets/images/DC_Guest_User/WhyDragonCustomer/Fireworks.gif";
import Image from 'next/image';


const FloatingBadges = () => {

    const badgeVariants1 = [
        { image: BusinessReview, text: <span className="text-xs md:text-sm font-medium leading-tight">20K+ <br /> Company Reviews</span> },
        { image: ClientReview, text: <span className="text-xs md:text-sm font-medium leading-tight">10K+ <br /> Client Reviews</span> },
    ];

    const badgeVariants2 = [
        { image: Verified, text: <span className="text-sm font-medium leading-tight">Reviews</span> },
        { image: Star, text: <span className="text-sm font-medium leading-tight">Verified</span> },
    ];

    return (
        <>
            <motion.div className="h-[46px] w-[80%] md:w-fit overflow-hidden absolute text-black top-6 right-30 md:right-45 bg-white px-4 py-2 rounded-xl shadow-md flex flex-col justify-start items-center">
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


            <motion.div className="h-[36px] w-fit overflow-hidden absolute text-black bottom-4 -right-10 bg-white px-4 py-2 rounded-xl shadow-md flex flex-col justify-start items-center" style={{backgroundImage: `url(${Fireworks.src})`, backgroundSize: 'cover'}}>
                <motion.div
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    className="flex flex-col"
                >
                    {[...badgeVariants2, ...badgeVariants2].map((value, index) => (
                        <div key={index} className="flex items-center gap-2 h-[36px]">
                            <Image src={value.image} height={20} width={20} alt='icons' />
                            {value.text}
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </>
    )
}

export default FloatingBadges
