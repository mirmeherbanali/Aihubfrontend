const SideNavbar = ({ categoryList, handleSelectCategory, selectedCategory }) => {
  
  return (
    <section className="hidden lg:block w-5/12 xl:w-1/4 shadow-md rounded-xl my-4 sidenavlist h-fit">
      <div className="bg-[#BDD1CD] p-4 font-bold content rounded-t-xl">
        Sectors Categories
      </div>
      {categoryList && categoryList?.length > 0 ? (
        <div className="bg_white rounded-b-xl overflow-hidden">
          {categoryList?.map((cat, _id) => (
            <p
              className={`p-4 content font-semibold border-b border-gray-200 cursor-pointer hover:text_secondary
              ${selectedCategory === cat?.name ? "text_secondary" : "text_black"}`}
              key={`tab-${cat._id}`}
              onClick={() => handleSelectCategory(cat)}
            >
              {cat.name}
            </p>
          ))}
        </div>
      ) : (
        <p>No categories available</p>
      )}
    </section>
  );
};

export default SideNavbar;