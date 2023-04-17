import React from "react";
import styles from "./faqListModal.module.scss";

const QuestionDetail = ({ question }) => {
  return (
    <div className={styles.questionDetail}>
      <div>
      <strong className={styles.questionTitle}>{question.title}</strong>
      <span className={styles.questionStatus}>{question.status}</span>
    </div>
    <div className={styles.answer}>{qustion.answer}</div>
    </div>
  );
};

export default QuestionDetail;