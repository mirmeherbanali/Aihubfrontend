import Banner from "@/components/GuestUser/Container/GuestHome/Banner";
import WhyDragonCustomer from "@/components/GuestUser/Container/GuestHome/WhyDragonCustomer";
import HonestReviews from "@/components/GuestUser/Container/GuestHome/HonestReviews";
import DiscoverCompanies from "@/components/GuestUser/Container/GuestHome/DiscoverCompanies";
import KeyFeatures from "@/components/GuestUser/Container/GuestHome/KeyFeatures";
import Testimonials from "@/components/GuestUser/Container/GuestHome/Testimonials";

export default function Home() {
  return (
    <>
      <Banner />
      <WhyDragonCustomer />
      <HonestReviews />
      <DiscoverCompanies />
      <KeyFeatures />
      <Testimonials />
    </>
  );
};