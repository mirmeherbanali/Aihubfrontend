import ProfileCategories from "./ProfileCategories";
import ProfileDescription from "./ProfileDescription";
import ProfileInformationDetails from "./ProfileInformationDetails";
import ProfileInformationHeaderPart from "./ProfileInformationHeaderPart";

const ProfileInformationComponent = ({
  profileData,
  userType,
  primaryCategoryDetails,
  additionalCategoryDetails,
  customTitel
}) => {
  return (
    <>
      <ProfileInformationHeaderPart profileData={profileData} userType={userType} customTitel={customTitel} />
      <ProfileInformationDetails profileData={profileData} userType={userType} />
      {userType !== "admin" && (
        <>
          <ProfileDescription profileData={profileData} />
          <ProfileCategories
            profileData={profileData}
            primaryCategoryDetails={primaryCategoryDetails}
            additionalCategoryDetails={additionalCategoryDetails}
          />
        </>
      )}
    </>
  );
};

export default ProfileInformationComponent;