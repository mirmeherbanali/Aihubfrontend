"use client";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const mobileData = [
  {
    number: "7911 123456",
    client: "Chris John",
    address: "123 High Street, Kensington, London, UK",
    postcode: "SW17 2AZ",
    reviews: "3.6K reviews",
  },
  {
    number: "7911 654321",
    client: "Albert Flores",
    address: "1901 Thornridge Cir, Shiloh, UK",
    postcode: "SW17 2AZ",
    reviews: "3.6K reviews",
  },
];

const ReviewSearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  return (
    <section className="px-4">
      <div className="bg_primary text-white py-10 px-4 rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] mx-auto max-w-7xl text-center my-6">
        <h2 className="heading">
          Write a review and help others make the right decisions.
        </h2>

        <div className="max-w-2xl mx-auto relative mt-6">
          <input
            type="text"
            placeholder="Search by Mobile number or Postcode"
            className="w-full rounded-md md:rounded-full px-5 py-3 pl-10 text-sm text-black bg-white placeholder:text-gray-500 shadow-md focus:outline-none"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <IoSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          {isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white text-black rounded-2xl shadow-lg max-h-60 overflow-y-auto z-10">
              {searchQuery.length > 0 ? (
                mobileData.map((mobile, index) => (
                  <div
                    key={index}
                    className="flex justify-between px-4 py-3 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                        {mobile.client[0]}
                      </div>
                      <div className="text-start">
                        <p className="content">{mobile.client}</p>
                        <p className="text-gray-500">{mobile.number}</p>
                        <p className="text_primary">{mobile.address}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text_black">{mobile.reviews}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4">
          <Link
            href="/business/add_individual_user"
            className="text-sm text-white/80 hover:text-white transition"
          >
            Can’t find a client? <span>Add here</span> →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewSearchSection;
