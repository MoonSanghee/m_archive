import React, {useState} from "react";
import styles from "./faq.module.scss";

import { Button, SearchBox, Tag, Modal } from "../../../components/Common";
import Accordion from "../../../components/Common/Accordion";

// 틀만 짜고 지금 SCSS 와 API 복습하면서 하는중.
const data = [
  {
    title: "선호 장르는 어디서 바꿀 수 있나요?",
    content:
      "마이페이지 - 프로필 에서 하단에 선호장르를 변경 후 저장하시면 변경 됩니다.",
  },
  {
    title: "제가 쓴 리뷰는 어디서 볼수 있나요?",
    content:
      "마이페이지 - 리뷰&댓글 에서 자신이 쓴 리뷰 혹은 댓글 내용을 확인 하실 수 있습니다.",
  },
  {
    title: "프로필 아이콘은 어디서 바꾸나요?",
    content:
      "마이페이지 - 프로필 에서 아이콘 버튼을 클릭 후 원하는 아이콘 혹은 이미지 를 첨부하여 변경 하실수 있습니다.",
  },
  {
    title: "추가 문의사항은 어디로 문의 하나요?",
    content:
      "기타 문의사항은 마이페이지 - 고객센턴 - 문의하기 버튼을 이용하여 작성해주시면 빠른시일내에 답변을 도와드리겠습니다.",
  },
];



const FAQ = () =>{
    const [modalOption, setModalOption] = useState({
      show: false,
      title: "",
      onSubmit: () => {},
      onClose: () => {},
      element: null,
    });
  
    const handleOpenModal = () => {
      setModalOption({
        show: true,
        title: "문의하기",
        onSubmit: handleSubmitInquiry,
        onClose: handleCloseModal,
        element: (
          <div>
            {/* Render inquiry form or any additional components here */}
            <h3>문의 내용을 작성해주세요</h3>
            <textarea rows={5} />
            <div>
              <Button onClick={handleSubmitInquiry}>확인</Button>
              <Button onClick={handleCloseModal}>닫기</Button>
            </div>
          </div>
        ),
      });
    };
  
    const handleCloseModal = () => {
      setModalOption({ ...modalOption, show: false });
    };
  
    const handleSubmitInquiry = () => {
      // Logic for submitting inquiry goes here
      console.log("Inquiry submitted");
      // Close modal after submitting inquiry
      handleCloseModal();
    };

 return (
<main className={styles.mainContainer}>
   <h1> FAQ</h1>
   <div className={styles.mainInput}>
   <SearchBox />
   <div className={styles.sideButton}>
   <Button>문의 내역</Button>
   <Button onClick={handleOpenModal}>문의 하기</Button>
   </div>
   </div>
  <ul className={styles.accordionWrapper}>
  {data.map((item, index) => (
    <li key={index} style={{ marginBottom: "5px" }}>
      <Accordion title={item.title} content={item.content} />
    </li>
  ))}
</ul>

</main>
 );
    
}
export default FAQ;