import { useState } from 'react';
import { Button } from '../../../../components/Common';
import QuestionDetail from './questionDetail';
import styles from '../faq.module.scss';
import { createFaq } from '../../../../api/FAQ';

//NOTE: "문의하기 모달" 과 "문의내역 모달" 2개는 구분을해서 만드는게 좋다.
//NOTE: scss파일은 js파일 하나 당 1개 => 유지보수가 쉬워짐
const FAQModal = ({ type, onClose }) => {
  //NOTE: questions => faqs
  const [questions, setQuestions] = useState([
    {
      title: '제목1',
      status: '답변 완료',
      answer: '제목1에 대한 답변입니다.',
      isExpanded: false,
    },
    {
      title: '제목2',
      status: '미답변',
      answer: '',
      isExpanded: false,
    },
    {
      title: '제목3',
      status: '답변 완료',
      answer: '제목3에 대한 답변입니다.',
      isExpanded: false,
    },
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  //NOTE: 문의 생성
  // const [form, setForm] = useState({
  //   title: '',
  //   content: '',
  // });

  const handleQuestionClick = (index) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index].isExpanded = !newQuestions[index].isExpanded;
      return newQuestions;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //NOTE: submitted 상태 관리보다는 alert 띄우고 확인 누르면 모달이 꺼지도록
    // setIsSubmitted(true);
  };

  if (type === 'questions') {
    //NOTE: tody scroll 필요
    //NOTE: API 연동(faq 불러오기 / 생성 / 삭제)
    //NOTE: 펼침기능 => 드롭다운 형식으로 (추천)
    //NOTE: 색상
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
                style={{ backgroundColor: 'gray' }}
              >
                <td>{index + 1}</td>
                <td>{question.title}</td>
                <td>{question.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {questions.map(
          (question, index) =>
            question.isExpanded && (
              <QuestionDetail key={index} question={question} />
            ),
        )}
      </section>
    );
  } else {
    return (
      <section>
        <h2>문의하기</h2>
        {isSubmitted ? ( // 제출 이후 생성되는 화면 ?
          <p>제출이 완료되었습니다. 감사합니다.</p>
        ) : (
          <form>
            <label>
              이름
              <input type="text" name="name" />
            </label>
            <div className={styles.inputGroup}>
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name">제목</label>
              <input type="text" id="title" name="title" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="content">내용</label>
              <textarea id="content" name="content"></textarea>
            </div>
            <div className={styles.buttonGroup}>
              <Button type="submit">제출</Button>
              <Button type="button" onClick={onClose}>
                닫기
              </Button>
            </div>

          </form>
        )}
      </section>
    );
  }
};
export default FAQModal;
