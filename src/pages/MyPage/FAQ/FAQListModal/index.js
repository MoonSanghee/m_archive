import { useEffect, useState, useRef } from 'react';
import { Button } from '../../../../components/Common';
import QuestionDetail from './questionDetail';
import QuestionAsk from './questionAsk';
import styles from './faqListModal.module.scss';
import { getFAQsMe } from '../../../../api/FAQ';
import { useMount } from 'react-use';
import cx from "classnames";

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

  useMount(() => {
    onGetMyFAQs();
    // 모달 열릴 때 body 스크롤 방지 스타일 적용
    //document.body.style.overflow = 'hidden';
  });

  /*useEffect(() => {
    // 모달이 닫힐 때 body 스크롤 방지 스타일 제거
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);*/

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
    //console.log(faqs);
  });
  return (
    <section className={styles.sectionFaq}>
      <h2 className={styles.faqListTitle}>문의 내역</h2>
      <table className={styles.tableWrapper}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th className={styles.tableth}>번호</th>
            <th className={styles.tableth}>제목</th>
            <th className={styles.tableth}>상태</th>
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
                <td className={cx(styles.tableNum, styles.questionTd)}>{index + 1}</td>
                <td className={styles.questionTd}> {question.title}</td>
                <td  className={styles.questionTd}><span className={cx(styles.waiting, {[styles.replied] : question.faqComment})}>
                  {question.faqComment ? "답변완료" : "대기중"
                }</span> </td>
              </tr>
              {selectedQuestionIndex === index && (
                <>
                <tr key={`answer-${index}`} className={styles.tableAnswer}>
                  <td colSpan="1" className={styles.questionTd}>
                    <tr className={styles.faqAnswer}>질문</tr>
                  </td>
                  <td className={styles.Answer} colSpan="2">
                    <QuestionDetail question={question} />
                  </td>
                </tr>
                <td colSpan="3"  className={styles.questionTd}>
                  <hr className={styles.tableHr}/> 
                  {/* 구분선 요소 */}
                </td>
                <tr className={styles.tableAAnswer}>

                  <td colSpan="1"  className={styles.questionTd}>
                  <tr className={styles.faqAnswer}>답변</tr>
                  </td>
                  <td className={styles.Answer} colSpan="2">
                    <QuestionAsk question={question} />
                  </td>
                </tr>
                
              </>
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
