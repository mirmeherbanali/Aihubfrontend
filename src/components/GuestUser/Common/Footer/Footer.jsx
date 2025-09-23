import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const GuestFooter = () => {
    return (
        <footer className="bg-[#F0F9F7]">
            <div className="bg-[#004B3D] text-white px-6 sm:px-8 pt-12 pb-6 md:rounded-t-[4rem]">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Main Content Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left mb-8">
                        {/* Left Column */}
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                                "Join the Community and Share Your Thoughts Today!"
                            </h2>
                            <button className="bg-white text-[#004B3D] font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition-transform mb-6 md:mb-0">
                                Join the Journey!
                            </button>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1 max-w-2xl">
                            <p className="text-base md:text-lg leading-relaxed">
                                We are a trusted platform where professionals can share honest reviews about both clients and companies. Our mission is to create transparency and accountability in the business world, helping users make informed decisions based on real experiences. Whether you're reviewing a company or a client{" "}
                                <Link href="#" className="text-[#009F7D] hover:underline font-medium">Read more...</Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-4 pt-6 border-t border-white/20">
                        {/* Navigation Links - Moved to left on desktop */}
                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-6 text-base font-medium">
                            <Link href="/" className="hover:underline px-2 py-1">Home</Link>
                            <Link href="/reviews" className="hover:underline px-2 py-1">Write a review</Link>
                            <Link href="/about" className="hover:underline px-2 py-1">About Us</Link>
                            <Link href="/contact" className="hover:underline px-2 py-1">Contact</Link>
                        </div>

                        {/* Social Links - Right aligned on desktop */}
                        <div className="flex items-center gap-4">
                            <div className="flex space-x-3">
                                <Link href="#" className="border border-white p-2 rounded-md hover:bg-white/10 transition-colors">
                                    <FaInstagram size={18} />
                                </Link>
                                <Link href="#" className="border border-white p-2 rounded-md hover:bg-white/10 transition-colors">
                                    <FaFacebookF size={18} />
                                </Link>
                                <Link href="#" className="border border-white p-2 rounded-md hover:bg-white/10 transition-colors">
                                    <FaTwitter size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-white/20" />

                {/* Copyright */}
                <div className="text-center text-sm text-white/70">
                    © 2025 Dragon Customer. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default GuestFooter;