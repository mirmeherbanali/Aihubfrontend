"use client";

import { motion } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function NotFound() {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg_background`}>
                <main>
                    <div className="min-h-screen w-full bg_primary flex items-center justify-center px-4">
                        <div className="flex flex-col items-center justify-center text-white text-center">
                            {/* Mock browser window with sad face */}
                            <motion.div className="relative bg_white rounded-xl shadow-2xl md:p-6 w-[300px] md:w-[500px] lg:w-[600px]">
                                <div className="flex justify-start bg_black p-4 rounded-t-xl gap-2">
                                    <motion.span
                                        className="h-4 w-4 bg-red-500 rounded-full"
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.2, delay: 0, ease: "easeInOut" }}
                                    />
                                    <motion.span
                                        className="h-4 w-4 bg-yellow-400 rounded-full"
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.2, delay: 0.2, ease: "easeInOut" }}
                                    />
                                    <motion.span
                                        className="h-4 w-4 bg-green-500 rounded-full"
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                                    />
                                </div>


                                <div className="flex flex-col items-center bg-gray-100 rounded-b-xl justify-center py-16">
                                    {/* Face */}
                                    <div className="flex gap-8 items-center justify-center mb-4">
                                        <motion.span
                                            className="w-8 h-8 bg-gray-800 rounded-full"
                                            animate={{ scaleY: [1, 0.1, 1] }}
                                            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                                        />
                                        <motion.span
                                            className="w-8 h-8 bg-gray-800 rounded-full"
                                            animate={{ scaleY: [1, 0.1, 1] }}
                                            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                                        />
                                    </div>

                                    <svg width="70" height="50" viewBox="0 0 50 20" className="mb-4">
                                        <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }} d="M5 5 C12 -5, 50 -10, 45 20" stroke="gray" strokeWidth="2" fill="none" />
                                    </svg>
                                    <h2 className="font-bold text-lg text-gray-800">Be back soon!</h2>
                                    <p className="text-sm text-gray-500">"Sorry, we can't find the page you're looking for."</p>
                                </div>

                                {/* Bandages */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="absolute px-5 hidden md:flex justify-between -left-32 top-52 bg-[#EDB26D] w-62 rounded-full shadow-xl h-14 rotate-[-35deg]">
                                    <div className="flex items-center justify-center h-full gap-2">
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <div className="bg_white rounded-lg flex flex-col px-3 items-center justify-center h-full gap-2">
                                            <div className="flex gap-2">
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center h-full gap-2">
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="absolute px-5 hidden md:flex justify-between -right-28 top-8 bg-[#EDB26D] w-62 rounded-full shadow-xl h-14 rotate-[28deg]">
                                    <div className="flex items-center justify-center h-full gap-2">
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <div className="bg_white rounded-lg flex flex-col px-3 items-center justify-center h-full gap-2">
                                            <div className="flex gap-2">
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                                <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center h-full gap-2">
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                            <span className="bg-[#D59A43] rounded-full h-2 w-2"></span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Separator */}
                            <div className="md:w-[900px] h-[2px] bg-black/20 rounded-full shadow"></div>

                            {/* 404 text and button */}
                            <h1 className="text-7xl md:text-8xl font_Nanum">404</h1>
                            <p className="text-xl my-2">Try again later!</p>
                            <button className="bg_secondary transition-all text-white font-medium px-6 py-2 rounded-full shadow-xl mt-4">
                                Return to Home
                            </button>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
};