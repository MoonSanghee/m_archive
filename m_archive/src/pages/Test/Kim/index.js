import React from "react";
import "./style.scss";
import Accordion from "../../../components/Common/Accordion/index";
import { ProfileIcon } from "../../../assets/icon";

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

function Kim() {
  return (
    <main>
    <div style={{ width: "600px", paddingTop: "100px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "50px",
        }}
      >
        React Accordion
        {/* FAQ 제목 작성 테스트중  */}
      </h1>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: "5px" }}>
          <Accordion title={item.title} content={item.content} />
        </div>
      ))}
    </div>



    {/* 밑에는 카드 리뷰카드 테스트 부분  */}
    <section id="testimonials">
    <div class="testimonial-box-container">
      <div class="testimonial-box">
        <div class="box-top">
          <div class="profile">
            <div class="profile-img">
              <div><ProfileIcon /></div>
            </div>
            <div class="name-user">
              <strong>요것은 닉네임</strong>
              <span>요것은 칭호?</span>
            </div>
          </div>
          <div class="review">
            {/* 별점 */}
            여기가 별점 위치?
          </div>
        </div>
        <div class="client-comment">
          <p>요것은 테스트여 </p>
        </div>
      </div>
    </div>
  </section>
</main>
  );
}

export default Kim;
