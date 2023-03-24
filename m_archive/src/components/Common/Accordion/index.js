import { useState } from "react";
//TODO: module scss로 사용
import "./accordion.scss";
import { MypageArrow } from "../../../assets/icon";

//NOTE: 언더바를 사용해서 className를 만드는 방식 -> scss가 좋아하지 않음
//NOTE: tailwind css라는 라이브러리 -> 언더바

//NOTE: MypageArrow -> BackgroundArrowIcon or IconArrow
const Accordion = (props) => {
  const [active, setActive] = useState(false);

  return (
    <div className={`accordion ${active ? "active" : ""}`}>
      <div className="accordion__title" onClick={() => setActive(!active)}>
        <span>{props.title}</span>
        <MypageArrow className="accordion__icon" />
      </div>
      <div className="accordion__content">{props.content}</div>
    </div>
  );
};

export default Accordion;
