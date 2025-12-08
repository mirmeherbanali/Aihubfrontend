"use client";

import { useState } from "react";
import styles from "../ui/style/Faq.module.scss";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";

const FaqItem = ({
  item,
  isOpen,
  onClick,
  index,
}: {
  item: any;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) => {
  return (
    <div className={`${styles.faqItem} ${styles.animatedDesign} ${isOpen ? styles.open : ""}`}>
      <header className={styles.faqHeader} onClick={onClick}>
        <div className={styles.questionMain}>
         
          <h3 className={styles.question}>{item.question}</h3>
        </div>
        <div className={styles.iconWrapper}>
          {isOpen ? <FaArrowDown className={styles.icon} /> : <FaArrowRight className={styles.icon} />}
        </div>
      </header>
      <div className={styles.answerWrapper}>
        <div className={styles.answerContent}>
          <div className={styles.answerHighlight}></div>
          <p className={styles.answer}>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FaqSection = ({ faqs }: { faqs: any[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) =>
    setOpenIndex(index === openIndex ? null : index);

  return (
     <section className={`${styles.faqSection} ${styles.glassSection}`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <p className={styles.subtitle}>Get answers to common questions about our platform</p>
      </div>
      <div className={styles.faqDeck}>
        {faqs.map((item, index) => (
          <FaqItem
            key={index}
            item={item}
            isOpen={index === openIndex}
            onClick={() => handleClick(index)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;