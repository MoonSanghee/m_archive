import { useEffect, useState, useRef } from 'react';
import { Button } from '../../../../components/Common';
import QuestionDetail from './questionDetail';
import styles from './faqListModal.module.scss';
import { getFAQsMe } from '../../../../api/FAQ';
import { useMount } from 'react-use';


const FAQListModal = ({ onClose }) => {
  
  const [faqs, setFAQs] = useState([
   
  ]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  

  

  const handleQuestionClick = (index) => {
    if (selectedQuestionIndex === index) {
      // 이미 선택한 질문을 다시 클릭한 경우
      setSelectedQuestionIndex(null);
    } else {
      setSelectedQuestionIndex(index);
    }
  };


  const onGetMyFAQs = async () => {
    const response = await getFAQsMe(1, 20);
    if (response.status === 200) {
      const items = [...response.data.data];
      setFAQs(items);
     
    } else {
      console.log('나의 FAQs 불러오기실패');
    }

  };



  useMount(() => {
    onGetMyFAQs();
    console.log(faqs);
  });
  return (
    <section>
      <h2 className={styles.faqListTitle}>문의 내역</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody className={styles.faqTableBody}>
          {faqs?.map((question, index) => (
            <>
              <tr
                key={index}
                onClick={() => handleQuestionClick(index)}
                className={styles.questionRow}
              >
                <td>{index + 1}</td>
                <td>{question.title}</td>
                <td>{question.status}</td>
              </tr>
              {selectedQuestionIndex === index && (
                <tr key={`answer-${index}`}>
                  <td colSpan="1">
                    <tr className={styles.faqAnswer}>답변</tr>
                  </td>
                  <td className={styles.Answer} colSpan="3">
                    <QuestionDetail question={question} />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
     
      {faqs
        .filter((item) => item.isExpanded === true)
        .map((question, index) => {
          return (
            <tr key={index}>
              <td colSpan="3">
                <QuestionDetail question={question} />
              </td>
            </tr>
          );
        })}
    </section>
  );
};

export default FAQListModal;
