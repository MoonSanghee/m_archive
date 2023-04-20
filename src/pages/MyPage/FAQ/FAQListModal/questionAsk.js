import React, { useEffect,useState } from "react";
import styles from "./faqListModal.module.scss";


const QuestionAsk = ({ question }) => {
  console.log(question.faqComment)
  const [answer, setAnswer] = useState('답변을 준비중입니다.')
  useEffect(() => {
    if (question.faqComment) {
      setAnswer(question.faqComment.content)
    }
  }, [question, answer]);

  return (
    <div className={styles.questionDetail}>
     
      <div className={styles.answer}>{answer}</div>
    </div>
  );
};

export default QuestionAsk;