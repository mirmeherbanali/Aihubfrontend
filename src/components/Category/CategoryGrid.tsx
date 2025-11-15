"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../components/ui/style/CategoryGrid.module.scss";

interface CategoryGridProps {
  title: string;
  items: any[];
  onSelect?: (item: any) => void;
  searchQuery?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  title,
  items,
  onSelect,
  searchQuery = "",
}) => {
  const router = useRouter();
  const [loadingItem, setLoadingItem] = useState<string | null>(null);
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const handleClick = async (item: any) => {
    // Prevent multiple clicks
    if (loadingItem) return;
    
    setLoadingItem(item._id);
    setClickedItem(item._id);
    
    try {
      onSelect?.(item);
      const slug = item.categoryName.toLowerCase();
      await router.push(`/categories/${slug}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setLoadingItem(null);
      setClickedItem(null);
    }
  };

  // Get icon for category (you can customize this)
  const getCategoryIcon = (categoryName: string) => {
    const icons: { [key: string]: string } = {
      'design': '🎨',
      'development': '💻', 
      'marketing': '📈',
      'business': '💼',
      'writing': '✏️',
      'video': '🎥',
      'music': '🎵',
      'photo': '📷',
      'ai': '🤖',
      'data': '📊'
    };
    
    const defaultIcon = '🔮';
    const matchedKey = Object.keys(icons).find(key => 
      categoryName.toLowerCase().includes(key)
    );
    return matchedKey ? icons[matchedKey] : defaultIcon;
  };

  return (
    <section className={styles.categorySection}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.grid}>
        {items?.map((item) => {
          const isLoading = loadingItem === item._id;
          const isClicked = clickedItem === item._id;
          
          return (
            <div
              key={item._id}
              className={`${styles.cardEffect} ${
                isLoading ? styles.loading : ''
              } ${isClicked ? styles.clicked : ''}`}
              onClick={() => handleClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(item);
                }
              }}
            >
              {/* Loading Overlay */}
              {isLoading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                    <span className={styles.loadingText}>Loading...</span>
                  </div>
                </div>
              )}

              <div className={styles.cardInner}>
                <div className={styles.cardLiquid}></div>
                <div className={styles.cardShine}></div>
                <div className={styles.cardGlow}></div>

                <div className={styles.cardContent}>
                  <div className={styles.cardBadge}>NEW</div>

                  <div className={styles.cardImage}>
                    {isLoading ? (
                      <div className={styles.loadingIcon}>⏳</div>
                    ) : (
                      getCategoryIcon(item.categoryName)
                    )}
                  </div>

                  <div className={styles.cardText}>
                    <h3 
                      className={styles.cardTitle}
                      dangerouslySetInnerHTML={{ 
                        __html: highlightMatch(item.categoryName) 
                      }}
                    />
                    <p className={styles.cardDescription}>
                      {isLoading ? 'Loading category...' : `Discover amazing ${item.categoryName} tools`}
                    </p>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.cardStatus}>
                      {isLoading ? (
                        <div className={styles.loadingDots}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      ) : (
                        <div className={styles.cardPrice}>Explore</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;