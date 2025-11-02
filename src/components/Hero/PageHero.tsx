import React, { useState } from "react";
import styles from "../ui/style/pageHero.module.scss";
import { FaSearch } from "react-icons/fa";
import ScrollDownArrow from "../shared/ScrollDownArrow";

interface PageHeroProps {
  content: string;
  subcontent: string;
  queryPlaceholder?: string;
  onSearch?: (query: string) => void;
  btnText?: string;
  onBtnClick?: () => void;
  liveSearch?: boolean; // 👈 new prop
}

const PageHero: React.FC<PageHeroProps> = ({
  content,
  subcontent,
  queryPlaceholder = "Search...",
  onSearch,
  btnText = "Add Your Tool",
  onBtnClick,
  liveSearch = false
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

        {onSearch && (
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder={queryPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (liveSearch && onSearch) onSearch(val); // 👈 instant update
              }}
            />
            <button onClick={handleSearch}>
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        )}

        {btnText && onBtnClick && (
          <button className={styles.ctaBtn} onClick={onBtnClick}>
            {btnText}
          </button>
        )}
      </div>
      <ScrollDownArrow />
    </section>
  );
};

export default PageHero;
