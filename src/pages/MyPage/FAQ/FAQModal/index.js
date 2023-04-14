import { useState } from "react";
import { Button } from "../../../../components/Common";
import QuestionDetail from "./questionDetail";
import styles from "../faq.module.scss";

const FAQModal = ({ type, onClose }) => {
  const [questions, setQuestions] = useState([
    {
      title: "제목1",
      status: "답변 완료",
      answer: "제목1에 대한 답변입니다.",
      isExpanded: false,
    },
    {
      title: "제목2",
      status: "미답변",
      answer: "",
      isExpanded: false,
    },
    {
      title: "제목3",
      status: "답변 완료",
      answer: "제목3에 대한 답변입니다.",
      isExpanded: false,
    },
  ]);

  const handleQuestionClick = (index) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index].isExpanded = !newQuestions[index].isExpanded;
      return newQuestions;
    });
  };

  if (type === "questions") {
    return (
      <section>
        <h2>문의 내역</h2>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr
                key={index}
                onClick={() => handleQuestionClick(index)}
                className={styles.questionRow}
              >
                <td>{index + 1}</td>
                <td>{question.title}</td>
                <td>{question.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {questions.map((question, index) => (
          question.isExpanded && (
            <QuestionDetail key={index} question={question} />
          )
        ))}
      </section>
        )
    }
    else{
        return(
            
            <section>
                <h2>문의하기</h2>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="question">질문</label>
            <textarea id="question" name="question"></textarea>
          </div>
          <div className={styles.buttonGroup}>
            <Button type="submit">제출</Button>
            <Button type="button" onClick={onClose}>
              닫기
            </Button>
          </div>
          </form>
            </section>
        )
    }
}
export default FAQModal;