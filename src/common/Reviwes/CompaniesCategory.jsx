"use client";

import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import fetchAPI from "../Hooks/fetchAPI";
import style from "./review.module.scss";

const getAllCategories = async (formData) => {
  try {
    const res = await fetchAPI({
      url: process.env.NEXT_PUBLIC_API_URL + "/admin/category/getAllCategory",
      method: "POST",
      body: formData || {},
    });
    return res.result.list;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

const CompanyCategories = ({ url, type }) => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCategories = async (searchValue = "") => {
    const data = await getAllCategories(
      searchValue ? { search: searchValue } : {}
    );
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearchCategories = (value) => {
    setSearch(value);
    fetchCategories(value);
  };

  const handleSetCategory = (value) => {
    sessionStorage.setItem("categoryName", JSON.stringify(value));
  };

  return (
    <section className="mx-4 xl:mx-auto bg-white rounded-2xl shadow-lg p-3 lg:p-6 max-w-7xl my-6">
      <h2 className="text-center subheading font-semibold text_primary mb-6 capitalize">Discover {type} by category</h2>
      <div className="md:max-w-2/3 mx-auto relative my-6">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearchCategories(e.target.value)}
          placeholder="Search by Categories"
          className="w-full rounded-full px-5 py-3 pl-10 content1 shadow-sm focus:outline-none bg_background"
        />
        <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      </div>
      <div className={`${style.categorygrid} grid md:grid-cols-4 gap-4`}>
        {categories && categories?.map((cat) => {
          return (
            <div key={cat?._id} onClick={() => handleSetCategory(cat)}>
              {url && (
                <Link href={url}
                  className="flex flex-col items-center justify-center p-4 rounded-xl transition shadow-sm hover:shadow-md h-[160px] cursor-pointer"
                >
                  <Image
                    src={cat?.categoryLogo}
                    alt={cat?.name}
                    width={48}
                    height={48}
                    className="mb-2"
                  />
                  <span className="content1 font-medium text-center">{cat.name}</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CompanyCategories;