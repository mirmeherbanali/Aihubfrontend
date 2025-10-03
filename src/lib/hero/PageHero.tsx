import React, { useState } from "react";
import styles from "../../components/ui/style/pageHero.module.scss";
import { FaSearch } from "react-icons/fa";
import ScrollDownArrow from "@/components/shared/ScrollDownArrow";

interface PageHeroProps {
  content: string;
  subcontent: string;
  queryPlaceholder?: string;
  onSearch?: (query: string) => void;
  btnText?: string;
  onBtnClick?: () => void;
}

const PageHero: React.FC<PageHeroProps> = ({
  content,
  subcontent,
  queryPlaceholder = "Search...",
  onSearch,
  btnText = "Add Your Tool",
  onBtnClick
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 dangerouslySetInnerHTML={{ __html: content }} />
        <p>{subcontent}</p>

        {/* Search */}
        {onSearch && (
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder={queryPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        )}

        {/* CTA */}
        {btnText && onBtnClick && (
          <button className={styles.ctaBtn} onClick={onBtnClick}>
            {btnText}
          </button>
        )}
      </div>

      {/* Scroll Down Arrow */}
      <ScrollDownArrow />
    </section>
  );
};

export default PageHero;
