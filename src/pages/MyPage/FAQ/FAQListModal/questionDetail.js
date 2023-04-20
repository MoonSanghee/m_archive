import React, { useEffect,useState } from "react";
import styles from "./faqListModal.module.scss";


const QuestionDetail = ({ question }) => {
  return (
    <div className={styles.questionDetail}>
      <div className={styles.questionContent}>{question.content}</div>      
    </div>
  );
};

export default QuestionDetail;