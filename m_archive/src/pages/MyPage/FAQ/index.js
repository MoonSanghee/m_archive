import React, { useState } from "react";
import styles from "./faq.module.scss";

import { Button, SearchBox, Tag, Modal, ModalButton  } from "../../../components/Common";
import Accordion from "../../../components/Common/Accordion";
import faqData from "./faqData";

const FAQ = () => {
  const [modalOption, setModalOption] = useState({
    show: false,
    title: "",
    onSubmit: () => {},
    onClose: () => {},
    element: null,
  });
//TODO: 재사용 가능한 모달 컴포넌트 만들기
/**
 * 모달을 사용할 페이지에 밑에 옵션을 항상 넣어주쇼
    const OPTION = {
    show: false, // 모달을 키고 끄는 옵션 
    title: "", // 모달의 문구 
    onSubmit: () => {}, // 모달을 킬 때마다 사용할 콜백 함수
    onClose: () => {}, // 모달을 끌 때마다 사용할 콜백 함수
    element: null // 모달마다 넣고 싶은 추가 컴포넌트 자리
    }

    const [modalOption, setModalOption] = useState(OPTION)
 */
  const handleOpenModal = (showInquiryModal) => {
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
        <Button onClick={() => handleOpenModal(false)}>문의 내역</Button>
        <Button onClick={() => handleOpenModal(true)}>문의 하기</Button>
        </div>
      </div>
      <h2>자주묻는 질문</h2>
      <ul className={styles.accordionWrapper}>
        {filteredFAQ.map((item, index) => (
          <li key={index}>
            <Accordion title={item.title} content={item.content} />
          </li>
        ))}
      </ul>
      <Modal {...modalOption} />
    </main>
  );
};

export default FAQ;

