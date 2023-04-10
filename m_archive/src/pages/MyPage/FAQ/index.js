import React, { useCallback, useState } from "react";
import styles from "./faq.module.scss";

import { Button, SearchBox, Tag, Modal, ModalButton  } from "../../../components/Common";
import Accordion from "../../../components/Common/Accordion";
import faqData from "./faqData";
import useModal from "../../../components/Common/Modal/useModal";
import FAQModal from "./FAQModal";
const FAQ = () => {
  const [modalOption,showModal] = useModal(); 
//TODO: 재사용 가능한 모달 컴포넌트 만들기

  /*const handleOpenModal = (showInquiryModal) => {
    if (showInquiryModal) {
      setModalOption({
        show: true,
        title: "1:1 문의하기",
        onSubmit: handleSubmitInquiry,
        onClose: handleCloseModal,
        element: (
          <div>
            <p>M-archive를 이용하시면서 불편한 사항이나 개선 의견이 있다면 문의해주세요</p>
            <txextara rows={1} />
            <textarea rows={5} />
            <div>
              <Button onClick={handleSubmitInquiry}>문의하기</Button>
              <Button onClick={handleCloseModal}>취소</Button>
            </div>
          </div>
        ),
      });
    } else {
      // API에서 사용자 문의를 가져와 userInquires로 설정 하는 코드 (?)
      const userInquiries = [];
  
      setModalOption({
        show: true,
        title: "문의 내역",
        onClose: handleCloseModal,
        element: (
          <div>
            <ul>
              {userInquiries.map((inquiry, index) => (
                <li key={index}>
                  <h3>{inquiry.title}</h3>
                  <p>{inquiry.content}</p>
                </li>
              ))}
            </ul>
          </div>
        ),
      });
    }
  };
  */
 const handleOpenModalQuestions= useCallback(()=>{
    showModal(
      true,
      '',
      null,
      null,
      <FAQModal
        type={"questions"}
        //onClose={() => modalOption.onClose()}
      />,
    )
 },[modalOption]);
 const handleOpenModalToAsk= useCallback(()=>{
  showModal(
    true,
    '',
    null,
    null,
    <FAQModal
      type={"ask"}
      //onClose={() => modalOption.onClose()}
    />,
  )
},[modalOption]);

  const handleCloseModal = () => {
    setModalOption({ ...modalOption, show: false });
  };

  const handleSubmitInquiry = () => {
    console.log("Inquiry submitted");
    // 모달 닫기 ?
    handleCloseModal();
  };

  const [searchTerm, setSearchTerm] = useState("");

  //검색 필터링 기능 
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFAQ = faqData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={styles.mainContainer}>
      <h1> FAQ</h1>
      <div className={styles.mainInput}>
        <SearchBox onChange={handleSearch} />
        <div className={styles.sideButton}>   
        <Button onClick={handleOpenModalQuestions}>문의 내역</Button>
        <Button onClick={handleOpenModalToAsk}>문의 하기</Button>
        </div>
      </div>
      <li ><div className={styles.thtitle}>자주 묻는 질문</div></li>
      <ul className={styles.accordionWrapper}>
     
        {filteredFAQ.map((item, index) => (
          <li key={index}>
            <Accordion title={item.title} content={item.content} />
          </li>
        ))}
      </ul>
      <Modal
        modalOption={modalOption}
        modalSize="big"
        //className={styles.iconModal}
      />
    </main>
  );
};

export default FAQ;

