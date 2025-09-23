import React from "react";
import Image from "next/image";
import Linkedin from "@/assets/images/Signup/linkedin.png";
import Fb from "@/assets/images/Signup/fb.png";
import Google from "@/assets/images/Signup/google.png";

const SocialButtons = () => {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center mt-4">
      <p className="text-[#333333] text-opacity-50">Or</p>
      <div className="flex gap-x-4">
        <Image
          src={Google}
          alt="Google"
          title="Sign in with Google"
          className="w-14 h-14 cursor-pointer"
        />
        <Image
          src={Linkedin}
          alt="Linkedin"
          title="Sign in with LinkedIn"
          className="w-14 h-14 cursor-pointer"
        />
        <Image
          src={Fb}
          alt="Facebook"
          title="Sign in with Facebook"
          className="w-14 h-14 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SocialButtons;