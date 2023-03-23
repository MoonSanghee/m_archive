import { React, useState } from "react";
import { FAQIcon } from "../../../assets/icon";
import styles from "./accordion.module.scss";

function Accordion(props) {
  const [open, setOpen] = useState(false);
  //toggle accordion function
  let toggleHandler = (e) => {
    //switch state
    setOpen(!open);
  };
  return (
    <div className="accordion__item" >
      <div className="accordion__header" onClick={toggleHandler}>
        <h4 >{props.title}</h4>
        <i>
          <FAQIcon />
        </i>
      </div>
      <p className="accordion__content">{props.text}</p>
    </div>
  );
}
export default Accordion;