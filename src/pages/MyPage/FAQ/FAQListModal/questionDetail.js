import React from "react";
import styles from "./faqListModal.module.scss";

const QuestionDetail = ({ question }) => {
  return (
    <div className={styles.questionDetail}>
      {/* <strong className={styles.questionTitle}>{question.title}</strong>
      <span className={styles.questionStatus}>{question.status}</span>*/}
      <div className={styles.questionContent}>{question.content}</div>
    <div className={styles.answer}>답변(지울예정){question.answer}</div>
</div>
  );
};

export default QuestionDetail;