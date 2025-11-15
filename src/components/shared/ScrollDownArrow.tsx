import React from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "../ui/style/ScrollDownArrow.module.scss";

const ScrollDownArrow = () => {
  return (
    <div className={styles.scrollDown}>
      <div className={styles.arrows}>
        {/* <FaChevronDown className={styles.arrow} /> */}
        <FaChevronDown className={styles.arrow} />
      </div>
    </div>
  );
};

export default ScrollDownArrow;
