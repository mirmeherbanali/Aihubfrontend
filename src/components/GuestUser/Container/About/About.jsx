import Image from "next/image";
import HonestReviews from "@/assets/images/DC_Guest_User/HonestReviews/image.png";

const AboutUsSection = () => {
  return (
    <section className="bg-[#F4F6F8] py-12 px-4">
      <div className="max-w-7xl text-center md:text-left mx-auto space-y-10">
        {/* Section One */}
        <div className="bg-white rounded-xl shadow-md p-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#004B3D] mb-4">About us</h2>
            <p className="text-gray-700 mb-4">
              Dragon Customer was founded on a simple yet impactful vision: to create a reliable platform where individuals can share their experiences with both clients and companies, bringing transparency to the forefront of every business interaction.
            </p>
            <p className="text-gray-700">
              We believe that honest feedback drives better partnerships and stronger business decisions, allowing everyone to navigate professional relationships with confidence. Our platform empowers both customers and businesses to grow through meaningful and transparent exchanges.
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
            <Image
              src={HonestReviews}
              alt="Business discussion"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Section Two */}
        <div className="bg-white rounded-xl shadow-md p-8 space-y-5 text-gray-700">
          <p>
            Our platform is built to be open, impartial, and user-focused. Every review is verified, ensuring that only genuine insights contribute to our community. Whether you're looking to find dependable clients or learn more about potential business partners, Dragon Customer provides you with valuable insights you can trust.
          </p>
          <p>
            For professionals, Dragon Customer helps you make informed choices, avoiding common challenges like unclear communication or delayed payments. For businesses, it’s an opportunity to build credibility, learn from feedback, and enhance your service offerings.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection