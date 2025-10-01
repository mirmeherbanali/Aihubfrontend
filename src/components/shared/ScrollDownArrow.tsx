import React from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "../ui/style/ScrollDownArrow.module.scss";

const ScrollDownArrow = () => {
  return (
    <div className={styles.scrollDown}>
      <FaChevronDown className={styles.arrow} />
      <FaChevronDown className={styles.arrow} />
    </div>
  );
};

export default ScrollDownArrow;
