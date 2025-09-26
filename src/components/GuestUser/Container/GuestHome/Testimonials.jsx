"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fetchAPI from '@/common/Hooks/fetchAPI';
import StarRating from '@/common/StarRating/StarRating';

const getAllTestimonials = async ()=>{
    try {
        const response = await fetchAPI({
         url: `${process.env.NEXT_PUBLIC_API_URL}/admin/testimonial/getAllTestimonial`,
         method: 'POST',
    });
    return response;
    }catch(error){
        console.log('checking error or testimonial', error);
    }
}

const Testimonials = () => {
    const [currentGroup, setCurrentGroup] = useState(0);
    const [testimonialList, setTestimonialList] = useState([]);

    // Change group every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGroup((prev) => (prev + 1) % 2);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const visibleTestimonials = testimonialList.slice(currentGroup * 3, (currentGroup + 1) * 3);

    useEffect(()=>{
        const fetchtestimonialList = async()=>{
            const response = await getAllTestimonials();
            setTestimonialList(response.result?.list);
         }
        fetchtestimonialList();
    }, []); 
   
    return (
        <section className="bg-[#F0F9F7] py-16 px-4 sm:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
                <div className="text-center md:text-left lg:w-1/2">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#004B3F] mb-6 leading-snug">
                        What Our Users Are <br /> Saying About Us
                    </h2>
                    <p className="text-gray-700 mb-8 text-base sm:text-lg">
                        In our Testimonials section, hear directly from our users about their experiences with Dragon Customer...
                    </p>
                    <button className="bg-[#004B3D] hover:bg-[#009F7D] duration-800 text-white font-semibold px-8 py-3 rounded-full shadow-md transition">
                        Join the Journey!
                    </button>
                </div>

                <div className="lg:w-1/2 space-y-5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentGroup}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-5"
                        >
                            {visibleTestimonials.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ rotateX: 90, opacity: 0 }}
                                    animate={{ rotateX: 0, opacity: 1 }}
                                    exit={{ rotateX: -90, opacity: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.2, ease: "easeInOut" }}
                                    className="bg-white rounded-2xl shadow-md p-2 flex items-start gap-4"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden',
                                    }}
                                >
                                    <div
                                        className="rounded-xl overflow-hidden flex-shrink-0"
                                        style={{ backgroundColor: 'bg-gray-400' }}
                                    >
                                        <Image
                                            src={t.image}
                                            alt={t.userName}
                                            width={80}
                                            height={10}
                                            className="object-cover w-[120px] h-[150px] rounded-xl"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-700 my-3 text-sm sm:text-base">{t.reviewText}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 font-semibold text-sm sm:text-base">{t.userName}</span>
                                            <div className="flex text-md">
                                                {/* {'★'.repeat(t.stars)} */}
                                                <StarRating rating={t.stars} totalStars={5}/>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
