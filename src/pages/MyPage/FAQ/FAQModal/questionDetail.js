import React from "react";
import styles from "../faq.module.scss";

const QuestionDetail = ({ question }) => {
  return (
    <div className={styles.questionDetail}>
      <div className={styles.questionTitle}>{question.title}</div>
      <div className={styles.questionStatus}>{question.status}</div>
      <div className={styles.questionAnswer}>{question.answer}</div>
    </div>
  );
};

export default QuestionDetail;