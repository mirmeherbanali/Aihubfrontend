"use client";
import React from "react";
import styles from "../style/RadioPagination.module.scss";


interface RadioPaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const RadioPagination: React.FC<RadioPaginationProps> = ({
  totalPages,
  currentPage,
  onChange,
}) => {
  const groupSize = 3;

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      onChange(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      onChange(newPage);
    }
  };

  const getVisiblePages = () => {
    let pages: (number | string)[] = [];

    // find start of current 3-page group
    const start = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
    const end = Math.min(start + groupSize - 1, totalPages);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < totalPages - 1) {
      pages.push("...");
      pages.push(totalPages);
    } else if (end === totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.tabs}>
      {/* ⬅️ Prev Arrow */}
      <button
        className={`${styles.arrow} ${currentPage === 1 ? styles.disabled : ""}`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* Pages */}
      {visiblePages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className={styles.dots}>
            ...
          </span>
        ) : (
          <div className={styles.tabGroup} key={`page-${p}`}>
            <input
              id={`tab-${p}`}
              name="tab"
              type="radio"
              value={p}
              checked={currentPage === p}
              onChange={() => onChange(Number(p))}
            />
            <label htmlFor={`tab-${p}`}>
              <span>{p}</span>
            </label>
          </div>
        )
      )}

      {/* ➡️ Next Arrow */}
      <button
        className={`${styles.arrow} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default RadioPagination;