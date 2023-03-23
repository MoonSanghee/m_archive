import React from "react";
import styles from "./style.module.scss";
import Accordion from "../../../components/Common/Accordion/index";

function Kim() {
  return (
    <div className="main">
      <h1>React Accordion</h1>
      <div className="accordion">
        <Accordion
          title="Item 1 - Lorem ipsum dolor sit amet"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        />
        <Accordion
          title="Item 2 - Lorem ipsum dolor sit amet"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        />
        <Accordion
          title="Item 3 - Lorem ipsum dolor sit amet"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        />
        <Accordion
          title="Item 4 - Lorem ipsum dolor sit amet"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        />
      </div>
    </div>
  );
}

export default Kim;
