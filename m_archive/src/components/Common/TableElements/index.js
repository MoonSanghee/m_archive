import React, { useState } from "react";
import styles from './tableElements.module.scss';
import Movies from "./Movies";
import Reviews from "./Reviews";
import Users from "./Users";
import CheckBox from "../CheckBox";

const TableElements = () => {

  return (
    <section className={styles.tableElements}>
      <Movies/>
      {/* <Reviews/> */}
      {/* <Users/> */}
    </section>
  )
}

export default TableElements