import React, { useState } from 'react';
import cx from 'classnames';
import styles from './kim.module.scss';

const FAQ_DATA = [
  {
    category: '예약 관련',
    questions: [
      {
        id: 1,
        question: '예약 취소는 어떻게 하나요?',
        answer:
          '예약 취소는 예약 확인 페이지에서 취소 버튼을 누르시면 가능합니다. 취소 가능 기간 이후에는 전화로 문의해주세요.',
      },
      {
        id: 2,
        question: '예약 변경은 가능한가요?',
        answer: '예약 변경은 예약 확인 페이지에서 변경 버튼을 누르시면 가능합니다.',
      },
    ],
  },
];

function kim2 () {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = FAQ_DATA.filter((category) => {
    const filteredQuestions = category.questions.filter((question) =>
      question.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredQuestions.length > 0;
  });

  return (
    <div className={styles.faqSearchBar}>
      <input type="text" value={searchQuery} onChange={handleChange} placeholder="검색어를 입력해주세요" />
      <div className={styles.searchResult}>
        {filteredData.map((category) => (
          <div key={category.category} className={styles.category}>
            <div className={styles.categoryName}>{category.category}</div>
            <ul className={styles.questionList}>
              {category.questions
                .filter((question) => question.question.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((question) => (
                  <li key={question.id} className={styles.question}>
                    <div className={styles.questionTitle}>{question.question}</div>
                    <div className={styles.questionAnswer}>{question.answer}</div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default kim2;