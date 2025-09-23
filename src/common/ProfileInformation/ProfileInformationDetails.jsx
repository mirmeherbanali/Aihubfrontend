import React from "react";

const ProfileInformationDetails = ({ profileData, userType }) => {
  const getBusinessFields = () => [
    {
      label: "Company Name",
      value: profileData?.name || "Not Available",
    },
    {
      label: "Company Domain",
      value: profileData?.domain
        ? profileData?.domain.replace(/^https?:\/\//, "").replace(/\/$/, "")
        : "Not Available",
    },
    {
      label: "Register Address",
      value: profileData?.address || "Not Available",
    },
  ];

  const getIndividualFields = () => [
    {
      label: "First Name",
      value: profileData?.firstName || "Not Available",
    },
    {
      label: "Last Name",
      value: profileData?.lastName || "Not Available",
    },
    {
      label: "Register Address",
      value: profileData?.address || "Not Available",
    },
    {
      label: "Language",
      value:
        profileData?.language?.length > 0
          ? profileData.language.join(", ")
          : "Not Available",
    },
  ];

  const getAdminFields = () => [
    {
      label: "First Name",
      value: profileData?.firstName || "Not Available",
    },
    {
      label: "Last Name",
      value: profileData?.lastName || "Not Available",
    },
    {
      label: "Language",
      value:
        profileData?.language?.length > 0
          ? profileData.language.join(", ")
          : "Not Available",
    },
  ];
  const getCommonFields = () => [
    {
      label: "Phone Number",
      value:
        profileData?.phoneCode?.trim() && profileData?.phone?.trim()
          ? `${profileData.phoneCode.trim()} ${profileData.phone.trim()}`
          : "Not Available",
    },
    {
      label: "Postcode/ZipCode",
      value: profileData?.postCode || "Not Available",
    },
    {
      label: "City",
      value: profileData?.city || "Not Available",
    },
    {
      label: "Country",
      value: profileData?.country || "Not Available",
    },
  ];
  const informationData = [
    ...(userType === "business" ? getBusinessFields() : []),
    ...(userType === "individual" ? getIndividualFields() : []),
    ...(userType === "admin" ? getAdminFields() : []),
    ...getCommonFields(),
  ];

  return (
    <>
      <div className="my-2 lg:my-4 bg-white rounded-[20px] p-3 md:p-7 mb-10">
        <h2 className="subheading text_primary">
          {userType === "business"
            ? "Business"
            : userType === "admin"
            ? "Admin"
            : "User"}{" "}
          Information
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
          {informationData?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#f5f5f5] rounded-md p-2 md:p-4"
            >
              <p className="text_black font-normal regular">{item.label}</p>
              <p className="text_primary font-semibold regular">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileInformationDetails;
