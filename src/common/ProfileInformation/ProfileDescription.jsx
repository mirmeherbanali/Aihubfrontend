import React from "react";

const ProfileDescription = ({ profileData }) => {
  return (
    <div className="my-2 lg:my-4 bg-white rounded-[20px] p-3 md:p-7 mb-10">
      <h2 className="subheading text_primary mb-3 md:mb-5">
        Company Description
      </h2>
      <p className="text_black font-normal regular">
        {profileData?.description || "Not Available"}
      </p>
    </div>
  );
};

export default ProfileDescription;
