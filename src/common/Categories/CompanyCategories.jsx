"use client";

import CategoryListPage from "./CategoriesList";
import SearchbarWithToggle from "./SearchbarWithToggle";
import SideNavbar from "./SideNavbar";
import fetchAPI from "@/common/Hooks/fetchAPI";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [individualData, setIndividualData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('Business');
  const router = useRouter();

  const getAllCategories = async () => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/category/getAllCategory`,
        method: "POST",
      });
      setCategoryList(response?.result?.list);
      const categoryName = JSON.parse(sessionStorage.getItem("categoryName"));
      setSelectedCategory(categoryName?.name || response?.result?.list[0]?.name);
    } catch (error) {
      return [];
    }
  };

  const getAllBusiness = async (data) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/business/business/getAllBusiness`,
        method: "POST",
        body: data,
      });
      setBusinessData(response?.result?.list);
    } catch (error) {
      setBusinessData([]);
    }
  };

  const getAllIndividuals = async (data) => {
    try {
      const response = await fetchAPI({
        url: `${process.env.NEXT_PUBLIC_API_URL}/individual/individual/getAllIndividuals`,
        method: "POST",
        body: data,
      });
      setIndividualData(response?.result?.list);
    } catch (error) {
      setIndividualData([]);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const categoryName = JSON.parse(sessionStorage.getItem("categoryName"));
    getAllBusiness({ category: categoryName?._id || categoryList[0]?._id });
    getAllIndividuals({ category: categoryName?._id || categoryList[0]?._id });
  }, [categoryList]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category?.name);
    if (activeTab === 'Business') {
      getAllBusiness({ category: category?._id });
    } else {
      getAllIndividuals({ category: category?._id });
    }
  };

  const handleSelectedTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'Business') {
      getAllBusiness({ category: categoryList[0]?._id });
    } else {
      getAllIndividuals({ category: categoryList[0]?._id });
    }
  };

  const handleViewReviewForDetails = (id) => {
    sessionStorage.setItem("reviewForId", id);
    router.push('/reviews/view_user_reviews')
  };

  const categoryData = activeTab === 'Business' ? businessData : individualData;

  return (
    <section className="bg_background py-4 px-6 lg:px-24">
      <SearchbarWithToggle activeTab={activeTab} setActiveTab={setActiveTab} handleSelectedTab={handleSelectedTab} />
      <div className="flex w-full gap-x-8">
        <SideNavbar categoryList={categoryList} handleSelectCategory={handleSelectCategory} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <div className="w-full flex flex-col gap-4">
          <p className="font-bold mt-8 text_secondary subheading">{selectedCategory && selectedCategory} {businessData && businessData?.length} reviews found</p>
          <CategoryListPage categoryData={categoryData} width="full" handleViewReviewForDetails={handleViewReviewForDetails} />
        </div>
      </div>
    </section>
  );
};

export default CategoryList;