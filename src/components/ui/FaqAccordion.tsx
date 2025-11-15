"use client";

import React from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./style/FaqAccordion.module.scss";

interface FAQFieldComponentProps {
  name: string;
  control: Control<any>;
}

export default function FAQFieldComponent({ name, control }: FAQFieldComponentProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { value = [], onChange } }) => (
        <div className={styles.faqContainer}>
          <h3 className={styles.faqTitle}>FAQs</h3>

          {value.map((faq: any, index: number) => (
            <div key={faq.id} className={styles.faqRow}>
              <div className={styles.inputGroup}>
                <input
                  className={styles.faqInput}
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...value];
                    updated[index].question = e.target.value;
                    onChange(updated);
                  }}
                  placeholder="Question"
                />
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  className={styles.faqTextarea}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...value];
                    updated[index].answer = e.target.value;
                    onChange(updated);
                  }}
                  placeholder="Answer"
                />
              </div>

              <button
                type="button"
                className={styles.faqDelete}
                onClick={() => {
                  const updated = value.filter((item: any) => item.id !== faq.id);
                  onChange(updated);
                }}
              >
                -
              </button>

              {/* + button only on the last row */}
              {index === value.length - 1 && (
                <button
                  type="button"
                  className={styles.faqAddBtn}
                  onClick={() => {
                    const newFAQ = { id: Date.now(), question: "", answer: "" };
                    onChange([...(value || []), newFAQ]);
                  }}
                >
                  +
                </button>
              )}
            </div>
          ))}

          {/* Show + if there are no FAQs yet */}
          {value.length === 0 && (
            <button
              type="button"
              className={styles.faqAddBtn}
              onClick={() => {
                const newFAQ = { id: Date.now(), question: "", answer: "" };
                onChange([newFAQ]);
              }}
            >
              +
            </button>
          )}
        </div>
      )}
    />
  );
}
