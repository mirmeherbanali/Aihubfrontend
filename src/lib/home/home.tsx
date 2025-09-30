import React from "react";
import styles from "../../components/ui/style/home.module.scss";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>
          Discover the Best AI Tools <br /> for Every Need
        </h1>
        <p>
          Explore 1000+ AI tools categorized by use case, industry, pricing, and
          popularity.
        </p>

        {/* Search */}
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search for Tools & Categories" />
          <button>
            <FaSearch />
            <span>Search</span>
          </button>
        </div>

        {/* CTA */}
        <button className={styles.ctaBtn}>Add Your Tool</button>
      </div>
    </section>
  );
};

export default Home;
