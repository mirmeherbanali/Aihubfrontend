import Image from "next/image";
import Reviews from "@/assets/images/DC_Guest_User/WhyDragonCustomer/image.png";
import FloatingBadges from "./FloatingBadges";

const WhyDragonCustomer = () => {
    return (
        <section className="bg-white py-16 px-6 md:px-12">
            <h1 className="text-2xl md:text-5xl font-bold text-center text-[#004B3D] leading-snug mb-12">
                Genuine Reviews, Thoroughly Verified for Trust
            </h1>
            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-6">
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                        Why Dragon Customer ?
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base mb-8">
                        Dragon Customers ensures verified, authentic reviews, helping users make informed decisions about clients and companies.
                    </p>
                    <button className="bg-[#004B3D] w-[80%] md:w-fit text-white font-semibold px-18 py-3 rounded-full shadow-md hover:bg-[#009F7D] duration-800 transition-transform">
                        Join Us!
                    </button>
                </div>
                <div className="relative lg:w-1/2 flex justify-end">
                    <Image src={Reviews} alt="Business woman" width={230} height={100} className="rounded-2xl object-cover" />
                    <div className="overflow-hidden h-10">
                        <FloatingBadges />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyDragonCustomer;