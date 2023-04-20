import { useState } from "react";
//TODO: module scss로 사용
import styles from "./accordion.module.scss";
import { MypageArrow } from "../../../assets/icon";
import cx from "classnames";

//NOTE: 언더바를 사용해서 className를 만드는 방식 -> scss가 좋아하지 않음
//NOTE: tailwind css라는 라이브러리 -> 언더바

//NOTE: MypageArrow -> BackgroundArrowIcon or IconArrow
const Accordion = (props) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (active) {
      setActive(false);
    } else {
      // 모든 컴포넌트의 active state를 false로 초기화
      const accordions = document.querySelectorAll(`styles.accordion`);
      accordions.forEach((accordion) => {
        accordion.classList.remove(`${styles.active}`);
      });
      setActive(true);
    }
  };

  return (
    <div className={cx(styles.accordion,{[styles.active]: active})}>
      <div className={styles.accordionTitle} onClick={handleClick}>
        <span>{props.title}</span>
        <MypageArrow className={styles.accordionIcon} />
      </div>
      <div className={styles.accordionContent}>
        <span>답변</span>
        <span>{props.content}</span>
        </div>
    </div>
  );
};

export default Accordion;
