import Categories from "@/lib/home/categories";
import styles from "../components/ui/style/home.module.scss";
import Home from "@/lib/home/home";
import LatestNews from "@/lib/home/LatestNews";
import FeaturedTools from "@/lib/home/FeaturedTools";

export default function Page() {
  return (
    <>
      <Home />
      <Categories />
      <LatestNews />
      <FeaturedTools />
    </>
  );
}
