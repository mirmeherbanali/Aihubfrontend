"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import fetchAPI from "@/common/Hooks/fetchAPI";
import { useEffect, useState } from "react";

const getAllCategories = async () => {
  try {
    const res = await fetchAPI({
      url: process.env.NEXT_PUBLIC_API_URL + "/admin/category/getAllCategory",
      method: "POST",
    });
    return res.result.list;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

const DiscoverCompanies = () => {
    const [categoryList, setCategoryList ] = useState([]);
    const sliderItems = [...categoryList, ...categoryList];
    const router = useRouter();

    useEffect(()=>{
      const fetchCategoryList = async ()=>{
            const response = await getAllCategories();
            setCategoryList(response); 
      }     
      fetchCategoryList();
    }, []);

    return (
        <section className="py-16 px-6 md:px-10 bg-white overflow-hidden">
            <h2 className="text-center text-2xl md:text-4xl font-bold text-[#004B3D] mb-12">
                Discover companies within <br className="hidden md:block" /> each category
            </h2>
            <div className="relative overflow-hidden max-w-7xl mx-auto whitespace-nowrap rounded-2xl">
                <motion.div
                    className="flex gap-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "linear",
                    }}
                >
                    {sliderItems.map((cat, i) => (
                        <div key={i} className="flex flex-col items-center min-w-[160px]">
                            <Image
                                src={cat.categoryImage}
                                alt={cat.name}
                                width={160}
                                height={160}
                                className="rounded-2xl object-cover w-[160px] h-[160px]"
                            />
                            <p className="mt-3 text-sm md:text-base font-medium text-gray-800 whitespace-normal text-center">
                                {cat.name}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="flex justify-center mt-10">
                <button onClick={() => router.push("/reviews")} className="bg-[#004B3D] text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform hover:bg-[#009F7D] duration-800">
                    Explore Categories
                </button>
            </div>
        </section>
    );
};

export default DiscoverCompanies;