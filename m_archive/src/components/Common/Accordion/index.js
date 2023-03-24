import { useState } from "react";
import "./accordion.scss";
import {MypageArrow} from "../../../assets/icon";

const Accordion = (props) => {
  const [active, setActive] = useState(false);

  return (
    <div className={`accordion ${active ? "active" : ""}`}>
      <div className="accordion__title" onClick={() => setActive(!active)}>
        <span>{props.title}</span>
        <div className="accordion__icon">
          <MypageArrow />
        </div>
      </div>
      <div className="accordion__content">{props.content}</div>
    </div>
  );
};

export default Accordion;
