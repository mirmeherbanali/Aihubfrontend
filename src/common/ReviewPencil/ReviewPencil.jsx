import React from "react";
import { motion } from "framer-motion";
import Fireworks from "@/assets/images/DC_Guest_User/WhyDragonCustomer/Fireworks.gif";
import { useRouter } from "next/navigation";

const ReviewPencil = () => {
  const router = useRouter();
  return (
    <div
      className="fixed bottom-3 right-3 z-50 lg:hidden"
      onClick={() => router.push("/reviews")}
    >
      <div
        className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg cursor-pointer bg_primary"
        style={{
          backgroundImage: `url(${Fireworks.src})`,
          backgroundSize: "cover",
        }}
      >
        <motion.span
          animate={{ rotate: [2, 7, 3], scale: [1, 0.95, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-2xl leading-none flex items-center justify-center"
        >
          ✏️
        </motion.span>
      </div>
    </div>
  );
};

export default ReviewPencil;
