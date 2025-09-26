"use client";

import { MdOutlineModeEdit } from "react-icons/md";
import Image from "next/image";
import userProfile from "@/assets/images/Review_Screen/profile_image.png";
import { useRouter } from "next/navigation";

const ProfileInformationHeaderPart = ({ profileData, userType }) => {
  const router = useRouter();
  const handleEdit = () => {
    if (userType === "business") {
      router.push("/business/settings/profile");
    } else if (userType === "individual") {
      router.push("/individual/settings/profile");
    } else if (userType === "admin") {
      router.push("/admin/admin_settings");
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="subheading text_primary">Profile Information</h2>
        <button
          type="button"
          onClick={() => handleEdit()}
          className="cursor-pointer text-[14px] lg:text-[18px] font-semibold flex items-center gap-x-2 bg_secondary rounded-[30px] py-2 px-3 md:py-3 md:px-5 text-center text-white"
        >
          Edit Profile
          <MdOutlineModeEdit className="text-[20px]" />
        </button>
      </div>
      <div className="my-2 lg:my-4">
        <div className="flex items-center gap-3 md:gap-5 bg-white rounded-[20px] p-3 md:p-7">
          <div className="flex-shrink-0 w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-gray-100">
            <Image
              src={profileData?.profilePic || userProfile}
              alt="User profile"
              width={100}
              height={100}
              className="w-full h-full object-cover"
              title="User profile"
            />
          </div>

          <div className="flex flex-col justify-center gap-y-1 min-w-0">
            {userType === "business" && (
              <h2 className="subheading text_primary truncate">
                {profileData?.name || "Not Available"}
              </h2>
            )}
            {(userType === "individual" || userType === "admin") && (
              <h2 className="subheading text_primary truncate">
                {profileData?.firstName || "Not Available"}{" "}
                {profileData?.lastName || "Not Available"}
              </h2>
            )}
            <p className="text_black font-semibold capitalize regular md:text-base">
              {userType === "business" ? "Business User" : userType === "individual" ? "Individual User" : "Admin User"}
            </p>
            {userType === "business" ||
              (userType === "individual" && (
                <p className="text_black font-normal regular truncate">
                  {profileData?.address || "Not Available"}
                </p>
              ))}
            {userType === "admin" && (
              <p className="text_black font-normal regular truncate">
                {profileData?.city || "Not Available"}
                {","} {profileData?.country || "Not Available"}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformationHeaderPart;
