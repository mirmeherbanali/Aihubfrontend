import Categories from "./categories";
import FeaturedTools from "./FeaturedTools";
import {
  getCategories,
  getFourBlogsUnique,
  getTools,
} from "@/features/serverApi/serverApi";
import styles from "../ui/style/Home.module.scss";
import LatestNewsServer from "./LatestNewsServer";
import HomeSearchWrapper from "./HomeSearchWrapper";

export default async function HomePage() {
  const [categories, tools, blog] = await Promise.all([
    getCategories(),
    getTools(),
    getFourBlogsUnique(),
  ]);

  return (
    <div className={styles.homeContainer}>
      <HomeSearchWrapper categories={categories} tools={tools} />

      <Categories categoryData={categories} />
      <LatestNewsServer blog={blog} />
      <FeaturedTools toolData={tools} allCategories={categories} />
    </div>
  );
}