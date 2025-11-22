import React, { useState } from "react";
import styles from "../ui/style/pageHero.module.scss";
import { FaSearch, FaCogs, FaNetworkWired, FaRobot, FaArrowRight } from "react-icons/fa";
import ScrollDownArrow from "../shared/ScrollDownArrow";

interface PageHeroProps {
  content: string;
  subcontent: string;
  queryPlaceholder?: string;
  onSearch?: (query: string) => void;
  btnText?: string;
  onBtnClick?: () => void;
  liveSearch?: boolean;
}

const PageHero: React.FC<PageHeroProps> = ({
  content,
  subcontent,
  queryPlaceholder = "Enter your AI command...",
  onSearch,
  btnText = "Launch AI",
  onBtnClick,
  liveSearch = false
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <section className={styles.hero}>
      {/* Cyber Grid Background */}
      <div className={styles.cyberGrid}>
        <div className={styles.gridLines}></div>
        <div className={styles.cornerBox}></div>
        <div className={styles.cornerBox}></div>
        <div className={styles.cornerBox}></div>
        <div className={styles.cornerBox}></div>
      </div>

      {/* Animated Nodes */}
      <div className={styles.nodes}>
        <div className={styles.node}></div>
        <div className={styles.node}></div>
        <div className={styles.node}></div>
        <div className={styles.node}></div>
        <div className={styles.node}></div>
      </div>

      <div className={styles.content}>
        {/* Header with Icon */}
        <div className={styles.header}>
          {/* <div className={styles.iconWrapper}>
            <FaNetworkWired />
          </div> */}
          <h1 dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        
        <p className={styles.subtitle}>{subcontent}</p>

        {/* Cyber Search Box */}
        {onSearch && (
          <div className={styles.cyberSearchContainer}>
            <div className={`${styles.cyberSearch} ${isFocused ? styles.cyberFocused : ''}`}>
              <div className={styles.searchPrefix}>
                <span>AI`{'>'}` </span>
              </div>
              <input
                type="text"
                placeholder={queryPlaceholder}
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  if (liveSearch && onSearch) onSearch(val);
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div className={styles.searchSuffix}>
                <button onClick={handleSearch} className={styles.cyberButton}>
                  <FaArrowRight />
                  <span>Execute</span>
                </button>
              </div>
            </div>
            <div className={styles.commandHint}>
              Try: analyze data | generate code | create content | optimize process
            </div>
          </div>
        )}

        {/* Feature Pills */}
        <div className={styles.featurePills}>
          <div className={styles.pill}>
            <FaCogs />
            <span>Machine Learning</span>
          </div>
          <div className={styles.pill}>
            <FaRobot />
            <span>Neural Networks</span>
          </div>
          <div className={styles.pill}>
            <FaNetworkWired />
            <span>Deep Learning</span>
          </div>
        </div>

        {/* CTA Section */}
        {btnText && onBtnClick && (
          <div className={styles.ctaWrapper}>
            <button className={styles.cyberCta} onClick={onBtnClick}>
              <span>{btnText}</span>
              <div className={styles.cyberGlow}></div>
            </button>
          </div>
        )}
      </div>
      <ScrollDownArrow/>
    </section>
  ); 
};

export default PageHero;