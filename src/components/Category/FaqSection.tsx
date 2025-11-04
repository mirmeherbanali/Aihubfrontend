"use client";

import { useState } from "react";
import styles from "../ui/style/Faq.module.scss";
import { FaPlus } from "react-icons/fa";

const FaqItem = ({
  item,
  isOpen,
  onClick,
}: {
  item: any;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}>
      <header className={styles.faqHeader} onClick={onClick}>
        <h3 className={styles.question}>{item.question}</h3>
        <FaPlus className={styles.icon} />
      </header>
      <div className={styles.answerWrapper}>
        <p className={styles.answer}>{item.answer}</p>
      </div>
    </div>
  );
};

const FaqSection = ({ faqs }: { faqs: any[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) =>
    setOpenIndex(index === openIndex ? null : index);

  return (
    <section className={styles.faqSection}>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((item, index) => (
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
