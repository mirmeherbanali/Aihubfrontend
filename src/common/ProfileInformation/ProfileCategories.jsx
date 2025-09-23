import React from "react";

const ProfileCategories = ({
  primaryCategoryDetails,
  additionalCategoryDetails,
}) => {
  const primaryCategory =
    primaryCategoryDetails?.name || "No Category Selected";
  const additionalCategories =
    additionalCategoryDetails
      ?.filter((cat) => cat._id !== primaryCategoryDetails?._id)
      .map((cat) => cat.name) || [];
  return (
    <div className="my-2 lg:my-4 bg-white rounded-[20px] p-3 md:p-7 mb-10">
      <h2 className="subheading text_primary mb-2">Primary Categories</h2>
      <p className="text_black font-normal regular bg_background rounded-lg px-5 py-2 w-max">
        {primaryCategory}
      </p>
      <h2 className="subheading text_primary mt-4 mb-2">
        Additional Categories
      </h2>
      <div className="flex flex-wrap gap-2 md:gap-4 mt-3">
        {additionalCategories.length > 0 ? (
          additionalCategories.map((category, index) => (
            <div
              key={index}
              className="w-max text_black font-normal regular bg_background rounded-lg px-5 py-2 flex-shrink-0"
            >
              {category}
            </div>
          ))
        ) : (
          <span className="text-gray-500">
            No additional categories selected
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileCategories;
