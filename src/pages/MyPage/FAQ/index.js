import React, { useCallback, useState } from 'react';
import styles from './faq.module.scss';
import {
  Button,
  SearchBox,
  Modal,
} from '../../../components/Common';
import {Accordion,FAQListModal,FAQAskModal} from "./_shared";
import faqData from './faqData';
import useModal from '../../../components/Common/Modal/useModal';
import { useMount } from 'react-use';
import { scrollTop } from '../../../utils';
const FAQ = () => {
  const [faqModalOption, faqShowModal, faqOnClose] = useModal();
  const [toAskModalOption, toAskShowModal, toAskOnClose] = useModal();
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModalFAQs = useCallback(() => {
    faqShowModal(true, '', null, null, <FAQListModal onClose={faqOnClose} />)});

  const handleOpenModalToAsk = useCallback(() => {
    toAskShowModal(
      true,
      '',
      null,
      null,
      <FAQAskModal onClose={toAskOnClose} />,
    );
});


  //검색 필터링 기능
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFAQ = faqData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  
  useMount(()=>{
    scrollTop();
  })
  return (
    <main className={styles.mainContainer}>
      <h1> FAQ</h1>
      <div className={styles.mainInput}>
        <SearchBox
          className={styles.search}
          onChange={handleSearch}
          placeholder="무엇을 도와드릴까요?"
        />
        <div className={styles.sideButton}>
          <Button onClick={handleOpenModalFAQs}>문의 내역</Button>
          <Button onClick={handleOpenModalToAsk}>문의 하기</Button>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <li>
          <div className={styles.thtitle}>자주 묻는 질문</div>
        </li>
        <ul className={styles.accordionWrapper}>
          {/* //NOTE: 열려있는 아코디언은 1개로 유지 */}
          {filteredFAQ.map((item, index) => (
            <li key={index}>
              <Accordion title={item.title} content={item.content} />
            </li>
          ))}
        </ul>
      </div>

      <Modal
        modalOption={faqModalOption}
        modalSize="big"
        onClose= {faqOnClose}
        //className={styles.iconModal}
      />
      <Modal
        modalOption={toAskModalOption}
        modalSize="small"
        //className={styles.iconModal}
      />
    </main>
  );
};

export default FAQ;
