import React, { useState } from 'react';
import styles from './tableElements.module.scss';
import Movies from './movies';
import Reviews from './Reviews';
import Users from './Users';
import CheckBox from '../CheckBox';

const TableElements = ({ children }) => {
  return (
    <section className={styles.tableElements}>
      {children}
      {/* <Movies /> */}
      {/* <Reviews/> */}
      {/* <Users/> */}
    </section>
  );
};

export default TableElements;
