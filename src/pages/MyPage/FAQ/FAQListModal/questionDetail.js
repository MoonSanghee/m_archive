import React, { useEffect,useState } from "react";
import styles from "./faqListModal.module.scss";


const QuestionDetail = ({ question }) => {

  const [answer, setAnswer] = useState('답변을 준비중입니다.')
  useEffect(() => {
    if (question.faqComment && question.faqComment !== answer) {
      setAnswer(question.faqComment)
    }
  }, [question, answer]);

  return (
    <div className={styles.questionDetail}>
      {/* <strong className={styles.questionTitle}>{question.title}</strong>
      <span className={styles.questionStatus}>{question.status}</span>*/}
      <div className={styles.questionContent}>{question.content}</div>
    <div className={styles.answer}>{answer}{question.answer}</div>
</div>
  );
};

export default QuestionDetail;