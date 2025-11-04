"use client"; // This component requires state, so it's a Client Component

import { useState } from "react";
import styles from "../ui/style/Faq.module.scss";
import { FaPlus } from "react-icons/fa";

// --- Reusable Child Component ---
const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}>
      {/* 1. Header: Always visible, triggers the onClick */}
      <header className={styles.faqHeader} onClick={onClick}>
        <h3 className={styles.question}>{item.question}</h3>
        <FaPlus className={styles.icon} />
      </header>

      {/* 2. Answer: Wraps the content for a smooth animation */}
      <div className={styles.answerWrapper}>
        <p className={styles.answer}>{item.answer}</p>
      </div>
    </div>
  );
};

// --- Main Parent Component ---
const FaqSection = () => {
  // This list holds all your FAQ data
  const faqData = [
    {
      question: "The expense windows adapted sir. Wrong widen drawn.",
      answer:
        "Offending belonging promotion provision an be oh consulted ourselves it. Blessing welcomed ladyship she met humoured sir breeding her."
    },
    {
      question: "Six curiosity day assurance bed necessary?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Produce say the ten moments parties?",
      answer:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Simple innate summer fat appear basket his desire joy?",
      answer:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      question: "Outward clothes promise at gravity do excited?",
      answer:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];

  // State to track the *index* of the open item.
  // We set it to 0 to match the image (first item open by default).
  // Set to null to have all closed by default.
  const [openIndex, setOpenIndex] = useState(0);

  const handleClick = (index) => {
    // If you click the *same* one that is open, close it (set to null)
    // Otherwise, open the new one
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <FaqItem
          key={index}
          item={item}
          isOpen={index === openIndex}
          onClick={() => handleClick(index)}
        />
      ))}
    </section>
  );
};

export default FaqSection;
